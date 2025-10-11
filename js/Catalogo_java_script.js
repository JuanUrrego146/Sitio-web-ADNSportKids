const productos=[
    {Categoria:"Hombre", Sub_Categoria:"Uniformes",Nombre:"Uniforme inter de Miami",imagen:"Imagenes/Uni_Inter_Miami_Frontal.png",precio:"$85.0000"},
    {Categoria:"Hombre", Sub_Categoria:"Uniformes",Nombre:"Uniforme Real Madrid",imagen:"Imagenes/Uni_Real_Madrid.png",precio:"$85.0000"},
    {Categoria:"Hombre", Sub_Categoria:"Uniformes",Nombre:"Uniforme Colombia",imagen:"Imagenes/camisa-front.avif",precio:"$80.0000"},
    {Categoria:"Mujer", Sub_Categoria:"Bolsos",Nombre:"Mochila deportiva Gris Nike",imagen:"Imagenes/Mochila_Gris_Nike.png",precio:"$85.0000"},
    {Categoria:"Mujer", Sub_Categoria:"Bolsos",Nombre:"Nike Morral Gym Amarillo",imagen:"Imagenes/Morral_Gym_Amarillo.png",precio:"$85.0000"},
    {Categoria:"Hombre", Sub_Categoria:"Bolsos",Nombre:"Maleta deportiva adidas",imagen:"Imagenes/Maleta_Deportiva_Adidas.png",precio:"$85.0000"},
    {Categoria:"Hombre", Sub_Categoria:"Zapatillas",Nombre:"Torretines Golty Verde",imagen:"Imagenes/Torretines_Golty_Verde.png",precio:"$210.000"},
    {Categoria:"Mujer", Sub_Categoria:"Zapatillas",Nombre:"Tennis de Running Adistar",imagen:"Imagenes/Tenis_Running_Adistar.png",precio:"$175.000"},
    {Categoria:"Hombre", Sub_Categoria:"Zapatillas",Nombre:"Torretines Golty Menta",imagen:"Imagenes/Torretines_Golty_Menta.png",precio:"$125.000"},
    {Categoria:"N/A", Sub_Categoria:"Accesorios",Nombre:"Canillera de Futbol Royal",imagen:"Imagenes/Canillera_Futbol_Royal.png",precio:"$85.000"},
    {Categoria:"N/A", Sub_Categoria:"Accesorios",Nombre:"Colchoneta para Yoga",imagen:"Imagenes/Colchoneta_Yoga.png",precio:"$45.000"},
    {Categoria:"N/A", Sub_Categoria:"Accesorios",Nombre:"Banda Elastica para Terapia",imagen:"Imagenes/Banda_Elastica.png",precio:"$28.000"},
    {Categoria:"N/A", Sub_Categoria:"Balones",Nombre:"Balon Sarlancer Club Adidas",imagen:"Imagenes/Balon_Starlancer_Adidas.png",precio:"$105.000"},
    {Categoria:"N/A", Sub_Categoria:"Balones",Nombre:"Pelota Tennis Wilson",imagen:"Imagenes/Pelota_Tennis_Wilson.png",precio:"$15.000"},
    {Categoria:"N/A", Sub_Categoria:"Balones",Nombre:"Balon de Voleiboyl by Golty",imagen:"Imagenes/Balon_Voleibol_Golty.png",precio:"$85.000"},
]
const catalogo = document.getElementById("catalogo");


function mostrarCatalogo(categoriaSeleccionada = null){
    catalogo.innerHTML =""; //Limpia el html

    

    productos.forEach(p=> {

        const divProducto = document.createElement("div");
        divProducto.classList.add("Producto");

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
        divProducto.append(divImagen,divInfo);
        catalogo.appendChild(divProducto);

    });


}

mostrarCatalogo();


