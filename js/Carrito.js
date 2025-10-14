const Productos= JSON.parse(localStorage.getItem("Carrito")) || null;

let ValorTotal=null;

const contenedor=document.getElementById("contenedor");

if(Productos)
{
    Productos.forEach((p,index) => {
        
        const divProducto=document.createElement("div");
        divProducto.classList.add("producto");

        const divImagen=document.createElement("div");
        divImagen.classList.add("imagen-producto");

        const img=document.createElement("img");
        img.src=p.imagenProducto;
        img.alt=p.nombreProducto;

        divImagen.appendChild(img);

        const divInfo=document.createElement("div");
        divInfo.classList.add("descripcion-producto");

        const NombreProducto=document.createElement("p");
        NombreProducto.classList.add("descripcion-producto-texto");
        NombreProducto.textContent=p.nombreProducto;

        const PrecioProducto=document.createElement("p");
        PrecioProducto.classList.add("descripcion-producto-texto");
        PrecioProducto.textContent=p.precioProducto;

        const BotonEliminar=document.createElement("button");
        BotonEliminar.classList.add("descripcion-eliminar");
        BotonEliminar.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <circle class="bg-circle" cx="12" cy="12" r="10" />
            <path class="x-icon" d="M8 8l8 8M16 8l-8 8" stroke-width="2" stroke-linecap="round"/>
            </svg>`;

        ValorTotal+= parseInt(p.precioProducto.replace(/[^\d]/g, ""));
        BotonEliminar.addEventListener("click",()=>{
            p.Fav="No";
            BotonEliminar.classList.add("selected");
            setTimeout(() => {
                divProducto.remove(); 
                localStorage.setItem("Carrito", JSON.stringify(productos));
            }, 300);

            ValorTotal-= parseInt(p.precioProducto.replace(/[^\d]/g, ""));
            Productos.splice(index, 1);  
            localStorage.setItem("Carrito", JSON.stringify(Productos));

        })
    
        divInfo.append(NombreProducto,PrecioProducto);
        divProducto.append(divImagen,divInfo,BotonEliminar);
        contenedor.append(divProducto);
    });

    const divInformacion=document.createElement("div");
    divInformacion.classList.add("contenedor-informacion");

    
    const divDatos=document.createElement("div");
    divDatos.classList.add("contenedor-informacion-datos");

    const divTitulo=document.createElement("div");
    divTitulo.classList.add("titulo");
    divTitulo.textContent="CARRITO";

    const Nombre=document.createElement("p");
    Nombre.classList.add("informacion");
    Nombre.textContent="Andres Gutierrez";
    
    const Numero=document.createElement("p");
    Numero.classList.add("informacion");
    Numero.textContent="3605266357";

    const Direccion=document.createElement("p");
    Direccion.classList.add("informacion");
    Direccion.textContent="CLL 270 125-11";

    const Ciudad=document.createElement("p");
    Ciudad.classList.add("informacion");
    Ciudad.textContent="Bogota";

    const p1=document.createElement("h2");
    p1.classList.add("informacion-frase");
    p1.textContent="SENTIR";

    const p2=document.createElement("h2");
    p2.classList.add("informacion-frase");
    p2.textContent="SANGRE";

    const Frase=document.createElement("p");
    Frase.classList.add("informacion-frase");
    Frase.append("A UN PASO DE ", p1, " EL DEPORTE EN TU ", p2);

    const BtnComprar=document.createElement("button");
    BtnComprar.classList.add("boton-comprar");
    BtnComprar.textContent="REALIZAR COMPRA";

    divDatos.append(divTitulo,Nombre,Numero,Direccion,Ciudad,Frase);
    divInformacion.append(divDatos,BtnComprar);
    contenedor.append(divInformacion);



}