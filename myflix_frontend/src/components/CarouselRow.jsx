import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * CarouselRow renders a horizontal list of cards (e.g., Mobile Games or categories).
 * Props:
 * - title: string
 * - ctaLabel: string
 * - items: Array<{ id, title, imageUrl }>
 */
function CarouselRow({ title, ctaLabel = 'See more', items = [] }) {
  return (
    <section className="section">
      <div className="row-header">
        <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700 }}>{title}</h2>
        <Link to="/watchlist" style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600 }}>{ctaLabel} ›</Link>
      </div>
      <div className="carousel" role="list">
        {items.map(item => (
          <Link to={`/details/${item.id}`} key={item.id} className="card" role="listitem" aria-label={item.title} title={item.title}>
            <img src={item.imageUrl} alt={`${title} cover: ${item.title}`} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CarouselRow;
```

Explanation: Content grid for browse/search results.
````write file="myflix-streaming-platform-129621-129630/myflix_frontend/src/components/ContentGrid.jsx"
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * ContentGrid displays a responsive grid of poster tiles.
 * Props:
 * - items: Array<{ id, title, posterUrl }>
 */
function ContentGrid({ items = [] }) {
  return (
    <div className="grid" role="list">
      {items.map(item => (
        <Link to={`/details/${item.id}`} key={item.id} className="tile" role="listitem" aria-label={item.title} title={item.title}>
          <img src={item.posterUrl} alt={`${item.title} poster`} />
        </Link>
      ))}
    </div>
  );
}

export default ContentGrid;
```

Explanation: Dummy data utils and simple persistence (watchlist) using localStorage.
````write file="myflix-streaming-platform-129621-129630/myflix_frontend/src/utils/data.js"
export const demoFeatured = {
  id: 'tt-1',
  title: 'The Madness',
  meta: 'Successful • Thriller • Conspiracy',
  imageUrl: 'https://images.unsplash.com/photo-1529101091764-c3526daf38fe?q=80&w=1600&auto=format&fit=crop',
};

export const demoGames = [
  { id: 'g1', title: 'Pulse', imageUrl: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=800&auto=format&fit=crop' },
  { id: 'g2', title: 'Nova', imageUrl: 'https://images.unsplash.com/photo-1510511233900-1982d92bd835?q=80&w=800&auto=format&fit=crop' },
  { id: 'g3', title: 'Rush', imageUrl: 'https://images.unsplash.com/photo-1495231916356-a86217efff12?q=80&w=800&auto=format&fit=crop' },
  { id: 'g4', title: 'Vortex', imageUrl: 'https://images.unsplash.com/photo-1482192596544-9eb780fc7f66?q=80&w=800&auto=format&fit=crop' },
  { id: 'g5', title: 'Shift', imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop' },
];

export const demoCatalog = Array.from({ length: 24 }).map((_, i) => ({
  id: `mv-${i + 1}`,
  title: `Movie ${i + 1}`,
  posterUrl: `https://picsum.photos/seed/mv${i + 1}/400/600`,
}));

export const findById = (id) => {
  const all = [demoFeatured, ...demoGames.map(g => ({...g, posterUrl: g.imageUrl})), ...demoCatalog];
  return all.find(x => x.id === id) || demoFeatured;
};

export const storage = {
  get(key, fallback) {
    try { const v = JSON.parse(localStorage.getItem(key)); return v ?? fallback; } catch { return fallback; }
  },
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
};
```

Explanation: Home page implementing header chips, hero, and carousel per design notes.
````write file="myflix-streaming-platform-129621-129630/myflix_frontend/src/pages/HomePage.jsx"
import React, { useState } from 'react';
import HeroCard from '../components/HeroCard';
import CarouselRow from '../components/CarouselRow';
import { demoFeatured, demoGames, storage } from '../utils/data';

/**
 * PUBLIC_INTERFACE
 * HomePage shows the personalized feed: chips, hero featured, and carousels.
 */
function HomePage() {
  const [chips, setChips] = useState(['TV Shows', 'Movies', 'Categories ▾']);
  const onAddToList = (item) => {
    const list = storage.get('myflix_watchlist', []);
    const exists = list.find(x => x.id === item.id);
    const updated = exists ? list : [...list, { id: item.id, title: item.title, posterUrl: item.imageUrl || item.posterUrl }];
    storage.set('myflix_watchlist', updated);
    alert('Added to My List');
  };

  return (
    <div>
      <header className="chips" aria-label="Filters">
        {chips.map((c, idx) => (
          <button key={idx} className={'chip' + (idx === 0 ? ' active' : '')}>{c}</button>
        ))}
      </header>

      <HeroCard item={demoFeatured} onAddToList={onAddToList} />

      <CarouselRow title="Mobile Games" ctaLabel="My List" items={demoGames} />
    </div>
  );
}

export default HomePage;
```

Explanation: Browse page with grid of movies/shows.
````write file="myflix-streaming-platform-129621-129630/myflix_frontend/src/pages/BrowsePage.jsx"
import React from 'react';
import ContentGrid from '../components/ContentGrid';
import { demoCatalog } from '../utils/data';

/**
 * PUBLIC_INTERFACE
 * BrowsePage displays a grid of content for exploration.
 */
function BrowsePage() {
  return (
    <div>
      <div className="row-header" style={{ marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Browse</h2>
      </div>
      <ContentGrid items={demoCatalog} />
    </div>
  );
}

export default BrowsePage;
```

Explanation: Search page with simple client-side filtering.
````write file="myflix-streaming-platform-129621-129630/myflix_frontend/src/pages/SearchPage.jsx"
import React, { useMemo, useState } from 'react';
import ContentGrid from '../components/ContentGrid';
import { demoCatalog } from '../utils/data';

/**
 * PUBLIC_INTERFACE
 * SearchPage allows searching the catalog.
 */
function SearchPage() {
  const [q, setQ] = useState('');
  const results = useMemo(() => {
    if (!q) return demoCatalog;
    return demoCatalog.filter(x => x.title.toLowerCase().includes(q.toLowerCase()));
  }, [q]);

  return (
    <div>
      <div className="form" style={{ maxWidth: 720, marginTop: 0, marginBottom: 16 }}>
        <div className="field">
          <label htmlFor="query">Search</label>
          <input id="query" className="input" placeholder="Search for movies and TV shows..." value={q} onChange={e => setQ(e.target.value)} />
        </div>
      </div>
      <ContentGrid items={results} />
    </div>
  );
}

export default SearchPage;
```

Explanation: Watchlist page reading from localStorage.
````write file="myflix-streaming-platform-129621-129630/myflix_frontend/src/pages/WatchlistPage.jsx"
import React, { useEffect, useState } from 'react';
import { storage } from '../utils/data';
import ContentGrid from '../components/ContentGrid';

/**
 * PUBLIC_INTERFACE
 * WatchlistPage displays and manages the user's saved items.
 */
function WatchlistPage() {
  const [items, setItems] = useState([]);

  const refresh = () => {
    const list = storage.get('myflix_watchlist', []);
    setItems(list);
  };

  useEffect(() => { refresh(); }, []);

  const clearAll = () => {
    storage.set('myflix_watchlist', []);
    refresh();
  };

  return (
    <div>
      <div className="row-header">
        <h2 style={{ margin: 0 }}>My Watchlist</h2>
        <button className="btn btn-outline" onClick={clearAll}>Clear All</button>
      </div>
      {items.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)' }}>Your watchlist is empty.</p>
      ) : (
        <ContentGrid items={items} />
      )}
    </div>
  );
}

export default WatchlistPage;
```

Explanation: Details page with add to list and recommendation section.
````write file="myflix-streaming-platform-129621-129630/myflix_frontend/src/pages/DetailsPage.jsx"
import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import CarouselRow from '../components/CarouselRow';
import { demoCatalog, demoGames, findById, storage } from '../utils/data';

/**
 * PUBLIC_INTERFACE
 * DetailsPage shows information about a selected title and recommendations.
 */
function DetailsPage() {
  const { id } = useParams();
  const item = useMemo(() => findById(id), [id]);
  const recs = useMemo(() => demoCatalog.slice(0, 8).map(x => ({ id: x.id, title: x.title, imageUrl: x.posterUrl })), []);

  const addToList = () => {
    const list = storage.get('myflix_watchlist', []);
    const exists = list.find(x => x.id === item.id);
    const updated = exists ? list : [...list, { id: item.id, title: item.title, posterUrl: item.posterUrl || item.imageUrl }];
    storage.set('myflix_watchlist', updated);
    alert('Added to My List');
  };

  return (
    <div>
      <div className="hero-card" style={{ marginBottom: 16 }}>
        <img className="hero-image" src={item.posterUrl || item.imageUrl} alt={`${item.title} backdrop`} />
        <div className="hero-overlay">
          <h1 style={{ margin: '6px 0', fontSize: 24, fontWeight: 800 }}>{item.title}</h1>
          <div className="hero-badges">HD • 13+ • 2h 4m • Action</div>
          <div className="hero-actions">
            <Link to={`/player/${item.id}`} className="btn btn-primary">▶ Play</Link>
            <button className="btn btn-outline" onClick={addToList}>＋ My List</button>
          </div>
        </div>
      </div>

      <section className="section">
        <h3 style={{ marginTop: 0 }}>About</h3>
        <p style={{ color: 'var(--text-tertiary)' }}>
          An ex-intelligence agent is pulled back into a web of conspiracy. As truths unravel, the line
          between ally and enemy blurs in this pulse-pounding thriller.
        </p>
      </section>

      <CarouselRow title="Recommended for you" ctaLabel="Browse" items={recs} />
      <CarouselRow title="More like this" ctaLabel="Browse" items={demoGames} />
    </div>
  );
}

export default DetailsPage;
```

Explanation: Player page with HTML5 video element and related items.
````write file="myflix-streaming-platform-129621-129630/myflix_frontend/src/pages/PlayerPage.jsx"
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { findById, demoCatalog } from '../utils/data';

/**
 * PUBLIC_INTERFACE
 * PlayerPage renders the streaming player for a selected item.
 */
function PlayerPage() {
  const { id } = useParams();
  const item = useMemo(() => findById(id), [id]);

  return (
    <div className="player-wrapper">
      <div>
        <div className="video">
          {/* Placeholder video for demo; replace src with real streaming URL */}
          <video
            controls
            style={{ width: '100%', height: '100%' }}
            poster={item.posterUrl || item.imageUrl}
          >
            <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <h2 style={{ marginTop: 12 }}>{item.title}</h2>
        <p style={{ color: 'var(--text-tertiary)' }}>HD • 13+ • 2h 4m • Action</p>
      </div>

      <div>
        <h3>Up Next</h3>
        <div className="grid">
          {demoCatalog.slice(0, 6).map(next => (
            <Link key={next.id} to={`/player/${next.id}`} className="tile" title={next.title}>
              <img src={next.posterUrl} alt={`${next.title} poster`} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlayerPage;
```

Explanation: Login page implementing user authentication UI.
````write file="myflix-streaming-platform-129621-129630/myflix_frontend/src/pages/LoginPage.jsx"
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * LoginPage renders the login form and calls onLogin(email, password).
 * Props:
 * - onLogin: (email, password) => Promise<user>
 */
function LoginPage({ onLogin }) {
  const nav = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      await onLogin(email, password);
      nav('/');
    } catch (e) {
      alert(e.message || 'Login failed');
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <h2>Sign In</h2>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" type="email" required />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" className="input" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" type="password" required />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Sign In</button>
        <Link className="btn btn-outline" to="/register">Create account</Link>
      </div>
    </form>
  );
}

export default LoginPage;
```

Explanation: Registration page implementing sign-up UI.
````write file="myflix-streaming-platform-129621-129630/myflix_frontend/src/pages/RegisterPage.jsx"
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * RegisterPage renders the registration form and calls onRegister(name, email, password).
 * Props:
 * - onRegister: (name, email, password) => Promise<user>
 */
function RegisterPage({ onRegister }) {
  const nav = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
    try {
      await onRegister(name, email, password);
      nav('/');
    } catch (e) {
      alert(e.message || 'Registration failed');
    }
  }

  return (
    <form className="form" onSubmit={submit}>
      <h2>Create Account</h2>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" className="input" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" type="email" required />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" className="input" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" type="password" required />
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">Create</button>
        <Link className="btn btn-outline" to="/login">Sign in</Link>
      </div>
    </form>
  );
}

export default RegisterPage;
```

Explanation: Keep index.css minimal or repoint to new styles (we already imported new app.css in index.js). We can leave existing index.css file as is; no change needed.

Explanation: Provide README updates for the app usage and features.
````edit file="myflix-streaming-platform-129621-129630/myflix_frontend/README.md"      
<<<<<<< SEARCH
# Lightweight React Template for KAVIA

This project provides a minimal React template with a clean, modern UI and minimal dependencies.

## Features

- **Lightweight**: No heavy UI frameworks - uses only vanilla CSS and React
- **Modern UI**: Clean, responsive design with KAVIA brand styling
- **Fast**: Minimal dependencies for quick loading times
- **Simple**: Easy to understand and modify

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Customization

### Colors

The main brand colors are defined as CSS variables in `src/App.css`:

```css
:root {
  --kavia-orange: #E87A41;
  --kavia-dark: #1A1A1A;
  --text-color: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --border-color: rgba(255, 255, 255, 0.1);
}
```

### Components

This template uses pure HTML/CSS components instead of a UI framework. You can find component styles in `src/App.css`. 

Common components include:
- Buttons (`.btn`, `.btn-large`)
- Container (`.container`)
- Navigation (`.navbar`)
- Typography (`.title`, `.subtitle`, `.description`)

## Learn More

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
# MyFlix Frontend

A modern, cinematic React web app for browsing, searching, and streaming movies/TV shows. Built with React 18, React Router, and vanilla CSS. Styles and structure inspired by assets/home_screen_design_notes.md.

## Features
- User registration and login (demo, local storage)
- Browse catalog with responsive poster grid
- Search with instant filtering
- Streaming page with HTML5 video player
- Watchlist management (local storage)
- Personalized recommendations sections
- Responsive layout with top bar and sidebar
- Optional dark mode toggle

## Getting Started
- npm install
- npm start

Open http://localhost:3000

## Project Structure
- src/layout/Layout.jsx: App shell (top bar, sidebar, content)
- src/pages/*: Route pages (Home, Browse, Search, Watchlist, Details, Player, Login, Register)
- src/components/*: Reusable UI (HeroCard, CarouselRow, ContentGrid)
- src/styles/*: Design tokens and app styles
- src/utils/data.js: Demo data and watchlist storage helpers

## Notes
- Authentication and data are mocked; replace with real backend APIs.
- Video player uses a sample MP4; connect to streaming service when available.
>>>>>>> REPLACE   
