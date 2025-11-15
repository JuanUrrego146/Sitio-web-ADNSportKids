let productos = [];  // ⬅️ Aquí se cargará el JSON dinámicamente

fetch("json/productos.json")
  .then(res => res.json())
  .then(data => {
    productos = data;
    iniciarCatalogo();   // ⬅️ Cuando termina de cargar, inicia todo
  })
  .catch(err => console.error("Error cargando productos.json:", err));


// 🔥 Tu lógica queda igual, solo se envuelve en una función
function iniciarCatalogo(){

  const catalogo = document.getElementById("catalogo");

  const FAV_KEY = 'adn:favs';
  const getFavs = () => {
    try { return new Set(JSON.parse(localStorage.getItem(FAV_KEY) || '[]')); }
    catch { return new Set(); }
  };
  const saveFavs = (set) => localStorage.setItem(FAV_KEY, JSON.stringify([...set]));
  let favs = getFavs();

  const norm = (s='') => s.toString().toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu,'');

  function readHashParams(){
    const raw = (location.hash || '').replace(/^#/, '');
    const parts = raw ? raw.split('&') : [];
    const out = {};
    const setSub = (k) => out.sub = k[0].toUpperCase()+k.slice(1);

    for (const p of parts){
      if (!p) continue;
      if (p === 'hombre') out.categoria = 'Hombre';
      else if (p === 'mujer') out.categoria = 'Mujer';
      else if (['accesorios','balones','uniformes','zapatillas','bolsos'].includes(p)) setSub(p);
      else if (p.startsWith('q=')) out.q = decodeURIComponent(p.slice(2));
    }
    if (!parts.length && raw){
      if (raw === 'hombre') out.categoria = 'Hombre';
      else if (raw === 'mujer') out.categoria = 'Mujer';
      else if (['accesorios','balones','uniformes','zapatillas','bolsos'].includes(raw)) setSub(raw);
      else if (raw.startsWith('q=')) out.q = decodeURIComponent(raw.slice(2));
    }
    return out;
  }


  function render(items){
    catalogo.innerHTML = "";
    if (!items.length){
      catalogo.innerHTML = `<p style="padding:16px;">Sin resultados 👀</p>`;
      return;
    }

    items.forEach(p => {
      const link = document.createElement("a");
      const pid = p.Nombre;

      if (p.Sub_Categoria === "Uniformes") {
        const img2 = p.imagen2 || "Imagenes/camisa-back.png";
        link.href = `personalizacion_camisa.html?nombre=${encodeURIComponent(p.Nombre)}&precio=${encodeURIComponent(p.precio)}&imagen=${encodeURIComponent(p.imagen)}&imagen2=${encodeURIComponent(img2)}&subcategoria=${encodeURIComponent(p.Sub_Categoria)}`;
      } else {
        link.href = `personalizacion.html?nombre=${encodeURIComponent(p.Nombre)}&precio=${encodeURIComponent(p.precio)}&imagen=${encodeURIComponent(p.imagen)}&color=${encodeURIComponent(p.color)}&tallaje=${encodeURIComponent(p.tallaje)}&pernumero=${encodeURIComponent(p.pernumero)}&subcategoria=${encodeURIComponent(p.Sub_Categoria)}`;
      }

      link.classList.add("Producto");
      link.style.textDecoration = "none";

      const divImagen = document.createElement("div");
      divImagen.classList.add("producto-imagen");
      const img = document.createElement("img");
      img.src = p.imagen;
      img.alt = p.Nombre;
      divImagen.appendChild(img);

      const favBtn = document.createElement('button');
      favBtn.className = 'boton-favoritos';
      favBtn.setAttribute('aria-label','Añadir a favoritos');
      favBtn.innerHTML = `
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 21c-.3 0-7-4.9-9.2-8C1.5 11 1.9 8 4.3 6.7c1.8-1 4-.6 5.5.8L12 9.6l2.2-2.1c1.5-1.4 3.7-1.8 5.5-.8 2.4 1.3 2.8 4.3.5 6.3C19 16.1 12.3 21 12 21z"/>
        </svg>
      `;
      if (favs.has(pid)) favBtn.classList.add('activo');

      favBtn.addEventListener('click', (ev) => {
        ev.preventDefault();
        ev.stopPropagation();
        if (favs.has(pid)) { favs.delete(pid); favBtn.classList.remove('activo'); }
        else { favs.add(pid); favBtn.classList.add('activo'); }
        saveFavs(favs);
      });

      divImagen.appendChild(favBtn);

      const divInfo = document.createElement("div");
      divInfo.classList.add("producto-info");
      const nombre = document.createElement("h3");
      nombre.classList.add("producto-nombre");
      nombre.textContent = p.Nombre;
      const precio = document.createElement("p");
      precio.classList.add("producto-precio");
      precio.textContent = p.precio;
      divInfo.append(nombre, precio);

      link.append(divImagen, divInfo);
      catalogo.appendChild(link);
    });
  }


  function aplicarFiltro(){
    const params = readHashParams();
    let items = productos.slice();

    if (params.categoria){
      items = items.filter(p => p.Categoria === params.categoria);
    }
    if (params.sub){
      items = items.filter(p => p.Sub_Categoria === params.sub);
    }
    if (params.q && params.q.trim()){
      const terms = norm(params.q).split(/\s+/).filter(Boolean);
      items = items.filter(p => {
        const haystack = norm([p.Nombre, p.Categoria, p.Sub_Categoria].join(' '));
        return terms.every(t => haystack.includes(t));
      });
    }

    render(items);
  }

  window.addEventListener('hashchange', aplicarFiltro);
  aplicarFiltro();
}
