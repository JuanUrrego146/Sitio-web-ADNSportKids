const productosGuardados = JSON.parse(localStorage.getItem("productos"));
const productos = productosGuardados || [
  {Categoria:"Hombre", Sub_Categoria:"Uniformes",Nombre:"Uniforme inter de Miami",imagen:"Imagenes/Uni_Inter_Miami_Frontal.png",precio:"$85.000",color:"No",tallaje:"Ropa",pernumero:"si", imagen2:"Imagenes/Uni_Inter_Miami_Espalda.avif",Fav:"No"},
  {Categoria:"Hombre", Sub_Categoria:"Uniformes",Nombre:"Uniforme Real Madrid",imagen:"Imagenes/Uni_Real_Madrid.png",precio:"$85.000",color:"No",tallaje:"Ropa",pernumero:"si", imagen2:"Imagenes/Uni_Real_Madrid_Espalda.avif",Fav:"No"},
  {Categoria:"Hombre", Sub_Categoria:"Uniformes",Nombre:"Uniforme Colombia",imagen:"Imagenes/camisa-front.avif",precio:"$80.000",color:"No",tallaje:"Ropa",pernumero:"si", imagen2:"Imagenes/camisa-back.png",Fav:"No"},
  {Categoria:"Mujer", Sub_Categoria:"Bolsos",Nombre:"Mochila deportiva Gris Nike",imagen:"Imagenes/Mochila_Gris_Nike.png",precio:"$85.000",color:"No",tallaje:"No",pernumero:"No",Fav:"No"},
  {Categoria:"Mujer", Sub_Categoria:"Bolsos",Nombre:"Nike Morral Gym Amarillo",imagen:"Imagenes/Morral_Gym_Amarillo.png",precio:"$85.000",color:"No",tallaje:"No",pernumero:"No",Fav:"No"},
  {Categoria:"Hombre", Sub_Categoria:"Bolsos",Nombre:"Maleta deportiva adidas",imagen:"Imagenes/Maleta_Deportiva_Adidas.png",precio:"$85.000",color:"No",tallaje:"No",pernumero:"No",Fav:"No"},
  {Categoria:"Hombre", Sub_Categoria:"Zapatillas",Nombre:"Torretines Golty Verde",imagen:"Imagenes/Torretines_Golty_Verde.png",precio:"$210.000",color:"No",tallaje:"Calzado",pernumero:"No",Fav:"No"},
  {Categoria:"Mujer", Sub_Categoria:"Zapatillas",Nombre:"Tennis de Running Adistar",imagen:"Imagenes/Tenis_Running_Adistar.png",precio:"$175.000",color:"No",tallaje:"Calzado",pernumero:"No",Fav:"No"},
  {Categoria:"Hombre", Sub_Categoria:"Zapatillas",Nombre:"Torretines Golty Menta",imagen:"Imagenes/Torretines_Golty_Menta.png",precio:"$125.000",color:"No",tallaje:"Calzado",pernumero:"No",Fav:"No"},
  {Categoria:"N/A", Sub_Categoria:"Accesorios",Nombre:"Canillera de Futbol Royal",imagen:"Imagenes/Canillera_Futbol_Royal.png",precio:"$85.000",color:"Si",tallaje:"No",pernumero:"No",Fav:"No"},
  {Categoria:"N/A", Sub_Categoria:"Accesorios",Nombre:"Colchoneta para Yoga",imagen:"Imagenes/Colchoneta_Yoga.png",precio:"$45.000",color:"Si",tallaje:"No",pernumero:"No",Fav:"No"},
  {Categoria:"N/A", Sub_Categoria:"Accesorios",Nombre:"Banda Elastica para Terapia",imagen:"Imagenes/Banda_Elastica.png",precio:"$28.000",color:"Si",tallaje:"No",pernumero:"No",Fav:"No"},
  {Categoria:"N/A", Sub_Categoria:"Balones",Nombre:"Balon Sarlancer Club Adidas",imagen:"Imagenes/Balon_Starlancer_Adidas.png",precio:"$105.000",color:"No",tallaje:"No",pernumero:"No",Fav:"No"},
  {Categoria:"N/A", Sub_Categoria:"Balones",Nombre:"Pelota Tennis Wilson",imagen:"Imagenes/Pelota_Tennis_Wilson.png",precio:"$15.000",color:"No",tallaje:"No",pernumero:"No",Fav:"No"},
  {Categoria:"N/A", Sub_Categoria:"Balones",Nombre:"Balon de Voleiboyl by Golty",imagen:"Imagenes/Balon_Voleibol_Golty.png",precio:"$85.000",color:"No",tallaje:"No",pernumero:"No",Fav:"No"},
];


const catalogo = document.getElementById("catalogo");


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
    

    const Favoritos=document.createElement("button");
    Favoritos.classList.add("boton-favoritos");
    
    if(p.Fav=="Si"){
          Favoritos.classList.add("activo");
    }
    Favoritos.innerHTML='<i class="fa-solid fa-heart"></i>';
    Favoritos.addEventListener("click", () => {
     event.stopPropagation(); 
     event.preventDefault(); 
        if(p.Fav=="No"){

            Favoritos.classList.add("activo"); 
            p.Fav="Si";
        }
        else{
            Favoritos.classList.remove("activo"); 
            p.Fav="No";  
        }
          localStorage.setItem("productos", JSON.stringify(productos));
    });

    const divInfo = document.createElement("div");
    divInfo.classList.add("producto-info");
    const nombre = document.createElement("h3");
    nombre.classList.add("producto-nombre");
    nombre.textContent = p.Nombre;
    const precio = document.createElement("p");
    precio.classList.add("producto-precio");
    precio.textContent = p.precio;

    divInfo.append(nombre, precio);
    link.append(divImagen, divInfo,Favoritos);
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
    const terms = norm(params.q).split(/\s+/).filter(Boolean); // todas las palabras (AND)
    items = items.filter(p => {
      const haystack = norm([p.Nombre, p.Categoria, p.Sub_Categoria].join(' '));
      return terms.every(t => haystack.includes(t));
    });
  }

  render(items);
}

// Eventos
window.addEventListener('hashchange', aplicarFiltro);
aplicarFiltro();

