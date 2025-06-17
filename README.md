# Dave Henderson - Personal Website

Built with [Astro](https://astro.build) for optimal performance and SEO.

## Available Scripts

In the project directory, you can run:

### `npm run dev` or `npm start`

Runs the app in development mode.  
Open [http://localhost:4321](http://localhost:4321) to view it in the browser.

The page will reload if you make edits.  
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `dist` folder.  
It correctly bundles and optimizes the build for the best performance with static site generation.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

### `npm run preview`

Serves the production build locally for testing.  
Run `npm run build` first, then this command to preview the built site.

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## 🚀 Project Structure

```
/
├── public/
│   └── (static assets)
├── src/
│   ├── components/
│   │   └── (Astro and React components)
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── functions/
└── package.json
```

## 🧞 Architecture

This site uses Astro for static site generation with minimal JavaScript. The only interactive component is the theme toggle, which uses React as an Astro island for optimal performance.

- **Framework**: Astro
- **Styling**: CSS with custom properties for theming
- **Interactivity**: React islands for components that need client-side state
- **Deployment**: GitHub Pages via GitHub Actions

## 🌟 Features

- ⚡ Static site generation for optimal performance
- 🎨 Dark/light theme toggle with system preference detection
- 📱 Fully responsive design
- ♿ Accessibility focused
- 🔍 SEO optimized with automatic sitemap generation
- 🚀 Minimal JavaScript bundle (only for theme toggle)

## 🔄 Migration from Create React App

This site was migrated from Create React App to Astro while maintaining the exact same visual appearance and functionality. See `ASTRO_MIGRATION.md` for detailed migration notes.

## 📦 Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the `develop` branch. The deployment workflow:

1. Builds the site with `npm run build`
2. Deploys the `dist/` folder to the `master` branch
3. GitHub Pages serves the site from the `master` branch
