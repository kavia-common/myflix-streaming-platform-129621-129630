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
