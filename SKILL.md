---
name: revealjs
description: Create HTML presentations with Reveal.js. Supports Croissan KP theme (based on Figma), PDF export via Decktape, Markdown, code highlighting, animations, speaker notes.
---

# Reveal.js Presentations

## Quick Start

```bash
# Create presentation
bash scripts/create.sh "Title" output.html croissan-kp

# Export to PDF (requires decktape)
bash scripts/export-pdf.sh output.html output.pdf
```

## Croissan KP Theme ⭐

Official Croissan Studio КП theme based on [Figma Slides](https://www.figma.com/design/Kt2EZZ7agkFXnwuebsWvCo/Slides).

### Design Specs

| Property | Value |
|----------|-------|
| Size | 1280×720 (16:9) |
| Font | SF Pro Display/Text, Semibold 600 |
| Background | `#ebebeb` |
| Text | `#26242c` |
| Accent | `#2626c9` |
| Muted | `#89888c` |

### Color Palette (CSS Variables)

```css
/* Core */
--kp-bg: #ebebeb;
--kp-text: #26242c;
--kp-text-muted: #89888c;
--kp-accent: #2626c9;
--kp-accent-bright: #3840ff;
--kp-white: #ffffff;
--kp-card-bg: #d9d9d9;

/* Extended */
--kp-blue-apple: #007aff;
--kp-green-spotify: #1ed760;
--kp-purple: #4f378a;
--kp-cyan: #2fcdff;
--kp-slate: #0f172a;
```

### Layout Classes

| Class | Description |
|-------|-------------|
| `.logo` | "Croissan Studio" top-right |
| `.footer` | Copyright bottom-left |
| `.legal` | Legal text block |
| `.two-col` | Two-column grid layout |
| `.image-grid` | 6-column image grid |
| `.card` | White card container |

### Utility Classes

**Text colors:** `.accent`, `.accent-bright`, `.muted`, `.text-white`, `.text-blue`, `.text-green`, `.text-purple`, `.text-cyan`, `.text-slate`

**Backgrounds:** `.bg-white`, `.bg-dark`, `.bg-slate`, `.bg-accent`, `.bg-green`, `.bg-purple`

### Slide Templates

```html
<!-- Title slide -->
<section>
  <span class="logo">Croissan Studio</span>
  <h1>Коммерческое<br>предложение<br>для &lt;проект&gt;</h1>
  <div class="legal">ООО "КРУАССАН СТУДИО", ИНН ...</div>
</section>

<!-- Two-column slide -->
<section>
  <span class="logo">Croissan Studio</span>
  <div class="two-col">
    <div>
      <h2>Заголовок</h2>
      <p>Описание</p>
    </div>
    <div>
      <img src="image.png" alt="">
    </div>
  </div>
  <span class="footer">Croissan Studio © 2024</span>
</section>

<!-- Section divider -->
<section>
  <h1>Название<br>раздела</h1>
  <span class="footer">Croissan Studio © 2024</span>
</section>
```

## PDF Export

### Decktape (recommended)

```bash
# Install once
npm install -g decktape

# Export
python3 -m http.server 8765 &
decktape reveal --size 1280x720 \
  --chrome-arg=--no-sandbox \
  --chrome-arg=--disable-setuid-sandbox \
  http://localhost:8765/presentation.html output.pdf
pkill -f "http.server 8765"
```

**Why Decktape:**
- Official Reveal.js recommendation
- Vector PDF (selectable text)
- Correct slide dimensions
- No print-pdf layout issues

### Browser (fallback)

1. Open `?print-pdf` — breaks layout often, not recommended

## Themes

| Theme | Description |
|-------|-------------|
| `croissan-kp` ⭐ | КП/Sales decks (from Figma) |
| `croissan` | Website style (Golos Text) |
| `black` | Default dark |
| `white` | Light minimal |

## Structure

```html
<div class="reveal">
  <div class="slides">
    <section>Slide 1</section>
    <section>Slide 2</section>
    <section>  <!-- Vertical stack -->
      <section>2.1</section>
      <section>2.2</section>
    </section>
  </div>
</div>
```

## Markdown

```html
<section data-markdown>
  <textarea data-template>
## Title
- Point 1
- Point 2
---
## Next Slide
  </textarea>
</section>
```

## Fragments

```html
<p class="fragment">First</p>
<p class="fragment fade-up">Second</p>
<p class="fragment highlight-blue">Third</p>
```

Styles: `fade-in`, `fade-out`, `fade-up`, `grow`, `shrink`, `strike`, `highlight-red/green/blue`

## Code

```html
<pre><code data-trim data-line-numbers="1|3-5">
const a = 1;
const b = 2;
return a + b;
</code></pre>
```

## Config

```javascript
Reveal.initialize({
  width: 1280,
  height: 720,
  margin: 0,
  center: false,        // Left-align for KP theme
  transition: 'none',
  hash: true,
  controls: true,
  progress: true,
  plugins: [RevealMarkdown, RevealHighlight, RevealNotes]
});
```

## Keyboard

| Key | Action |
|-----|--------|
| → ↓ Space | Next |
| ← ↑ | Previous |
| ESC | Overview |
| S | Speaker view |
| F | Fullscreen |
| ? | Help |

## Files

| File | Description |
|------|-------------|
| `assets/template-croissan-kp.html` | KP theme template |
| `theme-croissan-kp.css` | KP theme CSS |
| `scripts/export-pdf.sh` | PDF export helper |
| `scripts/create.sh` | Create new presentation |
