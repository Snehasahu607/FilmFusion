# FilmFusion – React Movie Discovery App

FilmFusion is a responsive movie discovery app built with React and Vite. Browse a curated collection of movies, narrow the list with search and filters, and save favorites during your visit.

## Features

- Search movies by title as you type.
- Filter movies by genre and release year.
- Sort by rating, newest year, or title.
- Add movies to and remove movies from your favorites list. Favorites are held in app state and reset when the page is reloaded.
- Open a movie's details, including its description, rating, year, and genres.
- Responsive layouts for desktop, tablet, and mobile.

## Technologies

- React
- JavaScript (ES modules)
- HTML
- CSS
- Vite

## Run locally

Install [Node.js](https://nodejs.org/) and npm, then run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

To create and preview a production build:

```bash
npm run build
npm run preview
```

## Project structure

```text
FilmFusion/
├── public/
│   └── assets/       # Movie poster images
├── src/
│   ├── main.jsx      # Movie data, React UI, search, filters, and favorites
│   └── styles.css    # App styling and responsive layouts
├── index.html        # Vite HTML entry point and browser page title
├── package.json      # Dependencies and npm scripts
├── package-lock.json # Locked dependency versions
└── vite.config.js    # Vite configuration
```

## Future enhancements

- Persist favorites between visits, for example with local storage.
- Add movie details such as trailers, cast, and streaming availability.
- Connect to a movie API to search a larger, up-to-date catalog.
- Add automated tests for filtering and favorite behavior.
