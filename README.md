# Sakly Chiheb — Executive Portfolio

Modern, premium, single-page portfolio website for a Senior Tech Lead profile specializing in AI-Driven Software Engineering, Data Engineering and Regulatory Technology (RegTech) for Banking & FinTech.

## ?? Live Demo

Deployed via GitHub Pages: `https://<your-username>.github.io/<repo-name>/`

## ? Features

- Modern 2026-style executive design with Glassmorphism
- Dark mode / Light mode toggle (persisted via `localStorage`)
- Fully responsive (desktop, tablet, mobile)
- Hero typing animation
- Animated KPI counters
- Particle background canvas (with connecting lines)
- Scroll-triggered animations via Intersection Observer
- Sticky navigation with active-section highlighting
- Mobile hamburger menu
- Scroll-to-top button
- Parallax hero visual
- Professional loading screen
- SEO: meta title/description, Open Graph, Twitter Card, JSON-LD structured data
- Accessible: skip link, semantic HTML, AA-compliant color contrast, `prefers-reduced-motion` support
- Pure HTML/CSS/JavaScript — no build step, no framework, no backend

## ?? Project Structure

```
/
??? index.html
??? css/
?   ??? styles.css
??? js/
?   ??? main.js
??? assets/
?   ??? profile.jpg
?   ??? resume.pdf
?   ??? favicon.png
??? README.md
```

## ??? Customization

1. Replace `assets/profile.jpg` with your own portrait (recommended 360x360px, square).
2. Replace `assets/resume.pdf` with your actual resume/CV.
3. Replace `assets/favicon.png` with your own favicon (32x32 or 64x64).
4. Update content directly inside `index.html` (text, links, LinkedIn/GitHub URLs).
5. Adjust theme colors via CSS variables at the top of `css/styles.css`:

```css
:root {
  --primary: #0F172A;
  --secondary: #1E293B;
  --accent: #2563EB;
  --success: #10B981;
  --bg: #F8FAFC;
}
```

## ?? Deploying to GitHub Pages

1. Push this project to a GitHub repository.
2. Go to **Settings ? Pages**.
3. Under **Source**, select the `main` branch and `/ (root)` folder.
4. Save — your site will be published at `https://<your-username>.github.io/<repo-name>/`.

No build tools, bundlers, or dependencies are required.

## ?? License

Personal portfolio content © Sakly Chiheb. Code structure free to reuse/adapt for your own portfolio.
