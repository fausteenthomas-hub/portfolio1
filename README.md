# Personal Portfolio

A clean, read-only static portfolio website built for GitHub Pages.

## Structure

```
portfolio/
├── index.html       ← All content lives here (edit this to update the site)
├── style.css        ← All styles and design tokens
├── script.js        ← UI interactions (nav, scroll, animations)
├── assets/
│   ├── photo.jpg    ← Your profile photo (replace this)
│   └── cv.pdf       ← Your CV/Resume (replace this)
└── README.md
```

## Deploying to GitHub Pages

1. Create a new repository on GitHub (e.g. `yourname.github.io` or `portfolio`)
2. Upload all files keeping the structure above
3. Go to **Settings → Pages**
4. Set source to **Deploy from a branch → main → / (root)**
5. Click **Save** — your site will be live at `https://yourname.github.io`

## Updating Your Portfolio

All content is hardcoded in `index.html`. There is no CMS or database.

To update anything:
1. Open `index.html` in a text editor
2. Find the section you want to change (each section has a comment header explaining what to edit)
3. Make your edits
4. Commit and push to GitHub
5. GitHub Pages rebuilds automatically (usually within 30–60 seconds)

### Common Updates

**Change your name:** Search for `Your Name` in `index.html` — it appears in the hero `<h1>`, the about section alt text, the footer, and the page `<title>`.

**Add a certification:** In the `#certifications` section, copy an `<article class="cert-item">` block and paste it with your new details.

**Add an achievement:** In the `#achievements` section, copy a `<div class="timeline-item">` block and paste it with your new details.

**Update contact info:** Find the `#contact` section and update the `href` and display text of each `.contact-card`.

**Change accent color:** Open `style.css` and change `--accent: #1B3A5C;` in the `:root` block to any hex color you prefer.

**Add your photo:** Place your photo at `assets/photo.jpg`. Recommended: portrait orientation (3:4 ratio), at least 600×800px, professional background.

**Add your CV:** Place your CV at `assets/cv.pdf`.

## No localStorage

This portfolio does **not** use localStorage for any content. All data lives in the HTML file. This ensures the live site always reflects exactly what is in your GitHub repository.
