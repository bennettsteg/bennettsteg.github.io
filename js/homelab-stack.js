// Interactive diagram of what the homelab runs. Box names and descriptions live in homelab.html
// (matched by data-node); this script wires up selection and draws the lines down from Proxmox.
(function () {
  const explorer = document.querySelector(".stack-explorer");
  const diagram = explorer?.querySelector(".stack-diagram");
  if (!diagram) return;

  const nodes = [...diagram.querySelectorAll("a[data-node]")];
  const articles = [...explorer.querySelectorAll(".stack-articles article[data-node]")];
  const detail = explorer.querySelector(".stack-detail");
  const prompt = explorer.querySelector(".stack-prompt");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const documented = new Set(articles.map((a) => a.dataset.node));
  for (const node of nodes) {
    if (!documented.has(node.dataset.node)) console.warn(`homelab-stack: no <article> for "${node.dataset.node}"`);
  }

  // Without this script the diagram still works as links to each description below it.
  explorer.classList.add("is-enhanced");
  articles.forEach((a) => (a.hidden = true));
  if (prompt) prompt.hidden = false;

  let activeId = null;

  function setActive(id) {
    activeId = id;
    for (const a of articles) a.hidden = a.dataset.node !== id;
    for (const n of nodes) {
      if (n.dataset.node === id) n.setAttribute("aria-current", "true");
      else n.removeAttribute("aria-current");
    }
    if (prompt) prompt.hidden = id !== null;
  }

  function select(id) {
    setActive(id);
    // When the description sits below the diagram (narrow screens), bring it into view.
    const stacked = getComputedStyle(explorer).gridTemplateColumns.split(" ").length === 1;
    if (stacked) detail.scrollIntoView({ behavior: reduceMotion.matches ? "auto" : "smooth", block: "nearest" });
  }

  function deselect() {
    if (activeId !== null) setActive(null);
  }

  for (const node of nodes) {
    node.addEventListener("click", (e) => {
      e.preventDefault();
      select(node.dataset.node);
    });
  }

  // Clicking anywhere other than a box or the open description closes it.
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".stack-node, .stack-detail")) deselect();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") deselect();
  });

  // --- Lines from Proxmox down to its two children ---
  const link = diagram.querySelector(".stack-link");
  const svg = diagram.querySelector(".stack-links");
  const root = diagram.querySelector(".stack-node-root");
  const branches = diagram.querySelector(".stack-branches");
  const groups = [...branches.querySelectorAll(":scope > .stack-group")];

  function drawLinks() {
    const frame = diagram.getBoundingClientRect();
    const box = (el) => {
      const r = el.getBoundingClientRect();
      const b = { left: r.left - frame.left, right: r.right - frame.left, top: r.top - frame.top, bottom: r.bottom - frame.top };
      return { ...b, cx: (b.left + b.right) / 2, cy: (b.top + b.bottom) / 2 };
    };
    const from = box(root);
    const to = groups.map(box);
    const sideBySide = to.length > 1 && to[1].top < to[0].bottom;

    let d = "";
    if (sideBySide) {
      for (const g of to) {
        const mid = (from.bottom + g.top) / 2;
        d += `M${from.cx} ${from.bottom}V${mid}H${g.cx}V${g.top}`;
      }
    } else {
      // Stacked on narrow screens: one trunk down the left with a stub into each box.
      const trunkX = box(branches).left + 10;
      const heads = groups.map((g) => box(g.querySelector(".stack-node-head")));
      d += `M${trunkX} ${from.bottom}V${heads[heads.length - 1].cy}`;
      heads.forEach((h, i) => (d += `M${trunkX} ${h.cy}H${to[i].left}`));
    }
    svg.setAttribute("viewBox", `0 0 ${frame.width} ${frame.height}`);
    link.setAttribute("d", d);
  }

  new ResizeObserver(drawLinks).observe(diagram);
  document.fonts?.ready.then(drawLinks);
  drawLinks();
})();
