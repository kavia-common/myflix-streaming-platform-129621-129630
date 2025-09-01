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
