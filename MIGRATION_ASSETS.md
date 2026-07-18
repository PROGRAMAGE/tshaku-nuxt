This directory was created during the Nuxt 3 migration.

Notes about vendor assets:

- The original project referenced many vendor CSS/JS files hosted on https://tshaku.com/view/socialV/assets/... and similar remote URLs.
- By default the migration preserves those remote references in nuxt.config.ts app.head so the app will load the same vendor scripts/styles from the original host.

Recommended actions:
1. If you want to serve vendor assets locally (recommended for reliability), copy the files from the original repo's public/view/socialV/assets/ into this repo under public/view/socialV/assets/ preserving paths.
2. If you prefer to keep remote URLs, no further action is required.

How to copy assets (example):
- rsync or scp the directory from the original server/repo into this repo's public/ directory, preserving paths.

After copying, verify references in nuxt.config.ts head (link/script entries) and update any absolute remote URLs to local paths (for example: /view/socialV/assets/js/libs.min.js).
