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
