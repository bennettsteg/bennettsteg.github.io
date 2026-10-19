async function loadDescriptions(jsonPath) {
  const targets = document.querySelectorAll("[data-desc]");
  if (targets.length === 0) return;

  try {
    const response = await fetch(jsonPath);
    const descriptions = await response.json();
    targets.forEach((el) => {
      const id = el.dataset.desc;
      if (descriptions[id]) {
        el.textContent = descriptions[id];
      }
    });
  } catch (err) {
    console.error(`Failed to load descriptions from ${jsonPath}`, err);
  }
}
