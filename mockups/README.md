# Supplied static ICCROM mockups

The four supplied static concepts are intentionally kept separate from the React application.

During the GitHub Pages build, the workflow reconstructs them under:

- `/mockups/horizon/` — source folder `mockup` — institutional and immersive
- `/mockups/chapters/` — source folder `mockup-v2` — five-chapter accessible concept
- `/mockups/mosaic/` — source folder `mockup-v3` — editorial and playful concept
- `/mockups/patina/` — source folder `mockup-v4` — material and pigments concept

No HTML, CSS, JavaScript or image asset is rewritten by the build.

## Source package

Preferred file:

`mockups/ICCROM-static-mockups-package.zip`

This is a deduplicated transport package. Its `manifest.json` maps every original path to a SHA-256-addressed blob. The Pages workflow verifies each checksum and restores the original files byte-for-byte before Vite builds the site.

The workflow also accepts the original archive as a fallback:

`mockups/ICCROM 1.zip`

When neither package is present, the existing three React experiences remain available and the four static cards stay hidden.
