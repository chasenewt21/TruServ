# TruServ Plumbing & Heating — website

A polished single-page marketing site (hero, services, why-us, service area,
contact CTA) plus separate Privacy Policy and Terms pages. Plain static
HTML/CSS with one tiny vanilla-JS file — no build step, no tracking, no forms.

## Files

```
TruServ/
├── index.html        # One-page site (hero · services · why · service area · CTA)
├── privacy.html      # Privacy Policy
├── terms.html        # Terms & Conditions
├── styles.css        # Shared styles (brand palette · wave motif · animations)
├── app.js            # Sticky-nav state + scroll reveals (IntersectionObserver)
└── assets/
    └── truserv-logo.jpg
```

## Animations

CSS transform/opacity only (cheap on any device): a staggered hero load-in,
an animated wave underline, scroll-reveal sections, and hover micro-interactions.
`app.js` adds the sticky-nav background and the scroll-reveal observer. Everything
is wrapped in `prefers-reduced-motion` guards and degrades gracefully with JS off.

## Preview locally

It's just static files, so any of these work from inside this folder:

```bash
# Option 1 — Python (built in on macOS)
python3 -m http.server 8000
# then open http://localhost:8000

# Option 2 — just double-click index.html in Finder to open in a browser
```

## Deploy

Upload the whole folder to any static host — Netlify (drag-and-drop),
Cloudflare Pages, GitHub Pages, S3, or your domain's `public_html`. No
configuration needed; `index.html` is the entry point.

## Updating the "Our Work" gallery

Each photo is one `<figure class="shot">` block in `index.html` (section
`id="work"`). To add a photo:

1. Drop a web-optimized JPG in `assets/` (aim for ~1000px wide, under 250KB).
2. Copy an existing `<figure class="shot">…</figure>` block.
3. Set the image `src`/`alt`, the category tag (`Behind the walls`,
   `Finished space`, `Before / after`), and a one-line caption.
4. Newest photos go first. Deploy with `./deploy.sh dev` to preview,
   `./deploy.sh` to publish.

## Notes

- Fonts (Fraunces + Source Sans 3) load from Google Fonts. To make the site
  fully self-contained, self-host them or swap to the system font stack already
  listed as fallbacks in `styles.css`.
- Phone number, address, and policy text are hard-coded in the HTML — edit those
  files directly to update.
