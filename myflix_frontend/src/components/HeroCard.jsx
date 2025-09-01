import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * HeroCard displays a featured title with poster background and CTA buttons.
 * Props:
 * - item: { id, title, meta, imageUrl }
 * - onAddToList: (item) => void
 */
function HeroCard({ item, onAddToList }) {
  return (
    <section className="hero">
      <div className="hero-card" role="region" aria-label={`Featured ${item.title}`}>
        <img className="hero-image" src={item.imageUrl} alt={`Featured ${item.title} poster`} />
        <div className="hero-overlay">
          <div style={{ fontSize: 10, letterSpacing: 1.5, opacity: 0.85 }}>MYFLIX ORIGINAL</div>
          <h1 style={{ margin: '6px 0 6px 0', fontSize: 24, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>
            {item.title}
          </h1>
          <div className="hero-badges">{item.meta}</div>
          <div className="hero-actions">
            <Link to={`/player/${item.id}`} className="btn btn-primary" aria-label={`Play ${item.title}`}>
              ▶ Play
            </Link>
            <button className="btn btn-outline" onClick={() => onAddToList?.(item)} aria-label="Add to My List">
              ＋ My List
            </button>
            <Link to={`/details/${item.id}`} className="btn btn-outline" aria-label={`Details for ${item.title}`}>
              ℹ Details
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroCard;
