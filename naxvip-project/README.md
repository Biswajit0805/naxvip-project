# NAX VIP Homepage

React + Vite + Tailwind CSS clone of the NAX VIP homepage design.

## Run in VS Code

1. Unzip this folder and open it in VS Code (`File > Open Folder`).
2. Open the built-in terminal (`` Ctrl + ` ``) and install dependencies:
   ```
   npm install
   ```
3. Start the dev server:
   ```
   npm run dev
   ```
4. Open the URL it prints (usually `http://localhost:5173`) in your browser.

## Build for production

```
npm run build
npm run preview
```

## Project structure

```
├── index.html          # HTML entry point
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
└── src/
    ├── main.jsx         # React entry point
    ├── index.css        # Tailwind directives
    └── App.jsx          # Full homepage component (all images embedded as base64)
```

All images (hero photo, category cards, product shots, banners) are cropped
directly from the original design and embedded inline as base64 inside
`App.jsx`, so there are no separate image files to manage — everything works
out of the box after `npm install`.
