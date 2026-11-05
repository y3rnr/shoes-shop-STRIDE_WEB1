STRIDE is a student frontend shoe catalogue built with HTML, CSS, JavaScript and jQuery. It is a demonstration website, not a real shop.

## Team

- Yernur — Part 1: Home, navigation, theme and welcome
- Abylay — Part 2: Catalogue, galleries and selected products
- Ramazan — Part 3: Contact, FAQ and Registration forms

## Run

Open `index.html` using VS Code Live Server. Use the navigation links to visit the five pages.

## Project files

| File | Simple purpose |
| --- | --- |
| `index.html` | Home, hero, Best Sellers and welcome |
| `catalogue.html` | Search, category filters and Your Selection |
| `about.html` | Philosophy, footwear comparison and team |
| `contact.html` | Contact form and FAQ |
| `registration.html` | Demo registration form |
| `css/style.css` | Colours, layout, cards, dark/light theme |
| `css/responsive.css` | Phone and tablet adjustments |
| `js/theme-init.js` | Apply the saved theme before CSS loads |
| `js/site.js` | Mobile menu, theme button, Home welcome, FAQ |
| `js/data.js` | Eight shoe models, three colours per model |
| `js/catalogue.js` | Product cards, galleries, Details, search and filters |
| `js/selection.js` | Buy, selected list, quantity and total |
| `js/form-validation.js` | Contact and Registration checks with simple `if` statements |
| `js/vendor/jquery.min.js` | The unchanged official jQuery 3.6.1 library |

`home.js` is not missing: its welcome form is now in **`site.js`**. Product cards on Home are created by **`catalogue.js`**, so Home and Catalogue share the same design. The old `navbar.js`, `faq.js`, `jquery-main.js` and `favourites.js` were replaced by `site.js` and `selection.js`.

## Main features

- Light and dark theme; selected mode remembered in the browser.
- Eight models and twenty-four colour images; three clickable dots per product.
- Case-insensitive search and category buttons working together.
- Details and Buy buttons, one entry per model, `+ / −`, removal and total.
- Contact FAQ with animated answers.
- Contact and Registration forms with validation and demo confirmation.

To add another model, copy one object in `js/data.js` and give it a new ID and three image paths. Prices and shoe descriptions are examples. Contact and Registration do not send information to a server.

## Latest layout changes

- Catalogue search and category controls have no extra visible captions. Accessibility labels remain in the HTML.
- Removed the redundant bottom promotion sections from Contact and Registration.
- Selection note is shown once.
- Hero decorative circle uses CSS `aspect-ratio: 1 / 1` on all screen sizes.
