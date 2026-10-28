// Interactive 3D model of the homelab case (Jonsbo N5), built procedurally with three.js.
// Each part's name, text, and photo live in homelab.html (<article data-part="id">); only the 3D
// placement for that id lives here. To add a part: add an <article> there and an entry in PARTS below.
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

// Coordinates are in case space: +y up, front of the case faces +z, case is centred on the origin.
// The case is closed, so anchors only say roughly which panel a part sits behind.
//   anchor: where the arrow lands on the case
//   face:   outward direction at the anchor; the arrow dims when this points away from the camera
//   view:   camera angles (degrees) the camera glides to when the part is selected.
//           azimuth 0 looks at the front, negative swings toward the left side; polar 0 is top-down, 90 is level.
const PARTS = {
  cpu: { anchor: [-0.05, 0.5, 0.12], face: [0, 1, 0], view: { azimuth: -35, polar: 38 } },
  ram: { anchor: [0.2, 0.5, -0.05], face: [0, 1, 0], view: { azimuth: -20, polar: 40 } },
  cooler: { anchor: [0.15, 0.22, 0.5], face: [0, 0, 1], view: { azimuth: 12, polar: 68 } },
  motherboard: { anchor: [-0.475, 0.3, 0.15], face: [-1, 0, 0], view: { azimuth: -78, polar: 76 } },
  m2: { anchor: [-0.475, 0.1, -0.2], face: [-1, 0, 0], view: { azimuth: -78, polar: 72 } },
  psu: { anchor: [-0.475, -0.3, -0.3], face: [-1, 0, 0], view: { azimuth: -105, polar: 78 } },
  drives: { anchor: [0.0, -0.28, 0.5], face: [0, 0, 1], view: { azimuth: 14, polar: 80 } },
};

const CASE = { w: 0.95, h: 1.0, d: 1.0 };
const START_VIEW = { azimuth: -40, polar: 64 };

const explorer = document.querySelector(".lab-explorer");
const stage = explorer?.querySelector(".lab-stage");
const prompt = explorer?.querySelector(".lab-prompt");
const articles = [...(explorer?.querySelectorAll(".lab-parts article[data-part]") ?? [])].filter((el) => {
  const known = Object.hasOwn(PARTS, el.dataset.part);
  if (!known) console.warn(`homelab-viewer: no PARTS entry for "${el.dataset.part}"`);
  return known;
});

if (stage && articles.length > 0) {
  try {
    init();
  } catch (err) {
    // No WebGL (or similar): leave the plain list of parts visible.
    console.error("homelab-viewer: couldn't start the 3D view", err);
    stage.hidden = true;
    document.documentElement.classList.remove("lab-pending");
  }
}

function init() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  stage.hidden = false;
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  stage.prepend(renderer.domElement);
  renderer.domElement.setAttribute("aria-hidden", "true");

  const scene = new THREE.Scene();
  scene.environment = new THREE.PMREMGenerator(renderer).fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.9;
  const key = new THREE.DirectionalLight(0xffffff, 1.4);
  key.position.set(-2, 4, 3);
  scene.add(key);

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  const target = new THREE.Vector3(0, -0.04, 0);

  const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
  const model = buildCase(maxAnisotropy);
  scene.add(model);

  // --- Overlay: arrows (SVG) and labels (buttons) ---
  const overlay = document.createElement("div");
  overlay.className = "lab-overlay";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("class", "lab-lines");
  svg.setAttribute("aria-hidden", "true");
  overlay.append(svg);
  stage.append(overlay);

  const hint = document.createElement("p");
  hint.className = "lab-hint";
  hint.textContent = "Select a label for details";
  stage.append(hint);

  const parts = articles.map((article) => {
    const id = article.dataset.part;
    const cfg = PARTS[id];
    const name = article.querySelector("h3")?.textContent.trim() ?? id;

    const label = document.createElement("button");
    label.type = "button";
    label.className = "lab-label";
    label.textContent = name;
    label.setAttribute("aria-pressed", "false");
    label.addEventListener("click", () => select(id));
    overlay.append(label);

    const g = document.createElementNS(svg.namespaceURI, "g");
    const line = document.createElementNS(svg.namespaceURI, "line");
    line.setAttribute("class", "lab-line");
    const halo = document.createElementNS(svg.namespaceURI, "circle");
    halo.setAttribute("class", "lab-halo");
    halo.setAttribute("r", "9");
    const dot = document.createElementNS(svg.namespaceURI, "circle");
    dot.setAttribute("class", "lab-dot");
    dot.setAttribute("r", "4");
    const hit = document.createElementNS(svg.namespaceURI, "circle");
    hit.setAttribute("class", "lab-hit");
    hit.setAttribute("r", "14");
    hit.addEventListener("click", () => select(id));
    g.append(line, halo, dot, hit);
    svg.append(g);

    return {
      id,
      name,
      article,
      label,
      g,
      line,
      halo,
      dot,
      hit,
      anchor: new THREE.Vector3(...cfg.anchor),
      face: new THREE.Vector3(...cfg.face).normalize(),
      view: cfg.view,
      lw: 0,
      lh: 0,
    };
  });

  explorer.classList.add("is-enhanced");
  if (prompt) prompt.hidden = false;
  articles.forEach((a) => (a.hidden = true));
  document.documentElement.classList.remove("lab-pending");

  // --- Selection and camera moves ---
  let activeId = null;
  let tween = null;
  const spherical = new THREE.Spherical();

  function setActive(id) {
    activeId = id;
    for (const p of parts) {
      const on = p.id === id;
      p.article.hidden = !on;
      p.label.setAttribute("aria-pressed", String(on));
      p.g.classList.toggle("is-active", on);
    }
    if (prompt) prompt.hidden = id !== null;
  }

  function select(id) {
    setActive(id);
    const { azimuth, polar } = parts.find((p) => p.id === id).view;
    glideTo(azimuth, polar, fitRadius() * 0.9);
  }

  // Close the open part and return the case to its starting view.
  function deselect() {
    if (activeId === null) return;
    setActive(null);
    glideTo(START_VIEW.azimuth, START_VIEW.polar, fitRadius());
  }

  // Camera angles are in degrees (see PARTS); the camera always looks at the case.
  function glideTo(azimuth, polar, radius) {
    spherical.setFromVector3(camera.position.clone().sub(target));
    const theta = THREE.MathUtils.degToRad(azimuth);
    // Take the short way round the circle.
    const turn = ((theta - spherical.theta + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
    tween = {
      from: { theta: spherical.theta, phi: spherical.phi, radius: spherical.radius },
      to: { theta: spherical.theta + turn, phi: THREE.MathUtils.degToRad(polar), radius },
      start: performance.now(),
      duration: reduceMotion.matches ? 0 : 750,
    };
    invalidate();
  }

  // Clicking anywhere other than a label, an arrow dot, or the open part's card closes the part.
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".lab-label, .lab-hit, .lab-detail")) deselect();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") deselect();
  });

  function stepTween(now) {
    const t = tween.duration === 0 ? 1 : Math.min((now - tween.start) / tween.duration, 1);
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    spherical.theta = THREE.MathUtils.lerp(tween.from.theta, tween.to.theta, e);
    spherical.phi = THREE.MathUtils.lerp(tween.from.phi, tween.to.phi, e);
    spherical.radius = THREE.MathUtils.lerp(tween.from.radius, tween.to.radius, e);
    camera.position.setFromSpherical(spherical).add(target);
    camera.lookAt(target);
    if (t === 1) tween = null;
  }

  // --- Sizing ---
  let width = 1;
  let height = 1;

  // Pull the camera back on narrow stages so the case and its labels both fit.
  function fitRadius() {
    return Math.max(4.0, 6.4 / (width / height));
  }

  function resize() {
    width = stage.clientWidth;
    height = stage.clientHeight;
    if (width === 0 || height === 0) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    for (const p of parts) {
      p.lw = p.label.offsetWidth;
      p.lh = p.label.offsetHeight;
    }
    if (!tween) {
      const radius = activeId ? fitRadius() * 0.9 : fitRadius();
      camera.position.sub(target).setLength(radius).add(target);
    }
    invalidate();
  }

  spherical.set(
    fitRadius(),
    THREE.MathUtils.degToRad(START_VIEW.polar),
    THREE.MathUtils.degToRad(START_VIEW.azimuth)
  );
  camera.position.setFromSpherical(spherical).add(target);
  camera.lookAt(target);

  new ResizeObserver(resize).observe(stage);
  document.fonts?.ready.then(resize);

  // --- Frame loop: only runs while something is moving ---
  const world = new THREE.Vector3();
  const toCamera = new THREE.Vector3();
  const ndc = new THREE.Vector3();
  const clamp = THREE.MathUtils.clamp;
  const PAD = 12;
  const LABEL_GAP = 8;
  // Pulls each arrow's direction upward so arrows tend to climb away from their part.
  const UP_BIAS = 0.35;
  let raf = 0;
  let last = 0;

  function invalidate() {
    if (!raf) raf = requestAnimationFrame(frame);
  }

  function frame(now) {
    raf = 0;
    const dt = Math.min((now - last) / 1000, 0.05) || 0.016;
    last = now;

    if (tween) stepTween(now);
    let busy = tween !== null;
    renderer.render(scene, camera);
    if (layoutOverlay(dt)) busy = true;
    if (busy) invalidate();
  }

  // Places each label on an oval around the case, in the direction its anchor lies from the case
  // centre (nudged upward), then pushes overlapping labels apart and draws an arrow from each label
  // to its anchor. Returns true while labels are still gliding.
  function layoutOverlay(dt) {
    ndc.set(0, 0, 0).project(camera);
    const cx = (ndc.x * 0.5 + 0.5) * width;
    const cy = (-ndc.y * 0.5 + 0.5) * height;
    const k = reduceMotion.matches ? 1 : 1 - Math.exp(-dt * 16);

    // Labels stay inside the stage, clear of the hint along the bottom edge.
    const bottom = height - 36;
    const ox = width / 2;
    const oy = (PAD + bottom) / 2;
    const caseRadius = height * 0.42;

    for (const p of parts) {
      world.copy(p.anchor);
      model.localToWorld(world);
      toCamera.copy(camera.position).sub(world).normalize();
      p.facing = toCamera.dot(p.face);

      ndc.copy(world).project(camera);
      p.px = (ndc.x * 0.5 + 0.5) * width;
      p.py = (-ndc.y * 0.5 + 0.5) * height;

      // Follow the ray from the case centre through the anchor out to the oval.
      let dx = (p.px - cx) / caseRadius;
      let dy = (p.py - cy) / caseRadius - UP_BIAS;
      const len = Math.hypot(dx, dy) || 1;
      dx /= len;
      dy /= len;
      const ax = Math.max(width / 2 - PAD - p.lw / 2, 1);
      const ay = Math.max((bottom - PAD) / 2 - p.lh / 2, 1);
      const qx = p.px - ox;
      const qy = p.py - oy;
      const A = (dx / ax) ** 2 + (dy / ay) ** 2;
      const B = 2 * ((qx * dx) / ax ** 2 + (qy * dy) / ay ** 2);
      const C = (qx / ax) ** 2 + (qy / ay) ** 2 - 1;
      const disc = B * B - 4 * A * C;
      const t = disc >= 0 ? Math.max((-B + Math.sqrt(disc)) / (2 * A), 0) : 0;
      p.tcx = p.px + dx * t;
      p.tcy = p.py + dy * t;
    }

    const keepInside = (p) => {
      p.tcx = clamp(p.tcx, PAD + p.lw / 2, width - PAD - p.lw / 2);
      p.tcy = clamp(p.tcy, PAD + p.lh / 2, bottom - p.lh / 2);
    };
    parts.forEach(keepInside);
    for (let pass = 0; pass < 16; pass++) {
      let overlapped = false;
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i];
          const b = parts[j];
          const overlapX = (a.lw + b.lw) / 2 + LABEL_GAP - Math.abs(a.tcx - b.tcx);
          const overlapY = (a.lh + b.lh) / 2 + LABEL_GAP - Math.abs(a.tcy - b.tcy);
          if (overlapX <= 0 || overlapY <= 0) continue;
          overlapped = true;
          if (overlapY <= overlapX) {
            const dir = a.tcy <= b.tcy ? -1 : 1;
            a.tcy += (dir * overlapY) / 2;
            b.tcy -= (dir * overlapY) / 2;
          } else {
            const dir = a.tcx <= b.tcx ? -1 : 1;
            a.tcx += (dir * overlapX) / 2;
            b.tcx -= (dir * overlapX) / 2;
          }
        }
      }
      parts.forEach(keepInside);
      if (!overlapped) break;
    }

    let moving = false;
    for (const p of parts) {
      const tx = p.tcx - p.lw / 2;
      const ty = p.tcy - p.lh / 2;
      if (p.lx === undefined) {
        p.lx = tx;
        p.ly = ty;
      }
      p.lx += (tx - p.lx) * k;
      p.ly += (ty - p.ly) * k;
      if (Math.abs(tx - p.lx) > 0.3 || Math.abs(ty - p.ly) > 0.3) moving = true;

      const active = p.id === activeId;
      const opacity = active ? 1 : clamp(0.4 + p.facing * 2.5, 0.4, 1);
      p.label.style.transform = `translate(${p.lx}px, ${p.ly}px)`;
      p.label.style.opacity = opacity;

      // The arrow leaves from whichever edge midpoint of the label is closest to its anchor.
      const [x1, y1] = [
        [p.lx + p.lw / 2, p.ly],
        [p.lx + p.lw / 2, p.ly + p.lh],
        [p.lx, p.ly + p.lh / 2],
        [p.lx + p.lw, p.ly + p.lh / 2],
      ].reduce((best, pt) => (Math.hypot(pt[0] - p.px, pt[1] - p.py) < Math.hypot(best[0] - p.px, best[1] - p.py) ? pt : best));
      p.line.setAttribute("x1", x1);
      p.line.setAttribute("y1", y1);
      p.line.setAttribute("x2", p.px);
      p.line.setAttribute("y2", p.py);
      for (const c of [p.halo, p.dot, p.hit]) {
        c.setAttribute("cx", p.px);
        c.setAttribute("cy", p.py);
      }
      p.g.style.opacity = opacity;
    }
    return moving;
  }

  // Resume rendering when the tab comes back.
  document.addEventListener("visibilitychange", invalidate);
  resize();
}

// --- The case ---

function buildCase(maxAnisotropy) {
  const { w, h, d } = CASE;
  const hx = w / 2;
  const hy = h / 2;
  const hz = d / 2;
  const group = new THREE.Group();

  const aluminium = new THREE.MeshStandardMaterial({ color: 0x2a2b2f, metalness: 0.75, roughness: 0.42 });
  const black = new THREE.MeshStandardMaterial({ color: 0x08080a, metalness: 0.2, roughness: 0.8 });

  const body = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 5, 0.035), aluminium);
  group.add(body);

  const panel = (texture) =>
    new THREE.MeshStandardMaterial({ map: texture, metalness: 0.6, roughness: 0.5 });

  // Top: perforated panel
  const top = new THREE.Mesh(
    new THREE.PlaneGeometry(0.7, 0.7),
    panel(
      canvasTexture(1024, maxAnisotropy, (ctx, s) => {
        ctx.fillStyle = "#2a2b2f";
        ctx.fillRect(0, 0, s, s);
        ctx.fillStyle = "#050506";
        const n = 56;
        const step = s / n;
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) {
            ctx.beginPath();
            ctx.arc((i + 0.5) * step, (j + 0.5) * step, step * 0.28, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      })
    )
  );
  top.rotation.x = -Math.PI / 2;
  top.position.set(0, hy + 0.002, 0);
  group.add(top);

  // Sides: slotted vents on the upper half, a smaller vent block low and toward the back
  const sideTexture = canvasTexture(1024, maxAnisotropy, (ctx, s) => {
    ctx.fillStyle = "#2a2b2f";
    ctx.fillRect(0, 0, s, s);
    ctx.fillStyle = "#050506";
    const slots = (x0, x1, y0, y1, pitch) => {
      for (let x = x0 * s; x < x1 * s; x += pitch * s) {
        ctx.beginPath();
        ctx.roundRect(x, y0 * s, 0.008 * s, (y1 - y0) * s, 4);
        ctx.fill();
      }
    };
    slots(0.05, 0.95, 0.05, 0.3, 0.0165);
    slots(0.05, 0.95, 0.33, 0.57, 0.0165);
    slots(0.04, 0.38, 0.71, 0.82, 0.0165);
    slots(0.04, 0.38, 0.85, 0.95, 0.0165);
  });
  for (const sign of [-1, 1]) {
    const side = new THREE.Mesh(new THREE.PlaneGeometry(0.92, 0.92), panel(sideTexture));
    side.rotation.y = sign * (Math.PI / 2);
    side.position.set(sign * (hx + 0.002), 0, 0);
    group.add(side);
  }
  // Horizontal seam between the two halves of the shell
  for (const sign of [-1, 1]) {
    const seam = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.006, 0.92), black);
    seam.position.set(sign * hx, -0.12, 0);
    group.add(seam);
  }

  // Front, upper: fine mesh
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.84, 0.48),
    panel(
      canvasTexture(1024, maxAnisotropy, (ctx, s) => {
        ctx.fillStyle = "#26272b";
        ctx.fillRect(0, 0, s, s);
        ctx.fillStyle = "#050506";
        const n = 90;
        const cell = s / n;
        for (let i = 0; i < n; i++) {
          for (let j = 0; j < n; j++) ctx.fillRect(i * cell + cell * 0.18, j * cell + cell * 0.18, cell * 0.64, cell * 0.64);
        }
      })
    )
  );
  mesh.position.set(0, 0.215, hz + 0.002);
  group.add(mesh);

  // Front I/O strip: power button, USB-A, audio, USB-C, and a row of drive LEDs
  const io = new THREE.Group();
  io.position.set(0, -0.065, hz);
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.016, 0.003, 12, 32),
    new THREE.MeshStandardMaterial({ color: 0xc9cbd1, metalness: 0.9, roughness: 0.3 })
  );
  ring.position.set(-0.18, 0, 0.003);
  const usbA = new THREE.Mesh(
    new THREE.BoxGeometry(0.04, 0.016, 0.006),
    new THREE.MeshStandardMaterial({ color: 0x2f6fe0, roughness: 0.6 })
  );
  usbA.position.set(-0.11, 0, 0.003);
  const audio = new THREE.Mesh(new THREE.TorusGeometry(0.009, 0.003, 10, 24), black);
  audio.position.set(-0.05, 0, 0.003);
  const usbC = new THREE.Mesh(new RoundedBoxGeometry(0.03, 0.011, 0.006, 2, 0.004), black);
  usbC.position.set(0.0, 0, 0.003);
  io.add(ring, usbA, audio, usbC);
  const led = new THREE.MeshStandardMaterial({ color: 0x9a9ca3, roughness: 0.5 });
  for (let i = 0; i < 8; i++) {
    const dot = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.006, 0.004), led);
    dot.position.set(0.22 + i * 0.024, 0, 0.002);
    io.add(dot);
  }
  group.add(io);

  // Front, lower: wooden slatted door
  const backing = new THREE.Mesh(new THREE.PlaneGeometry(w - 0.08, 0.38), black);
  backing.position.set(0, -0.28, hz + 0.001);
  group.add(backing);

  const wood = new THREE.MeshStandardMaterial({
    map: canvasTexture(512, maxAnisotropy, woodGrain),
    metalness: 0.05,
    roughness: 0.55,
  });
  const slatGeometry = new RoundedBoxGeometry(w - 0.1, 0.032, 0.024, 3, 0.01);
  for (let i = 0; i < 9; i++) {
    const slat = new THREE.Mesh(slatGeometry, wood);
    slat.position.set(0, -0.46 + 0.02 + i * 0.04, hz + 0.008);
    group.add(slat);
  }

  // Feet
  const footGeometry = new THREE.CylinderGeometry(0.035, 0.04, 0.03, 20);
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const foot = new THREE.Mesh(footGeometry, black);
      foot.position.set(sx * (hx - 0.1), -hy - 0.015, sz * (hz - 0.1));
      group.add(foot);
    }
  }

  // Soft contact shadow
  const shadow = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2),
    new THREE.MeshBasicMaterial({
      map: canvasTexture(256, 1, (ctx, s) => {
        const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
        g.addColorStop(0, "rgba(0,0,0,0.55)");
        g.addColorStop(0.55, "rgba(0,0,0,0.25)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.clearRect(0, 0, s, s);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, s, s);
      }),
      transparent: true,
      depthWrite: false,
    })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -hy - 0.031;
  group.add(shadow);

  return group;
}

function canvasTexture(size, maxAnisotropy, draw) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  draw(canvas.getContext("2d"), size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  return texture;
}

function woodGrain(ctx, s) {
  const grad = ctx.createLinearGradient(0, 0, 0, s);
  grad.addColorStop(0, "#6e3a1c");
  grad.addColorStop(1, "#52290f");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, s, s);
  // Seeded so the grain is the same on every load
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  for (let i = 0; i < 260; i++) {
    const y = rand() * s;
    ctx.strokeStyle = rand() < 0.5 ? `rgba(40,18,6,${0.05 + rand() * 0.12})` : `rgba(220,150,90,${0.04 + rand() * 0.08})`;
    ctx.lineWidth = 0.5 + rand() * 2;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.bezierCurveTo(s * 0.3, y + (rand() - 0.5) * 8, s * 0.7, y + (rand() - 0.5) * 8, s, y + (rand() - 0.5) * 6);
    ctx.stroke();
  }
}
