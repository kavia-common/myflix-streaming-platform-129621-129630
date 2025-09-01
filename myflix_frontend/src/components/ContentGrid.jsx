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
