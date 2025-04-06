#!/bin/bash

mkdir -p 3rd-space-app/frontend/src/{components,screens,assets,navigation,utils}
touch 3rd-space-app/frontend/App.tsx
touch 3rd-space-app/frontend/package.json

mkdir -p 3rd-space-app/backend/{database,functions}
touch 3rd-space-app/backend/README.md
touch 3rd-space-app/backend/database/schema.sql

mkdir -p 3rd-space-app/design/{logos,color-palette,hi-fi-mockups}

mkdir -p 3rd-space-app/docs
touch 3rd-space-app/docs/{pitch-deck.pdf,product-brief.md,roadmap.md}

echo "✅ Project structure created!"