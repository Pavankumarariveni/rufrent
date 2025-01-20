
# Modern React Application with Vite

A modern React application built with Vite, featuring lightning-fast HMR (Hot Module Replacement), optimized builds, and a modern development experience.

## About Vite

Vite (French word for "fast", pronounced `/vit/`) is a modern build tool that significantly improves the development experience. Created by Evan You (creator of Vue.js), Vite offers:

- **Lightning Fast Cold Start**: Leverages native ES modules to avoid bundling during development
- **Instant Hot Module Replacement (HMR)**: Updates your app without refreshing the page
- **True On-Demand Compilation**: Only compiles what's needed, when needed
- **Optimized Build**: Uses Rollup for highly optimized production builds
- **Out-of-the-box Support**: Includes support for TypeScript, JSX, CSS, and more

## Features

- **Vite Dev Server** - Lightning-fast development with HMR
- **React 18** - Latest React features and improvements
- **Tailwind CSS** - Utility-first CSS framework
- **React Router v6** - Client-side routing
- **Axios** - HTTP requests handling
- **React Icons** - Comprehensive icon library
- **React Loader Spinner** - Loading animations

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (version 14.0.0 or higher)
- npm (version 6.0.0 or higher)

## Getting Started with Vite

This project was bootstrapped with Vite using the following command:
```bash
npm create vite@latest my-react-app -- --template react
```



## Dependencies

Here are the main dependencies used in this project:

- **React** (v18.3.1) - A JavaScript library for building user interfaces
- **React DOM** (v18.3.1) - React package for DOM rendering
- **React Router DOM** (v6.28.0) - Declarative routing for React applications
- **Axios** (v1.7.7) - Promise-based HTTP client
- **React Icons** (v5.3.0) - Popular icon libraries
- **React Loader Spinner** (v4.0.0) - Loading animations
- **Tailwind CSS** (v3.4.14) - Utility-first CSS framework

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode with Vite's dev server.\
Open [http://localhost:5173](http://localhost:5173) to view it in your browser.
- Features instant HMR (Hot Module Replacement)
- No bundling during development
- Instant server start

### `npm run build`

Builds the app for production to the `dist` folder.
- Optimized with Rollup
- Code splitting out of the box
- CSS minification and optimization

### `npm run preview`

Locally preview the production build.
- Serves the production build locally
- Useful for testing the build before deployment


## Vite Configuration

The `vite.config.js` file in your project root contains Vite-specific configurations:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true
  },
  // Add any other custom configurations here
})
```

## Development with Vite

### Hot Module Replacement (HMR)
- Changes to React components are instantly reflected
- Preserves component state during updates
- No page reload needed for most changes










