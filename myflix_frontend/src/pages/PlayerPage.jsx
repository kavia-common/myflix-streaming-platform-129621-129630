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
