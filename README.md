# BreakMakers

Static marketing website for Break Makers, a football card repack brand built for breakers and live stream presentation.

Live site: https://breakmakers.com

## Project Structure

- `index.html` - home page
- `about.html` - company and process page
- `checklists.html` - tier overview
- `silver-checklist.html`, `gold-checklist.html`, `platinum-checklist.html`, `case-hit-checklist.html` - product checklist pages
- `contact.html` - Netlify-powered contact form
- `404.html` - custom not-found page
- `style.css` - shared styling
- `script.js` - shared navigation and footer helpers
- `_redirects` - Netlify redirect rules

## Deployment

This repository is Netlify-first. The production domain is `breakmakers.com`, and `_redirects` redirects the Netlify subdomain to the custom domain.

The contact form in `contact.html` uses Netlify Forms, so form submissions depend on the site being deployed through Netlify.

## Local Preview

Because this is a static site, you can open `index.html` directly in a browser or serve the folder with any simple static server.

Example:

```sh
python3 -m http.server 4173
```

Then visit `http://localhost:4173`.

## Development Notes

Keep shared layout and styling changes in `style.css` when possible. Several pages still use placeholder product images and example checklist content, so those should be replaced before a public launch push.
