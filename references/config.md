# Reveal.js Configuration Reference

## All Options

```javascript
Reveal.initialize({
  // Display
  controls: true,              // Navigation arrows
  controlsTutorial: true,      // Help hints for controls
  controlsLayout: 'bottom-right', // 'bottom-right' or 'edges'
  controlsBackArrows: 'faded', // 'faded', 'hidden', 'visible'
  progress: true,              // Progress bar
  slideNumber: false,          // 'h.v' | 'h/v' | 'c' | 'c/t' | function
  showSlideNumber: 'all',      // 'all' | 'print' | 'speaker'
  hashOneBasedIndex: false,    // 1-based slide index in URL
  hash: false,                 // Push slide state to URL
  respondToHashChanges: true,  // React to hash changes
  history: false,              // Push history entry per slide
  keyboard: true,              // Enable keyboard shortcuts
  keyboardCondition: null,     // Function to check keyboard enabled
  disableLayout: false,        // Disable scaling/centering
  overview: true,              // Enable overview mode
  center: true,                // Vertical centering
  touch: true,                 // Touch navigation
  loop: false,                 // Loop at end
  rtl: false,                  // Right-to-left
  navigationMode: 'default',   // 'default' | 'linear' | 'grid'
  shuffle: false,              // Randomize slide order
  fragments: true,             // Enable fragments
  fragmentInURL: true,         // Fragment index in URL
  embedded: false,             // Embedded mode (limited portion)
  help: true,                  // Show help on ?
  pause: true,                 // Allow pause
  showNotes: false,            // Show speaker notes to all
  
  // Auto-play
  autoPlayMedia: null,         // true | false | null (auto)
  preloadIframes: null,        // true | false | null (auto)
  
  // Auto-Animate
  autoAnimate: true,           // Enable auto-animate
  autoAnimateMatcher: null,    // Custom element matcher
  autoAnimateEasing: 'ease',   // CSS easing function
  autoAnimateDuration: 1.0,    // Duration in seconds
  autoAnimateUnmatched: true,  // Fade in unmatched elements
  autoAnimateStyles: [         // Animatable properties
    'opacity', 'color', 'background-color', 'padding',
    'font-size', 'line-height', 'letter-spacing',
    'border-width', 'border-color', 'border-radius', 'outline',
    'outline-offset'
  ],
  
  // Auto-Slide
  autoSlide: 0,                // Auto-advance (ms), 0 = off
  autoSlideStoppable: true,    // Stop on user input
  autoSlideMethod: null,       // Navigation method
  
  // Transitions
  transition: 'slide',         // none | fade | slide | convex | concave | zoom
  transitionSpeed: 'default',  // default | fast | slow
  backgroundTransition: 'fade', // Background transition style
  
  // View Distance
  viewDistance: 3,             // Slides to preload
  mobileViewDistance: 2,       // Mobile preload distance
  
  // Sizing
  width: 960,                  // Slide width
  height: 700,                 // Slide height
  margin: 0.04,                // Margin around slides (0-0.5)
  minScale: 0.2,               // Minimum scale
  maxScale: 2.0,               // Maximum scale
  
  // Display
  display: 'block',            // CSS display mode
  hideInactiveCursor: true,    // Hide cursor when inactive
  hideCursorTime: 5000,        // Time before hiding (ms)
  
  // PDF Export
  pdfMaxPagesPerSlide: Number.POSITIVE_INFINITY,
  pdfSeparateFragments: true,  // Each fragment on separate page
  pdfPageHeightOffset: -1,     // Height adjustment
  
  // Plugins
  plugins: []
});
```

## Slide-Level Attributes

Apply to `<section>`:

| Attribute | Values | Description |
|-----------|--------|-------------|
| `data-transition` | none/fade/slide/convex/concave/zoom | Slide transition |
| `data-transition-speed` | default/fast/slow | Transition speed |
| `data-background-transition` | none/fade/slide/convex/concave/zoom | Background transition |
| `data-background-color` | CSS color | Background color |
| `data-background-image` | URL | Background image |
| `data-background-size` | CSS size | Background size |
| `data-background-position` | CSS position | Background position |
| `data-background-repeat` | CSS repeat | Background repeat |
| `data-background-opacity` | 0-1 | Background opacity |
| `data-background-video` | URL | Background video |
| `data-background-video-loop` | (flag) | Loop video |
| `data-background-video-muted` | (flag) | Mute video |
| `data-background-iframe` | URL | Background iframe |
| `data-background-interactive` | (flag) | Allow iframe interaction |
| `data-auto-animate` | (flag) | Enable auto-animate |
| `data-auto-animate-id` | string | Group auto-animate slides |
| `data-auto-animate-restart` | (flag) | Break auto-animate chain |
| `data-auto-animate-easing` | CSS easing | Animation easing |
| `data-auto-animate-duration` | seconds | Animation duration |
| `data-auto-animate-delay` | seconds | Animation delay |
| `data-autoslide` | ms | Auto-advance for this slide |
| `data-visibility` | hidden/uncounted | Hide or exclude from count |
| `data-state` | string | Add class to `<html>` when active |
| `data-notes` | string | Speaker notes (alt to `<aside>`) |

## Runtime Configuration

```javascript
// Update config at runtime
Reveal.configure({ controls: false });

// Get current config
const config = Reveal.getConfig();
```
