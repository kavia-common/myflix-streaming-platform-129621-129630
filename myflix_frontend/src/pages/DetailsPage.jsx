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
