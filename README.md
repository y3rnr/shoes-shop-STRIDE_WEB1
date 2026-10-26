# STRIDE Shoes Shop

A multi-page shoe-store demonstration. Made with HTML, CSS, Bootstrap 5.3 (forms), and simple JavaScript.

## Pages
- Home (`index.html`): hero, products, welcome input, shared colour theme.
- Catalogue (`catalogue.html`): six shoe cards, live search, favourites, buttons to add an existing product to favourites.
- About (`about.html`): company story, timeline, features.
- Contact (`contact.html`): accessible demo contact form, information and interactive FAQ.
- Registration (`registration.html`): demo registration with password confirmation, validation and reset.
- Demo result (`demo_result.html`): honest static-form result message.

## Files
- `css/style.css`: shared styling, dark/light theme, component styles.
- `css/responsive.css`: responsive Flexbox and Grid layouts.
- `js/home.js`: name welcome, theme and demo registration validation.
- `js/faq.js`: FAQ and contact form validation.
- `js/catalogue.js`: search and favourites.
- `images/`: all eight original image files.

## Run
Open `index.html` with VS Code Live Server. Follow the navigation to other pages.

## Test
- Welcome: type a name with spaces; empty input shows a helpful message.
- Theme: switch theme, open another page, confirm it stays.
- FAQ: each of three questions opens and closes on click or Enter/Space.
- Search: case-insensitive; empty query shows six items; nonexistent query shows no results.
- Favourites: add by typing or product button, press Enter, remove one item, check count.
- Contact: incomplete or invalid form is blocked; valid sample data opens `demo_result.html`, which says nothing was sent.
- Registration: incorrect password confirmation blocks demo success; valid data displays demo success; Reset clears errors.
- Responsive: test 320, 375, 768, 1024 and 1440 CSS pixels, with visible keyboard focus.

## Previous assignments
Assignment 2/3 requested semantic HTML, distinct pages, 20+ types of tags, two Flexbox and two Grid layouts, a six-item grid, responsive UI and an honest demo form. Their original submissions prohibited Bootstrap/JS. A later **Forms & Validation** assignment explicitly required Bootstrap and JavaScript. The current **DOM & Events** assignment requires JavaScript. This is an *evolved* final version; it is not a substitute for the historical HTML/CSS-only snapshots.

## Work allocation (confirm against your real Git commits)
- Yernur: welcome, theme, shared header.
- Ramazan: FAQ, contact form.
- Abylai: search, favourites, product cards.
- Registration belongs to the earlier forms assignment; do not claim a new owner's work without checking Git history.

## Limitations
Forms are demonstrations, not connected to a backend. Favourites are temporary and are cleared when the page reloads. No payments or real user accounts are implemented.

Repository: https://github.com/y3rnr/shoes-shop-STRIDE_WEB1
Deployed URL: add your tested GitHub Pages URL here.
