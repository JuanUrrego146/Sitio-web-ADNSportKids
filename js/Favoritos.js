
async function cargarProductos(){
  try {
    const res = await fetch('json/productos.json');
    if (!res.ok) throw new Error('No se pudo cargar productos.json');
    return await res.json();
  } catch(err){
    console.error('Error cargando productos:', err);
    return [];
  }
}

function construirFavoritos(productos){
  const divFavoritos = document.getElementById('favoritos');
  const favs = FavoritosStorage.getFavorites();
  const favCounts = FavoritosStorage.getCounts();
  divFavoritos.innerHTML = '';
  const Titulo = document.createElement('h1');
  Titulo.classList.add('titulo');
  Titulo.textContent = 'FAVORITOS';
  divFavoritos.appendChild(Titulo);
  const favoritos = productos.filter(p => favs.has(p.Nombre));

  if (favoritos.length === 0) {
    const vacio = document.createElement('p');
    vacio.textContent = 'Aún no tienes productos en favoritos 😿';
    vacio.style.padding = '12px';
    divFavoritos.appendChild(vacio);
    return;
  }



  favoritos.forEach(p => {
    const card = document.createElement('div');
    card.className = 'producto';

    const imgWrap = document.createElement('div');
    imgWrap.className = 'imagen-producto';
    const img = document.createElement('img');
    img.src = p.imagen;
    img.alt = p.Nombre;
    imgWrap.appendChild(img);

    const info = document.createElement('div');
    info.className = 'descripcion-producto';
    const nombre = document.createElement('p');
    nombre.className = 'descripcion-producto-texto';
    nombre.textContent = p.Nombre;
    const precio = document.createElement('p');
    precio.className = 'descripcion-producto-texto';
    precio.textContent = p.precio;
    const metric = document.createElement('p');
    metric.className = 'descripcion-producto-texto';
    metric.style.fontWeight = '600';
    metric.textContent = `Guardado ${favCounts[p.Nombre] || 1} vez${(favCounts[p.Nombre] || 1) === 1 ? '' : 'es'}`;
    info.append(nombre, precio, metric);

    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'descripcion-eliminar';
    btnEliminar.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle class="bg-circle" cx="12" cy="12" r="10" />
        <path class="x-icon" d="M8 8l8 8M16 8l-8 8" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;

    btnEliminar.addEventListener('click', () => {
      FavoritosStorage.recordRemove(p.Nombre, favs, favCounts);

      btnEliminar.classList.add('selected');
      setTimeout(() => {
        card.remove();
        if (!divFavoritos.querySelector('.producto')) {
          const vacio = document.createElement('p');
          vacio.textContent = 'Aún no tienes productos en favoritos 😿';
          vacio.style.padding = '12px';
          divFavoritos.appendChild(vacio);
        }
      }, 250);
    });

    card.append(imgWrap, info, btnEliminar);
    divFavoritos.appendChild(card);
  });
}

cargarProductos().then(construirFavoritos);
