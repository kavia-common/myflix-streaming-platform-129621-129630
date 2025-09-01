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
        <Link
          to="/watchlist"
          style={{ color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600 }}
        >
          {ctaLabel} ›
        </Link>
      </div>
      <div className="carousel" role="list">
        {items.map((item) => (
          <Link
            to={`/details/${item.id}`}
            key={item.id}
            className="card"
            role="listitem"
            aria-label={item.title}
            title={item.title}
          >
            <img src={item.imageUrl} alt={`${title} cover: ${item.title}`} />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CarouselRow;
