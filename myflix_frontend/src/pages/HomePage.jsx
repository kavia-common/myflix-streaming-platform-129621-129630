import React, { useState } from 'react';
import HeroCard from '../components/HeroCard';
import CarouselRow from '../components/CarouselRow';
import { demoFeatured, demoGames, storage } from '../utils/data';

/**
 * PUBLIC_INTERFACE
 * HomePage shows the personalized feed: chips, hero featured, and carousels.
 */
function HomePage() {
  const [chips] = useState(['TV Shows', 'Movies', 'Categories ▾']);

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
