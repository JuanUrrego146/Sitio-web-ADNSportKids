const params = new URLSearchParams(window.location.search);
const nombre = params.get("nombre");
const precio = params.get("precio");
const imagen = params.get("imagen");
const color = params.get("color");
const tallaje = params.get("tallaje");
const pernumero = params.get("pernumero");
const categoria=params.get("subcategoria");

const personalizar = document.getElementById("personalizar");

function mostrarPersonalizacion(categoriaSeleccionada = null){
    personalizar.innerHTML="";

    const divImagen=document.createElement("div");
    divImagen.classList.add("imagen");

    const img=document.createElement("img");
    img.src=imagen;
    img.alt=nombre;
    divImagen.appendChild(img);

    const divOpciones=document.createElement("div");
    divOpciones.classList.add("opciones");

    const h3Categoria=document.createElement("h3");
    h3Categoria.classList.add("opciones-categoria");
    h3Categoria.textContent=categoria;

    const h3Nombre=document.createElement("h3");
    h3Nombre.classList.add("opciones-nombre");
    h3Nombre.textContent=nombre;
    
    const h3Precio=document.createElement("h3");
    h3Precio.classList.add("opciones-precio");
    h3Precio.textContent=precio;
    divOpciones.append(h3Categoria,h3Nombre,h3Precio);
    if(color== "Si"){

        const ColorText=document.createElement("h2");
        ColorText.classList.add("opciones-nombre");
        ColorText.textContent="Elige el color";
        
        const divColor=document.createElement("div");
        divColor.classList.add("opciones-color");

        const color1=document.createElement("div");
        color1.classList.add("opciones-color-item");
        color1.style.backgroundColor="red";

        const color2=document.createElement("div");
        color2.classList.add("opciones-color-item");
        color2.style.backgroundColor="green";

        const color3=document.createElement("div");
        color3.classList.add("opciones-color-item");
        color3.style.backgroundColor="blue";

        divColor.append(color1,color2,color3);
        divOpciones.append(ColorText,divColor);
        
    }

    personalizar.append(divImagen,divOpciones);


}

mostrarPersonalizacion();






