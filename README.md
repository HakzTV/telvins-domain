# Telvin Varfley — Personal Portfolio

> Cloud-native software engineer & Azure architect based in Accra, Ghana.

Live site: [telvins-domain](https://telvinvarfley.com/)

---

## Stack

| Layer | Tech |
|---|---|
| Markup | Vanilla HTML5 |
| Styles | Modular CSS (custom design system — `css/variables.css`) |
| Scripts | Vanilla JS (no frameworks) |
| Contact | [Formspree](https://formspree.io) |
| Hosting | GitHub Pages |

---

## Project Structure

```
telvin-personal-site/
├── index.html          # Single-page app — all views
├── css/
│   ├── variables.css   # Design tokens (colors, type, spacing)
│   ├── base.css        # Reset, typography, global elements
│   ├── components.css  # Buttons, tags, cards, badges
│   └── sections.css    # Section-level layout (hero, contact, footer…)
├── js/
│   ├── main.js         # Navigation, orbit wheel, globe canvas
│   └── contact.js      # Formspree form submission
└── images/
    └── tee.png         # Portrait
```

---

## Design System

Tokens live in `css/variables.css`:

| Token | Value | Usage |
|---|---|---|
| `--ember` | `#ff5a1f` | Brand orange — CTAs, highlights |
| `--ink` | `#0b0b0c` | Page background |
| `--line` | `#2a2a2e` | Borders, dividers |
| `--fg` | `#f4f3f0` | Primary text |

---

## License

© 2026 Telvin Varfley. All rights reserved.
