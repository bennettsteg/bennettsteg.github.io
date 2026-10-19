# Short content hardcoded in HTML, only long text in JSON

Content is split by length rather than fully data-driven: a Project or Now entry's title, tags, and link are hardcoded directly in `projects.html` / `now.html`, each tagged with a stable id; `data/projects.json` and `data/now.json` hold only that id's description text, fetched and injected at load time. Interests and Skills have no JSON files at all — every field they have (name, category, a one-line blurb) is short, so they're plain hardcoded HTML with no fetch step.

We considered keeping whole entries in JSON (title/tags/link/description together) for a single edit location per new entry, but chose the split because the explicit goal was keeping long prose easy to edit and reorganize, not minimizing the number of files touched — short fields don't benefit from being externalized. The tradeoff: adding a new Project or Now entry means editing two files (the HTML shell and the JSON description) instead of one.
