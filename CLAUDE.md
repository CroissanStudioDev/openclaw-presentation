# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Reveal.js presentation for Startup Talk #13 about OpenClaw AI agent. No build step required — all dependencies loaded from CDN.

**Live:** https://croissanstudiodev.github.io/openclaw-presentation/

## Development

```bash
# Preview locally
open index.html

# Check for content overflow (requires puppeteer)
node ~/.claude/skills/revealjs-skill/skills/revealjs/scripts/check-overflow.js index.html
```

## Deployment

Auto-deploys to GitHub Pages on push to `main` via `.github/workflows/deploy.yml`.

## Architecture

```
index.html      # All 23 slides, Reveal.js config, plugin loading
style.css       # CSS variables (Figma tokens), layouts, components
assets/
  bg.mp4        # Title slide background video
  favicon.svg   # Site favicon
  og-image.png  # Open Graph image (1200x630)
```

### Reveal.js Setup

- **Version:** 5.1.0 (CDN)
- **Plugins:** RevealNotes, RevealZoom, RevealSearch
- **Resolution:** 1280x720 (16:9)
- **Transition:** none (instant)

### CSS Structure

Design tokens from Figma in `:root`:
- Colors: `--bg`, `--bg-dark`, `--accent`, `--text`, `--text-muted`
- Typography: `--fs-xs` through `--fs-3xl`, Inter font
- Spacing: `--radius-sm/md/lg`

Key classes:
- `.dark-slide` — dark background slides
- `.center-slide` — vertically centered content
- `.two-col`, `.three-col`, `.bento-grid` — layouts
- `.card`, `.card-accent`, `.card-success` — containers
- `.mt-sm/md/lg/xl`, `.mb-*` — margins
- `.slide-footer` — absolute bottom positioning

### Slide Structure

```html
<section>
  <span class="logo">Section Label</span>
  <div class="section-label">Subsection</div>
  <h2>Title</h2>
  <!-- content -->
  <aside class="notes">Speaker notes here</aside>
</section>
```

### Background Video

```html
<section data-background-video="assets/video.mp4"
         data-background-video-loop
         data-background-video-muted
         data-background-size="cover">
```

## Keyboard Shortcuts (Reveal.js)

- `S` — Speaker view with notes
- `O` — Slide overview
- `F` — Fullscreen
- `Esc` — Exit overview/fullscreen
- `Ctrl+Shift+F` — Search slides
