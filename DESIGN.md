---
version: alpha
name: Bennett-Steg-Portfolio
description: "A dark, modern personal portfolio for an IT, development, and cybersecurity professional. The visual system combines charcoal surfaces (#101114), off-white typography, and a restrained electric-lime accent (#a3e635). Oversized editorial headlines establish a confident personal brand, while image-led project cards showcase real software, automation, and infrastructure work. The aesthetic is technical and polished without relying on cliché cyber visuals, excessive neon, or decorative terminal effects."

colors:
  primary: "#a3e635"
  on-primary: "#171a12"
  primary-hover: "#bef264"
  primary-focus: "#84cc16"
  ink: "#f4f4f5"
  ink-muted: "#c4c4cc"
  ink-subtle: "#a1a1aa"
  ink-tertiary: "#71717a"
  canvas: "#101114"
  surface-1: "#191a1f"
  surface-2: "#202126"
  surface-3: "#27282f"
  surface-4: "#303139"
  hairline: "#2d2e35"
  hairline-strong: "#45464f"
  hairline-tertiary: "#555660"
  inverse-canvas: "#a3e635"
  inverse-surface-1: "#f4f4f5"
  inverse-surface-2: "#e4e4e7"
  inverse-ink: "#171a12"
  brand-secure: "#bef264"
  semantic-success: "#a3e635"
  semantic-overlay: "#08090b"

typography:
  display-xl:
    fontFamily: Geist Sans
    fontSize: 76px
    fontWeight: 650
    lineHeight: 1.02
    letterSpacing: -3.2px
  display-lg:
    fontFamily: Geist Sans
    fontSize: 56px
    fontWeight: 650
    lineHeight: 1.08
    letterSpacing: -2.0px
  display-md:
    fontFamily: Geist Sans
    fontSize: 40px
    fontWeight: 600
    lineHeight: 1.12
    letterSpacing: -1.2px
  headline:
    fontFamily: Geist Sans
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.20
    letterSpacing: -0.6px
  card-title:
    fontFamily: Geist Sans
    fontSize: 21px
    fontWeight: 550
    lineHeight: 1.25
    letterSpacing: -0.35px
  subhead:
    fontFamily: Geist Sans
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: -0.25px
  body-lg:
    fontFamily: Geist Sans
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: -0.1px
  body:
    fontFamily: Geist Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: 0
  body-sm:
    fontFamily: Geist Sans
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: 0
  caption:
    fontFamily: Geist Sans
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.40
    letterSpacing: 0
  button:
    fontFamily: Geist Sans
    fontSize: 14px
    fontWeight: 550
    lineHeight: 1.20
    letterSpacing: 0
  eyebrow:
    fontFamily: Geist Sans
    fontSize: 12px
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: 1.1px
  mono:
    fontFamily: Geist Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.50
    letterSpacing: 0

rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  xxl: 22px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 104px

components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 11px 17px
  button-primary-pressed:
    backgroundColor: "{colors.primary-focus}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
  button-secondary:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 10px 16px
  button-tertiary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 10px 12px
  button-inverse:
    backgroundColor: "{colors.inverse-canvas}"
    textColor: "{colors.inverse-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 11px 17px
  project-card:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    padding: 16px
  project-card-featured:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.xl}"
    padding: 20px
  project-image-frame:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
    typography: "{typography.caption}"
    rounded: "{rounded.lg}"
    padding: 0
  feature-card:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 24px
  content-panel:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: 24px
  testimonial-card:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body-lg}"
    rounded: "{rounded.lg}"
    padding: 28px
  skill-tag:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.caption}"
    rounded: "{rounded.sm}"
    padding: 5px 9px
  text-input:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 10px 12px
  text-input-focused:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: 10px 12px
  status-badge:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-muted}"
    typography: "{typography.caption}"
    rounded: "{rounded.pill}"
    padding: 4px 9px
  top-nav:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    height: 68px
  cta-banner:
    backgroundColor: "{colors.surface-1}"
    textColor: "{colors.ink}"
    typography: "{typography.headline}"
    rounded: "{rounded.xl}"
    padding: 40px
  timeline-row:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    padding: 20px 0
  footer:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink-subtle}"
    typography: "{typography.caption}"
    rounded: "{rounded.md}"
    padding: 48px 24px
---

## Overview

This design system defines a personal portfolio for an IT, software development, and cybersecurity student or early-career professional. It should feel like a thoughtful independent developer's site: confident, technically literate, visually polished, and easy for recruiters or collaborators to navigate. It is inspired by the clarity of modern developer tools, but it is not a copy of a product marketing page.

The foundation is a charcoal canvas (`{colors.canvas}`) with slightly lifted gray panels, subtle borders, off-white typography, and one distinctive electric-lime accent (`{colors.primary}`). The green is used intentionally for key actions, small labels, links, and selected details. It should feel crisp and energetic, not fluorescent or overused.

The page's visual identity comes from three elements:
1. **Oversized editorial typography** in the hero, with a short headline and a concise introduction.
2. **Image-led project cards** with real screenshots, diagrams, interface previews, or homelab photography.
3. **Quiet technical details** such as small uppercase category labels, technology tags, subtle dividers, and occasional monospaced metadata.

### Key Characteristics

- Dark charcoal, not pure black, is the default canvas.
- Electric lime is the only prominent chromatic accent.
- Project previews are a major visual feature and should be visible early on the page.
- Cards use restrained borders, charcoal surfaces, and medium-to-large corner radii.
- Headline typography is large and expressive; body copy remains readable and relatively calm.
- Use real project artifacts whenever possible; avoid generic stock imagery when a screenshot or diagram can tell the story.
- Keep motion, gradients, glow effects, and decorative code restrained.
- The overall result should feel personal and portfolio-focused, not like a SaaS pricing page or an admin dashboard.

## Colors

### Brand & Accent

- **Electric Lime** (`{colors.primary}`): Primary action buttons, active navigation details, small eyebrow labels, important links, and occasional icon highlights.
- **Lime Hover** (`{colors.primary-hover}`): Hover state for primary buttons and interactive links.
- **Lime Focus** (`{colors.primary-focus}`): Focus rings and selected controls.
- **Soft Lime** (`{colors.brand-secure}`): Rare secondary highlight, such as a small security-related tag. Do not introduce another bright accent color.

### Surface

- **Canvas** (`{colors.canvas}`): Main page background, a deep charcoal with a neutral undertone.
- **Surface 1** (`{colors.surface-1}`): Default project cards, content panels, and grouped sections.
- **Surface 2** (`{colors.surface-2}`): Hovered or featured cards and image frames.
- **Surface 3** (`{colors.surface-3}`): Nested panels, dropdowns, or slightly elevated UI elements.
- **Surface 4** (`{colors.surface-4}`): Highest neutral surface for popovers or selected nested elements.
- **Hairline** (`{colors.hairline}`): Default card borders and section dividers.
- **Hairline Strong** (`{colors.hairline-strong}`): Hover borders and stronger separators.
- **Hairline Tertiary** (`{colors.hairline-tertiary}`): Rare nested borders; avoid making every edge prominent.

### Text

- **Ink** (`{colors.ink}`): Headlines, project titles, and important body text.
- **Ink Muted** (`{colors.ink-muted}`): Supporting descriptions, metadata, and secondary body copy.
- **Ink Subtle** (`{colors.ink-subtle}`): Captions, dates, technology labels, and footer links.
- **Ink Tertiary** (`{colors.ink-tertiary}`): Disabled or low-priority text only; do not use for essential content.

### Semantic

- **Success Green** (`{colors.semantic-success}`): Success indicators only when needed. It shares the accent hue, so don't use it as a separate decorative color.
- **Overlay** (`{colors.semantic-overlay}`): Modal and lightbox scrim.

## Typography

### Font Family

- **Display and body** — `Geist Sans`, with `Inter`, `system-ui`, `-apple-system`, `Segoe UI`, and `Roboto` as fallbacks. Use one consistent sans-serif voice across the site.
- **Mono** — `Geist Mono`, with `JetBrains Mono` and `ui-monospace` as fallbacks. Use for short technology labels, file paths, code excerpts, or compact metadata only.

The design should be modern and legible, with strong headline scale and measured negative tracking. Do not use monospace for large paragraphs or make every section look like a terminal.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 76px | 650 | 1.02 | -3.2px | Main hero headline |
| `{typography.display-lg}` | 56px | 650 | 1.08 | -2.0px | Major section headings |
| `{typography.display-md}` | 40px | 600 | 1.12 | -1.2px | Subsection headings |
| `{typography.headline}` | 28px | 600 | 1.20 | -0.6px | Content section titles |
| `{typography.card-title}` | 21px | 550 | 1.25 | -0.35px | Project card titles |
| `{typography.subhead}` | 20px | 400 | 1.45 | -0.25px | Hero introduction |
| `{typography.body-lg}` | 18px | 400 | 1.55 | -0.1px | Lead paragraphs |
| `{typography.body}` | 16px | 400 | 1.55 | 0 | Default body |
| `{typography.body-sm}` | 14px | 400 | 1.50 | 0 | Card descriptions and metadata |
| `{typography.caption}` | 12px | 400 | 1.40 | 0 | Captions and small labels |
| `{typography.button}` | 14px | 550 | 1.20 | 0 | Buttons |
| `{typography.eyebrow}` | 12px | 600 | 1.35 | 1.1px | Uppercase category labels |
| `{typography.mono}` | 13px | 400 | 1.50 | 0 | Technical metadata and code |

### Principles

- Keep hero headlines bold and large, but make them concise enough to scan.
- Use negative letter spacing on display headings; avoid cramped tracking on body text.
- Eyebrow labels may use uppercase text and slight positive tracking to establish hierarchy.
- Body copy should explain what a project does and why it matters, not just list tools.
- Use the mono family sparingly for technologies, status, or technical metadata.
- Maintain strong contrast between primary text and the dark background.

## Layout

### Spacing System

- **Base unit**: 4px.
- **Tokens**: `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 104px.
- Project card content padding: 16–20px.
- Standard content panel padding: 24px.
- Large call-to-action padding: 40px.
- Keep comfortable vertical spacing between sections while ensuring projects appear within the first few scrolls.

### Grid & Container

- Maximum content width: approximately 1200–1280px, centered.
- Main content should align to a consistent page gutter; use 24–32px on desktop and 16–20px on mobile.
- Project grid: 2 columns at desktop for image-rich cards; 3 columns only for compact cards with enough room for previews and readable copy.
- Tablet: 2 columns where space permits.
- Mobile: 1 column with full-width cards.
- Hero can use a split layout on wide screens, but the headline and main action must remain dominant. Avoid a hero so tall that projects are pushed far below the fold.
- Sections should use consistent left alignment; reserve asymmetry for project imagery or a deliberate featured project.

### Whitespace Philosophy

Use generous breathing room around the hero and between major sections. Cards should feel distinct through surface contrast, image previews, and spacing rather than heavy shadows. The page should not be packed as densely as a dashboard, but it should also avoid excessive empty space that hides useful work.

## Page Structure

### 1. Navigation

- Keep a compact top navigation with the name or wordmark on the left and a small set of links on the right: About, Projects, Experience, Contact.
- Use a subtle bottom border or translucent charcoal background; avoid a large, heavy navbar.
- The current or hovered link may use lime text or a small lime underline.
- Keep the resume link visible as a secondary action if it is important to the portfolio's purpose.
- On mobile, collapse navigation into a simple accessible menu.

### 2. Hero

- Begin with a small uppercase eyebrow, such as `INFORMATION SYSTEMS · IT · SECURITY`.
- Use a short, memorable headline, for example: “Building useful things with technology.”
- Follow with a 1–2 sentence introduction that describes the person's focus in plain language.
- Provide one lime primary CTA (such as “Explore projects”) and one neutral secondary CTA (such as “Resume” or “Get in touch”).
- Optionally include a portrait, small profile image, or one featured project visual. The image should support the introduction rather than compete with the headline.
- Avoid generic claims like “passionate tech enthusiast” and avoid long blocks of biography in the hero.

### 3. Featured Projects

- This is one of the most important sections of the site and should appear early.
- Use a clear section heading and one short explanatory sentence.
- Each project card should include a prominent image preview at the top, a project title, a concise outcome-focused description, and a small set of technology tags.
- Use real screenshots of the application, diagrams of the architecture, photos of physical infrastructure, or custom-made project illustrations.
- Keep image ratios consistent within a row, ideally around 16:9 or 5:3. Use `object-fit: cover` only when cropping is intentional; interface screenshots should generally use `object-fit: contain` or a carefully framed crop.
- Add a subtle hover state: slightly brighter border, small image zoom, or a small arrow movement. Avoid large lifts, bright glows, and distracting animations.
- Make the whole card clickable only if it has one clear destination; otherwise use explicit links for demo, source code, or case study.
- Use a featured wide card for the strongest project if its screenshot or story benefits from more space.

### 4. About & Skills

- Keep the about section concise and focused on professional direction, interests, and how the person approaches technical problems.
- Group skills into understandable categories such as Development, Infrastructure, Automation, and Security rather than presenting a wall of badges.
- Skill tags should use neutral charcoal surfaces and muted text. Reserve lime for selected emphasis, not every tag.
- Do not imply expertise in a technology based only on brief exposure; use honest labels and project context.

### 5. Experience

- Present internships, work, education, and relevant activities in a clean vertical timeline or stacked rows.
- Prioritize role, organization, dates, and impact. Use short bullets and measurable outcomes where they are accurate.
- Use thin dividers and subtle metadata rather than large cards for every entry.
- Keep project work and professional experience visually related but distinguishable.

### 6. Contact & Footer

- End with a clear, friendly invitation to connect.
- Use a charcoal CTA panel with a concise headline and one primary contact action.
- Include relevant links such as email, LinkedIn, GitHub, and resume. Do not display contact information that is not intended to be public.
- Footer should be minimal, with subdued text and a small lime detail if useful.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 (flat) | Canvas background, no shadow | Page background, section spacing, footer |
| 1 (card) | Surface 1 background, 1px hairline border | Default project cards and content panels |
| 2 (featured/hover) | Surface 2 background, stronger border | Featured or hovered project cards |
| 3 (nested) | Surface 3 background | Nested panels, menus, small image backplates |
| 4 (focus) | 2px primary focus outline | Keyboard focus and selected controls |

- Prefer borders and surface contrast over heavy drop shadows.
- A very subtle shadow may be used on image frames or overlays when needed to separate overlapping elements.
- A faint top-edge highlight is acceptable on cards, but it must not look glossy or glassmorphic.
- Do not use neon glows around every card or image.
- Gradients are optional and should be rare; if used, keep them extremely subtle and within charcoal/green hues.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Tiny labels and compact details |
| `{rounded.sm}` | 6px | Skill tags and small chips |
| `{rounded.md}` | 8px | Buttons, inputs, navigation |
| `{rounded.lg}` | 12px | Content panels and standard cards |
| `{rounded.xl}` | 16px | Project cards and image frames |
| `{rounded.xxl}` | 22px | Large CTA panels, used sparingly |
| `{rounded.pill}` | 9999px | Status badges and small tags |
| `{rounded.full}` | 9999px | Avatar circles |

### Photography & Project Imagery

- Favor authentic artifacts over stock imagery: project screenshots, UI previews, architecture diagrams, server hardware, terminal outputs, and relevant photography.
- Images should have a clear purpose and correspond to the project they represent.
- Frame screenshots in dark neutral surfaces with rounded corners; avoid adding fake browser chrome unless it helps explain the project.
- Use consistent aspect ratios across cards in the same row.
- Add useful alt text for meaningful images. Decorative imagery should not repeat information already provided by nearby text.
- Avoid generic hooded-hacker imagery, green code rain, random binary overlays, and unrelated stock photos.
- Do not fabricate screenshots of a working project. If a real screenshot is unavailable, use a clearly illustrative diagram or a simple branded placeholder.

## Components

### Buttons

**`button-primary`** — Electric-lime primary CTA.
- Background `{colors.primary}`, text `{colors.on-primary}`, type `{typography.button}`, padding 11px 17px, rounded `{rounded.md}`.
- Use for the main action in the hero and the final contact section.
- Hover uses `{colors.primary-hover}`; pressed uses `{colors.primary-focus}`.
- Ensure the lime background and dark text maintain readable contrast.

**`button-secondary`** — Neutral secondary action.
- Background `{colors.surface-2}`, text `{colors.ink}`, type `{typography.button}`, padding 10px 16px, rounded `{rounded.md}`.
- Add a 1px `{colors.hairline}` border. Hover may brighten the surface and border.

**`button-tertiary`** — Low-emphasis text action.
- Transparent or canvas background, text `{colors.ink}`, modest horizontal padding.
- Use for navigation or secondary inline actions, not as the main CTA.

**`button-inverse`** — Lime-filled action for a high-contrast closing panel.
- Background `{colors.inverse-canvas}`, text `{colors.inverse-ink}`, type `{typography.button}`, rounded `{rounded.md}`.

### Project Cards & Image Frames

**`project-card`** — Standard image-led project card.
- Background `{colors.surface-1}`, text `{colors.ink}`, rounded `{rounded.xl}`, padding 16px, 1px `{colors.hairline}` border.
- Place the preview image first, spanning the card's inner width. Use a consistent ratio and a subtle neutral frame.
- Under the image, place the project title, 1–3 lines of descriptive copy, and compact technology tags.
- Hover: transition border toward `{colors.hairline-strong}` and background toward `{colors.surface-2}`; optionally scale the image slightly (maximum 1.02).
- Keep animation short and restrained, around 160–220ms.

**`project-card-featured`** — Featured project with additional space.
- Use `{colors.surface-2}` and a slightly stronger border. The image may be wider or the layout may place image and text side-by-side on desktop.
- Use for one standout project, not every project.
- Include a clear result, contribution, or technical challenge in the description.

**`project-image-frame`** — Image container.
- Use `{colors.surface-2}` as the backplate and `{rounded.lg}` corners.
- Clip image overflow to the rounded frame.
- Preserve interface text legibility; don't crop important UI controls or labels.

**`feature-card`** — Short skill or focus-area tile.
- Use `{colors.surface-1}`, a subtle border, and 24px padding.
- Keep the content brief; don't turn every skill into a separate card.

**`content-panel`** — Grouped content surface for a biography, selected detail, or call to action.
- Use `{colors.surface-1}` and 24px padding. Use only where grouping improves scanning.

### Tags & Status

**`skill-tag`** — Neutral technology tag.
- Background `{colors.surface-2}`, text `{colors.ink-muted}`, type `{typography.caption}`, rounded `{rounded.sm}`.
- Use for concise technology names such as Python, Docker, PostgreSQL, Power Automate, or Linux.
- Tags are supporting metadata, not substitutes for describing the work.

**`status-badge`** — Small status or category badge.
- Background `{colors.surface-2}`, text `{colors.ink-muted}`, type `{typography.caption}`, rounded `{rounded.pill}`.
- Use sparingly for labels such as “In progress” or “Open source.”

### Inputs & Forms

**`text-input`** and **`text-input-focused`** — Form fields for a contact form if one is needed.
- Background `{colors.surface-1}`, text `{colors.ink}`, type `{typography.body}`, rounded `{rounded.md}`, padding 10px 12px.
- Focus state uses a clearly visible 2px outline in `{colors.primary-focus}`.
- Provide visible labels, clear error states, and keyboard access.

### Navigation

**`top-nav`** — Compact, low-profile navigation.
- Background `{colors.canvas}`, text `{colors.ink}`, type `{typography.body-sm}`, height 68px.
- Use a subtle bottom divider or slight transparency if sticky.
- Keep the name/wordmark left-aligned and section links right-aligned.
- Do not use product-style navigation actions such as “Sign in” or “Get started”; use portfolio-relevant links.

### Timeline

**`timeline-row`** — Experience or education entry.
- Background `{colors.canvas}`, text `{colors.ink}`, type `{typography.body}`, padding 20px 0.
- Use a subtle bottom divider. Dates and locations use `{colors.ink-subtle}`.
- Keep the organization and role visually prominent; summarize impact with concise bullets.

### CTA & Footer

**`cta-banner`** — Contact panel near the bottom of the page.
- Background `{colors.surface-1}`, text `{colors.ink}`, type `{typography.headline}`, rounded `{rounded.xl}`, padding 40px.
- Include a short invitation and a clear contact action; lime is reserved for the primary action.

**`footer`** — Minimal footer on `{colors.canvas}`.
- Use `{colors.ink-subtle}` for secondary links, with a small lime hover or focus state.
- Include only relevant professional links and a simple copyright or location line if desired.

## Interaction & Motion

- Prefer fast, subtle transitions of 160–220ms.
- Project cards may brighten their border and slightly zoom the preview image on hover.
- Buttons may change brightness or surface level; avoid springy or exaggerated movement.
- Respect `prefers-reduced-motion`; the site must remain fully understandable without animation.
- Keyboard focus must be visible and use `{colors.primary-focus}`.
- Never rely on color alone to communicate an important state.

## Do's and Don'ts

### Do

- Use `{colors.canvas}` as the page foundation and charcoal surfaces to separate cards.
- Use `{colors.primary}` for a small number of high-value accents and primary actions.
- Lead with a clear personal headline and a concise explanation of technical interests.
- Show project screenshots or diagrams early and make the cards visually appealing.
- Explain each project's purpose, contribution, tools, and outcome.
- Use consistent image ratios, card spacing, and typography.
- Make the site responsive, keyboard accessible, and readable at all sizes.
- Use authentic, accurate project details and outcomes.

### Don't

- Don't recreate Linear's product marketing page or reuse its lavender-blue accent.
- Don't use pure black for every surface; preserve subtle charcoal layering.
- Don't make every element green or surround everything with a green glow.
- Don't use generic hacker imagery, code rain, random terminal windows, or decorative binary.
- Don't fill the hero with paragraphs, skill badges, or too many buttons.
- Don't make every section a bordered card; use spacing and typography to create hierarchy.
- Don't use stock imagery when actual project screenshots or diagrams would be more informative.
- Don't invent project metrics, screenshots, or technical experience.

## Responsive Behavior

### Breakpoints

| Name | Width | Key Changes |
|---|---|---|
| Desktop-XL | 1440px | Full container and featured project layout |
| Desktop | 1280px | 2-column project grid; 3 columns only for compact cards |
| Tablet | 1024px | 2-column grid with reduced section spacing |
| Mobile-Lg | 768px | Single-column hero or stacked hero; compact navigation |
| Mobile | 480px | Single-column cards; headline scales to fit |

### Touch Targets

- Buttons and navigation controls should be at least 44px high on touch devices.
- Interactive card links must have clear focus and active states.
- Ensure adequate spacing between links and controls.

### Collapsing Strategy

- Navigation collapses to an accessible menu below 768px.
- Project cards shift from 2 columns to 1 column below 768px.
- Side-by-side hero layouts stack vertically on smaller screens.
- Headline sizes scale fluidly; prevent horizontal overflow and awkward line breaks.
- Technology tags wrap naturally rather than shrinking below readable sizes.

### Image Behavior

- Keep card image ratios consistent within each row.
- Use `object-fit: contain` for interface screenshots when all UI content matters; use `cover` for photography when cropping is intentional.
- Ensure images don't dominate mobile cards or push project titles too far down.
- Lazy-load below-the-fold images and provide descriptive alt text.

## Iteration Guide

1. Change one component or design category at a time and reference its token name.
2. Keep colors, typography, and spacing tied to the tokens defined in this file.
3. When adding a new page section, decide whether it needs a panel or can use open canvas space.
4. Keep the hero, project grid, and contact action consistent with the overall portfolio identity.
5. After edits, run `npx @google/design.md lint DESIGN.md` if the tool is part of the project workflow.
6. Add component variants as separate entries instead of introducing one-off styles.
7. Verify desktop, tablet, and mobile layouts after each major change.
8. Review contrast, keyboard focus, reduced-motion behavior, and image alt text.

## Known Gaps

- These tokens define the intended visual system; implementation details may vary depending on the website framework and component library.
- Exact font rendering depends on font loading and platform fallbacks.
- Project images should be supplied from actual portfolio assets; this file does not create or validate those assets.
- Contact-form validation and submission behavior must be specified by the implementation if a form is added.
- Use real, supportable project outcomes; only publish metrics that can be explained and substantiated.
