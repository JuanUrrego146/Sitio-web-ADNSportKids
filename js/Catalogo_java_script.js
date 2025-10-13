// === DATA ===
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

// === DOM ===
const catalogo = document.getElementById("catalogo");

// Render del grid
function render(items){
  catalogo.innerHTML = "";
  if (!items.length){
    catalogo.innerHTML = `<p style="padding:16px;">Sin resultados 👀</p>`;
    return;
  }

  items.forEach(p => {
    const link = document.createElement("a");

    // 🔸 Si es UNIFORME => va a personalizacion_camisa.html (con imagen2 opcional)
    if (p.Sub_Categoria === "Uniformes") {
      const img2 = p.imagen2 || "Imagenes/camisa-back.png"; // fallback si no viene
      link.href = `personalizacion_camisa.html?nombre=${encodeURIComponent(p.Nombre)}&precio=${encodeURIComponent(p.precio)}&imagen=${encodeURIComponent(p.imagen)}&imagen2=${encodeURIComponent(img2)}&subcategoria=${encodeURIComponent(p.Sub_Categoria)}`;
    } else {
      // 🔸 resto de productos => flujo normal
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

// Hash -> filtro
function parseHash(){
  const h = (location.hash || "").replace("#","").trim().toLowerCase();
  if (!h) return null;

  if (h === "hombre") return { tipo:"categoria", valor:"Hombre" };
  if (h === "mujer")  return { tipo:"categoria", valor:"Mujer" };

  const mapaSub = {
    accesorios: "Accesorios",
    balones: "Balones",
    uniformes: "Uniformes",
    zapatillas: "Zapatillas",
    bolsos: "Bolsos"
  };
  if (mapaSub[h]) return { tipo:"sub", valor: mapaSub[h] };
  return null;
}

// Aplica filtro del hash (o muestra todo)
function aplicarFiltro(){
  const f = parseHash();
  let items = productos;
  if (f){
    items = f.tipo === "categoria"
      ? productos.filter(p => p.Categoria === f.valor)
      : productos.filter(p => p.Sub_Categoria === f.valor);
  }
  render(items);
}

window.addEventListener('hashchange', aplicarFiltro);
aplicarFiltro();



