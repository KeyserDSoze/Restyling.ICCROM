# ICCROM — Restyling concept

Static React/Vite concept for a possible redesign of [ICCROM.org](https://www.iccrom.org/).

## What this prototype demonstrates

- a marketing-first, highly visual homepage;
- ICCROM's 2026–2031 **CARE** framework as the primary narrative;
- connected content across Strategic Directions, Priority Areas, projects, news, courses and publications;
- a project detail drawer showing how relational content could work in the future Directus CMS;
- light/dark mode;
- language-ready UI for EN, FR, ES, IT, AR, ZH, PT and HI, including RTL for Arabic;
- responsive layout and reduced-motion support;
- static GitHub Pages deployment;
- a lightweight password gate for private previews.

## Repository layout

```text
src/
  app/
    components/
    data/
    App.jsx
    i18n.js
    main.jsx
    styles.css
```

## Local development

```bash
npm install
npm run dev
```

When no build-time hash is supplied, the local demo password is `iccrom-demo`.

## GitHub Pages password

Create the repository Actions secret:

```text
password_ui = <your preview password>
```

The workflow hashes that secret with SHA-256 and exposes **only the hash** to the Vite build as `VITE_UI_PASSWORD_HASH`.

> Important: GitHub Pages is a static public hosting service. Any client-side password gate can only discourage casual access; it is not real authentication. For confidential material, use an authenticated hosting layer such as Azure Static Web Apps authentication / Entra ID or another server-side access control.

## Content basis

The prototype uses selected public ICCROM content current in 2026, including the Strategic Plan 2026–2031 / CARE vision, African craftsmanship capacity building, ASILI, READY Track 2, World Heritage Leadership, Sustaining Digital Heritage, ChemiNovaEU, and selected 2026 news, courses and publications.

This is a design prototype, not an official ICCROM website. Copy should be validated and migrated from the source CMS before production use.
