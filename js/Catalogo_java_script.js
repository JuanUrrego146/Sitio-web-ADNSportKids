const productosGuardados = JSON.parse(localStorage.getItem("productos"));
const productos=productosGuardados || [
    {Categoria:"Hombre", Sub_Categoria:"UNIFORMES",Nombre:"UNIFORME DEL INTER DE MIAMI",imagen:"Imagenes/Uni_Inter_Miami_Frontal.png",precio:"$85.0000",color:"No",tallaje:"Ropa",pernumero:"si",Fav:"No"},
    {Categoria:"Hombre", Sub_Categoria:"UNIFORMES",Nombre:"UNIFORME REAL MADRID",imagen:"Imagenes/Uni_Real_Madrid.png",precio:"$85.0000",color:"No",tallaje:"Ropa",pernumero:"si",Fav:"No"},
    {Categoria:"Hombre", Sub_Categoria:"UNIFORMES",Nombre:"UNIFORME COLOMBIA",imagen:"Imagenes/camisa-front.avif",precio:"$80.0000",color:"No",tallaje:"Ropa",pernumero:"si",Fav:"No"},
    {Categoria:"Mujer", Sub_Categoria:"BOLSOS",Nombre:"MOCHILA DEPORTIVA GRIS NIKE",imagen:"Imagenes/Mochila_Gris_Nike.png",precio:"$85.0000",color:"No",tallaje:"No",pernumero:"No",Fav:"No"},
    {Categoria:"Mujer", Sub_Categoria:"BOLSOS",Nombre:"NIKE MORRAL GYM AMARILLO",imagen:"Imagenes/Morral_Gym_Amarillo.png",precio:"$85.0000",color:"No",tallaje:"No",pernumero:"No",Fav:"No"},
    {Categoria:"Hombre", Sub_Categoria:"BOLSOS",Nombre:"MALETA DEPORTIVA ADIDAS",imagen:"Imagenes/Maleta_Deportiva_Adidas.png",precio:"$85.0000",color:"No",tallaje:"No",pernumero:"No",Fav:"No"},
    {Categoria:"Hombre", Sub_Categoria:"ZAPATILLAS",Nombre:"TORRETINES GOLTY VERDE",imagen:"Imagenes/Torretines_Golty_Verde.png",precio:"$210.000",color:"No",tallaje:"Calzado",pernumero:"No",Fav:"No"},
    {Categoria:"Mujer", Sub_Categoria:"ZAPATILLAS",Nombre:"TENNIS DE RUNING ADISTAR",imagen:"Imagenes/Tenis_Running_Adistar.png",precio:"$175.000",color:"No",tallaje:"Calzado",pernumero:"No",Fav:"No"},
    {Categoria:"Hombre", Sub_Categoria:"ZAPATILLAS",Nombre:"TORRETINES GOLTY MENTA",imagen:"Imagenes/Torretines_Golty_Menta.png",precio:"$125.000",color:"No",tallaje:"Calzado",pernumero:"No",Fav:"No"},
    {Categoria:"Todos", Sub_Categoria:"ACCESORIOS",Nombre:"CANILLERA DE FUTBOL ROYAL",imagen:"Imagenes/Canillera_Futbol_Royal.png",precio:"$85.000",color:"Si",tallaje:"No",pernumero:"No",Fav:"No"},
    {Categoria:"Todos", Sub_Categoria:"ACCESORIOS",Nombre:"COLCHONETA PARA YOGA",imagen:"Imagenes/Colchoneta_Yoga.png",precio:"$45.000",color:"Si",tallaje:"No",pernumero:"No",Fav:"No"},
    {Categoria:"Todos", Sub_Categoria:"ACCESORIOS",Nombre:"BANDA ELASTICA PARA TERAPIA",imagen:"Imagenes/Banda_Elastica.png",precio:"$28.000",color:"Si",tallaje:"No",pernumero:"No",Fav:"No"},
    {Categoria:"Todos", Sub_Categoria:"BALONES",Nombre:"BALON SARLANCER CLUB ADIDAS",imagen:"Imagenes/Balon_Starlancer_Adidas.png",precio:"$105.000",color:"No",tallaje:"No",pernumero:"No",Fav:"No"},
    {Categoria:"Todos", Sub_Categoria:"BALONES",Nombre:"PELOTA TENNIS WILSON",imagen:"Imagenes/Pelota_Tennis_Wilson.png",precio:"$15.000",color:"No",tallaje:"No",pernumero:"No",Fav:"No"},
    {Categoria:"Todos", Sub_Categoria:"BALONES",Nombre:"BALON DE VOLEIBOL BY GOLTY",imagen:"Imagenes/Balon_Voleibol_Golty.png",precio:"$85.000",color:"No",tallaje:"No",pernumero:"No",Fav:"No"},
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

        divImagen.append(img);

        const divInfo =document.createElement("div");
        divInfo.classList.add("producto-info");

        const nombre = document.createElement("h3");
        nombre.classList.add("producto-nombre");
        nombre.textContent = p.Nombre;

        const precio = document.createElement("p");
        precio.classList.add("producto-precio");
        precio.textContent = p.precio;
        
        const categoria=document.createElement("p");
        categoria.classList.add("producto-categoria");
        categoria.textContent=p.Categoria;

        divInfo.append(precio,nombre,categoria);
        link.append(divImagen,divInfo,Favoritos);
        catalogo.appendChild(link);

    });


}

mostrarCatalogo();


