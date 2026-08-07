# Trans4m Business Consulting — Website

A clean, static HTML/CSS/JS website. No build step required.

## Structure
```
trans4m-website/
├── index.html                    Home
├── about.html                    About the Founder (Mandar Vaze)
├── services.html                 Services overview (all 4 offerings + sub-menu anchors)
├── iso-aligned-processes.html    ISO Aligned Processes — full detail page
├── blogs.html                    Blog listing + categories/tags sidebar
├── css/style.css                 Design system (tokens, layout, components, animations)
└── js/main.js                    Mega-menu, mobile nav, scroll-reveal, FAQ accordion, counters
```

## Design
- Primary color: `#00afeb` (Trans4m blue)
- Pastel accents: mint, peach, lavender, sand — used per-offering, never as the dominant color
- Type: Space Grotesk (display) + IBM Plex Sans (body) + IBM Plex Mono (labels/data)
- Signature motif: a drafting "blueprint" — dotted grid backgrounds, corner brackets, and an
  animated connecting rail that fills in as you scroll through phases/steps/projects
  (ties into "ISO 9001 Is the Roadmap" / structured-growth positioning)

## How to view
Just open `index.html` in a browser — no server needed. For local development with
live paths, you can also run: `python3 -m http.server` from this folder and visit
`http://localhost:8000`.

## Notes
- All text content is taken directly from what was provided. Sub-service pages that
  weren't supplied with content (e.g. Startup Enablement stages, Go To Market Strategy,
  Doing Business in Australia, Headcount Plus, FAQ answers) are placed as anchor
  sections on `services.html` / the FAQ block with a "coming soon" placeholder —
  ready for you to drop in copy later.
- Replace the `MV` monogram avatar with a real photo by swapping `.founder-avatar` /
  `.about-avatar` for an `<img>` tag.
- Fonts load from Google Fonts via the `@import` at the top of `style.css` — swap for
  self-hosted files if you need to work offline.
