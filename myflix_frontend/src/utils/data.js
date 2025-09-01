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
