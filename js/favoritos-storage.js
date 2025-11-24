(function(){
  const FAV_KEY = 'adn:favs';
  const COUNT_KEY = 'adn:favCounts';

  function safeParse(key, fallback){
    try {
      const value = JSON.parse(localStorage.getItem(key));
      return value ?? fallback;
    } catch(e){
      return fallback;
    }
  }

  function migrateLegacy(){
    try {
      const legacy = JSON.parse(localStorage.getItem('productos'));
      if (legacy && Array.isArray(legacy)){
        const migrated = legacy.filter(p => p.Fav === 'Si').map(p => p.Nombre);
        if (migrated.length) localStorage.setItem(FAV_KEY, JSON.stringify(migrated));
        localStorage.removeItem('productos');
      }
    } catch(e){
      /* ignore */
    }
  }
  migrateLegacy();

  function normalizeCounts(map){
    const cleaned = {};
    for (const [k,v] of Object.entries(map || {})){
      const num = Number(v);
      if (!Number.isNaN(num) && num > 0) cleaned[k] = num;
    }
    return cleaned;
  }

  function getFavorites(){
    return new Set(safeParse(FAV_KEY, []));
  }

  function saveFavorites(set){
    localStorage.setItem(FAV_KEY, JSON.stringify([...set]));
  }

  function getCounts(){
    return normalizeCounts(safeParse(COUNT_KEY, {}));
  }

  function saveCounts(map){
    localStorage.setItem(COUNT_KEY, JSON.stringify(normalizeCounts(map)));
  }

  function recordAdd(name, favs, counts){
    if (favs.has(name)) return;
    favs.add(name);
    counts[name] = (counts[name] || 0) + 1;
    saveFavorites(favs);
    saveCounts(counts);
  }

  function recordRemove(name, favs, counts){
    if (!favs.delete(name)) return;
    if (counts[name]){
      counts[name] = Math.max(0, counts[name] - 1);
      if (counts[name] === 0) delete counts[name];
    }
    saveFavorites(favs);
    saveCounts(counts);
  }

  window.FavoritosStorage = {
    FAV_KEY,
    COUNT_KEY,
    getFavorites,
    saveFavorites,
    getCounts,
    saveCounts,
    recordAdd,
    recordRemove,
  };
})();