const productos=[
    {Categoria:"Hombre", Sub_Categoria:"Uniformes",Nombre:"Uniforme inter de Miami",imagen:"Imagenes/Uni_Inter_Miami_Frontal.png",precio:"$85.0000",color:"No",tallaje:"Ropa",pernumero:"si"},
    {Categoria:"Hombre", Sub_Categoria:"Uniformes",Nombre:"Uniforme Real Madrid",imagen:"Imagenes/Uni_Real_Madrid.png",precio:"$85.0000",color:"No",tallaje:"Ropa",pernumero:"si"},
    {Categoria:"Hombre", Sub_Categoria:"Uniformes",Nombre:"Uniforme Colombia",imagen:"Imagenes/camisa-front.avif",precio:"$80.0000",color:"No",tallaje:"Ropa",pernumero:"si"},
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
]
const catalogo = document.getElementById("catalogo");


function mostrarCatalogo(categoriaSeleccionada = null){
    catalogo.innerHTML =""; //Limpia el html

    const productosFiltrados= categoriaSeleccionada && categoriaSeleccionada!== "Todos" ? productos.filter(p => p.categoria == categoriaSeleccionada):productos;

    productosFiltrados.forEach(p=> {

       const link = document.createElement("a");
       link.href = `personalizacion.html?nombre=${encodeURIComponent(p.Nombre)}&precio=${encodeURIComponent(p.precio)}&imagen=${encodeURIComponent(p.imagen)}&color=${encodeURIComponent(p.color)}&tallaje=${encodeURIComponent(p.tallaje)}&pernumero=${encodeURIComponent(p.pernumero)}&subcategoria=${encodeURIComponent(p.Sub_Categoria)}`;
       link.classList.add("Producto");
       link.style.textDecoration = "none";

        const divImagen=document.createElement("div");
        divImagen.classList.add("producto-imagen");

        const img=document.createElement("img");
        img.src=p.imagen;
        img.alt=p.Nombre;
        divImagen.appendChild(img);

        const divInfo =document.createElement("div");
        divInfo.classList.add("producto-info");

        const nombre = document.createElement("h3");
        nombre.classList.add("producto-nombre");
        nombre.textContent = p.Nombre;

        const precio = document.createElement("p");
        precio.classList.add("producto-precio");
        precio.textContent = p.precio;

        divInfo.append(nombre,precio);
        link.append(divImagen,divInfo);
        catalogo.appendChild(link);

    });


}

mostrarCatalogo();


