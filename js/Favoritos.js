

const productos = [
  {Categoria:"Hombre", Sub_Categoria:"Uniformes",Nombre:"Uniforme inter de Miami",imagen:"Imagenes/Uni_Inter_Miami_Frontal.png",precio:"$85.0000",color:"No",tallaje:"Ropa",pernumero:"si", imagen2:"Imagenes/Uni_Inter_Miami_Espalda.avif"},
  {Categoria:"Hombre", Sub_Categoria:"Uniformes",Nombre:"Uniforme Real Madrid",imagen:"Imagenes/Uni_Real_Madrid.png",precio:"$85.0000",color:"No",tallaje:"Ropa",pernumero:"si", imagen2:"Imagenes/Uni_Real_Madrid_Espalda.avif"},
  {Categoria:"Hombre", Sub_Categoria:"Uniformes",Nombre:"Uniforme Colombia",imagen:"Imagenes/camisa-front.avif",precio:"$80.0000",color:"No",tallaje:"Ropa",pernumero:"si", imagen2:"Imagenes/camisa-back.png"},
  {Categoria:"Mujer", Sub_Categoria:"Bolsos",Nombre:"Mochila deportiva Gris Nike",imagen:"Imagenes/Mochila_Gris_Nike.png",precio:"$85.0000",color:"No",tallaje:"No",pernumero:"No"},
  {Categoria:"Mujer", Sub_Categoria:"Bolsos",Nombre:"Nike Morral Gym Amarillo",imagen:"Imagenes/Morral_Gym_Amarillo.png",precio:"$85.0000",color:"No",tallaje:"No",pernumero:"No"},
  {Categoria:"Hombre", Sub_Categoria:"Bolsos",Nombre:"Maleta deportiva adidas",imagen:"Imagenes/Maleta_Deportiva_Adidas.png",precio:"$85.0000",color:"No",tallaje:"No",pernumero:"No"},
  {Categoria:"Hombre", Sub_Categoria:"Zapatillas",Nombre:"Torretines Golty Verde",imagen:"Imagenes/Torretines_Golty_Verde.png",precio:"$210.000",color:"No",tallaje:"Calzado",pernumero:"No"},
  {Categoria:"Mujer", Sub_Categoria:"Zapatillas",Nombre:"Tennis de Running Adistar",imagen:"Imagenes/Tenis_Running_Adistar.png",precio:"$175.000",color:"No",tallaje:"Calzado",pernumero:"No"},
  {Categoria:"Hombre", Sub_Categoria:"Zapatillas",Nombre:"Torretines Golty Menta",imagen:"Imagenes/Torretines_Golty_Menta.png",precio:"$125.000",color:"No",tallaje:"Calzado",pernumero:"No"},
  {Categoria:"N/A", Sub_Categoria:"Accesorios",Nombre:"Canillera de Futbol Royal",imagen:"Imagenes/Canillera_Futbol_Royal.png",precio:"$85.000",color:"Si",tallaje:"No",pernumero:"No"},
  {Categoria:"N/A", Sub_Categoria:"Accesorios",Nombre:"Colchoneta para Yoga",imagen:"Imagenes/Colchoneta_Yoga.png",precio:"$45.000",color:"Si",tallaje:"No",pernumero:"No"},
  {Categoria:"N/A", Sub_Categoria:"Accesorios",Nombre:"Banda Elastica para Terapia",imagen:"Imagenes/Banda_Elastica.png",precio:"$28.000",color:"Si",tallaje:"No",pernumero:"No"},
  {Categoria:"N/A", Sub_Categoria:"Balones",Nombre:"Balon Sarlancer Club Adidas",imagen:"Imagenes/Balon_Starlancer_Adidas.png",precio:"$105.000",color:"No",tallaje:"No",pernumero:"No"},
  {Categoria:"N/A", Sub_Categoria:"Balones",Nombre:"Pelota Tennis Wilson",imagen:"Imagenes/Pelota_Tennis_Wilson.png",precio:"$15.000",color:"No",tallaje:"No",pernumero:"No"},
  {Categoria:"N/A", Sub_Categoria:"Balones",Nombre:"Balon de Voleiboyl by Golty",imagen:"Imagenes/Balon_Voleibol_Golty.png",precio:"$85.000",color:"No",tallaje:"No",pernumero:"No"},
];

const FAV_KEY = 'adn:favs';

(function migrateLegacy(){
  try {
    const legacy = JSON.parse(localStorage.getItem('productos') || 'null');
    if (legacy && Array.isArray(legacy)) {
      const migrated = legacy.filter(p => p.Fav === 'Si').map(p => p.Nombre);
      localStorage.setItem(FAV_KEY, JSON.stringify(migrated));
      localStorage.removeItem('productos');
    }
  } catch(e) {}
})();

const favNames = JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); 
const favSet   = new Set(favNames);

const favoritos = productos.filter(p => favSet.has(p.Nombre));

const divFavoritos = document.getElementById('favoritos');
divFavoritos.innerHTML = '';

const Titulo = document.createElement('h1');
Titulo.classList.add('titulo');
Titulo.textContent = 'FAVORITOS';
divFavoritos.appendChild(Titulo);

if (favoritos.length === 0) {
  const vacio = document.createElement('p');
  vacio.textContent = 'Aún no tienes productos en favoritos 😿';
  vacio.style.padding = '12px';
  divFavoritos.appendChild(vacio);
} else {
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
    info.append(nombre, precio);

    const btnEliminar = document.createElement('button');
    btnEliminar.className = 'descripcion-eliminar';
    btnEliminar.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <circle class="bg-circle" cx="12" cy="12" r="10" />
        <path class="x-icon" d="M8 8l8 8M16 8l-8 8" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;

    btnEliminar.addEventListener('click', () => {
      favSet.delete(p.Nombre);
      localStorage.setItem(FAV_KEY, JSON.stringify([...favSet]));

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
