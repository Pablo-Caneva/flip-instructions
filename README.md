## Attempter Checklist

A single-page, responsive checklist UI with 9 interactive cards. Clicking a card opens a fullscreen flip viewer that loads detailed content for that card. All content is plain HTML/CSS/JS (no build step).

### Quick start

1. Open `index.html` in any modern browser.
2. Click a card to open its fullscreen content.

Optional: Serve locally (prevents caching issues when editing card files):

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

### Project structure

- `index.html` — Layout for the 9 cards (3 per row). Each button has:
  - `data-title` — The title shown in the viewer header (hidden by styles in this theme).
  - `data-card` — The fragment file (without extension) to load from `cards/`.
- `cards/` — One HTML fragment per card. Left column holds a bold title and a checklist; right column is a close-on-click image area.
- `style.css` — Theme, layout, and viewer styles (dark palette inspired by `images/main.png`).
- `script.js` — Handles loading card fragments into the viewer and open/close behavior with simple caching.
- `images/` — Assets. `main.png` informs the color palette/hero background.

### How cards work

Cards are plain `<button class="node ...">` elements. The JavaScript reads `data-card` and fetches `cards/<name>.html` when clicked, inserting it inside the fullscreen viewer.

Each card fragment follows this structure:

```html
<div class="container-fluid h-100">
  <div class="row g-3 h-100">
    <div class="col-12 col-lg-4 d-flex">
      <div class="content-text flex-grow-1 no-close-zone">
        <h3 class="h5 mb-3"><strong>Card Title</strong></h3>
        <!-- checklist here -->
      </div>
    </div>
    <div class="col-12 col-lg-8 d-flex close-on-click">
      <div class="flex-grow-1">
        <img src="https://picsum.photos/1200/800" alt="..." class="img-fluid rounded"/>
      </div>
    </div>
  </div>
  </div>
```

Notes:
- Clicking inside the right column (with class `close-on-click`) closes the viewer.
- The left column (`no-close-zone`) does not close the viewer so you can interact with checkboxes.

### Theming & layout

Key CSS variables (in `:root` of `style.css`):

```css
--bg, --bg-accent, --surface, --card, --text, --muted, --primary
```

Update these to tweak colors. The page uses a hero background that overlays `images/main.png`. Nodes scale slightly on hover; fullscreen cards use the dark `--surface` background for readability. Italic text uses the accent color for contrast.

### Adding a new card

1. Create `cards/<name>.html` using the structure above.
2. Add a new button in `index.html` with `data-card="<name>"` and the user-facing label/title.

### Accessibility & keyboard

- Press `Escape` to close the fullscreen viewer.
- Buttons are focusable and operable with keyboard by default.

### License

This project is provided as-is for internal/demo use.


