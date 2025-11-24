async function cargarTopFavoritos(){
  const contenedor = document.getElementById('top-fav-list');
  contenedor.innerHTML = '<p>Cargando top...</p>';

  try {
    const res = await fetch('json/productos.json');
    if (!res.ok) throw new Error('No se pudo cargar productos.json');
    const productos = await res.json();

    const counts = FavoritosStorage.getCounts();
    const ranking = productos
      .map(p => ({ ...p, totalFavs: counts[p.Nombre] || 0 }))
      .filter(p => p.totalFavs > 0)
      .sort((a,b) => b.totalFavs - a.totalFavs || a.Nombre.localeCompare(b.Nombre))
      .slice(0, 12);

    contenedor.innerHTML = '';

    if (!ranking.length){
      const empty = document.createElement('div');
      empty.className = 'top-card__empty';
      empty.textContent = 'Todavía no hay suficientes datos. ¡Agrega productos a favoritos para ver el top!';
      contenedor.appendChild(empty);
      return;
    }

    ranking.forEach((p, idx) => {
      const card = document.createElement('article');
      card.className = 'top-card';

      const figure = document.createElement('div');
      figure.className = 'top-card__figure';
      const badge = document.createElement('span');
      badge.className = 'top-card__badge';
      badge.textContent = `#${idx + 1}`;
      const img = document.createElement('img');
      img.src = p.imagen;
      img.alt = p.Nombre;
      figure.append(badge, img);

      const body = document.createElement('div');
      body.className = 'top-card__body';
      const nombre = document.createElement('h3');
      nombre.textContent = p.Nombre;
      const precio = document.createElement('p');
      precio.textContent = p.precio;

      const score = document.createElement('div');
      score.className = 'top-card__score';
      score.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21c-.2 0-6.1-4.3-8.5-7.2C1.9 11.9 2.2 9 4.5 7.8c1.6-.9 3.6-.6 4.9.6L12 10.9l2.6-2.5c1.3-1.2 3.3-1.5 5-.6 2.3 1.2 2.6 4.1.5 6-2.4 2.9-8.3 7.2-8.5 7.2z"/></svg>
        <span>${p.totalFavs} voto${p.totalFavs === 1 ? '' : 's'}</span>
      `;

      body.append(nombre, precio, score);
      card.append(figure, body);
      contenedor.appendChild(card);
    });
  } catch(err){
    contenedor.innerHTML = '<p>No se pudo cargar el top de favoritos.</p>';
    console.error(err);
  }
}

document.addEventListener('DOMContentLoaded', cargarTopFavoritos);