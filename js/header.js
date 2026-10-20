// Single source of truth for the site header. Edit the links here and every page updates.
(function () {
  const links = [
    { href: "about.html", label: "About" },
    { href: "projects.html", label: "Projects" },
    { href: "homelab.html", label: "Homelab" },
    { href: "skills.html", label: "Skills" },
    { href: "contact.html", label: "Contact" },
  ];

  const current = location.pathname.split("/").pop() || "index.html";
  const items = links
    .map(({ href, label }) => {
      const active = href === current ? ' class="active" aria-current="page"' : "";
      return `      <a href="${href}"${active}>${label}</a>`;
    })
    .join("\n");

  document.currentScript.insertAdjacentHTML(
    "beforebegin",
    `<header class="site-header">
    <nav>
      <a href="index.html" class="brand">Home</a>
      <button class="nav-toggle" type="button" aria-expanded="false">Menu</button>
${items}
    </nav>
  </header>`
  );
})();
