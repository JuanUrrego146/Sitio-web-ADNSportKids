const Productos= JSON.parse(localStorage.getItem("Carrito")) || null;

const contenedor=document.getElementById("contenedor");

if(Productos)
{
    Productos.forEach(p => {
        
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

        BotonEliminar.addEventListener("click",()=>{
            p.Fav="No";
            BotonEliminar.classList.add("selected");
            setTimeout(() => {
                divProducto.remove(); 
                localStorage.setItem("productos", JSON.stringify(productos));
            }, 300);

        })
    
        divInfo.append(NombreProducto,PrecioProducto);
        divProducto.append(divImagen,divInfo,BotonEliminar);
        divFavoritos.append(divProducto);
    });
}