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


## Brand direction used in the concept

The October 2026 redesign follows ICCROM's 2024 identity direction rather than inventing a separate Agic visual language:

- Bricolage Grotesque for expressive display typography;
- Lora for editorial/body copy;
- Tajawal / Noto Sans support for Arabic and multilingual use;
- the 2024 location-pin/globe logo language;
- a vibrant blue + warm red-led palette with broad secondary colours;
- editorial photography and tactile/heritage-inspired graphic marks;
- motion used to reveal impact and connected content rather than as decoration.

The prototype colour tokens are **brand-aligned working values**, not a claim that the hexadecimal values are the final ICCROM production tokens. Before delivery, replace them with the exact tokens from ICCROM's supplied brand asset/template pack.

The concept also uses selected public ICCROM imagery via remote URLs for presentation purposes. Production should ingest approved original assets into the CMS/DAM instead of hotlinking them.


## Preview access passwords

The GitHub Pages pipeline accepts two repository secrets:

- `password_ui`
- `password_ui_2`

Both are hashed with SHA-256 during the build. The frontend receives only the two hashes and accepts either password. After a successful unlock, the preview state is stored in `localStorage` without an expiry, so the same browser will not ask again unless site storage is cleared.
