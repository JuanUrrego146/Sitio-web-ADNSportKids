const historialContenedor = document.getElementById("historial-contenedor");

const historial = JSON.parse(localStorage.getItem("HistorialCompras")) || [];

if(historial.length === 0){
    historialContenedor.innerHTML = "<p>No hay compras registradas.</p>";
}

historial.forEach((compra, i) => {

    const bloqueCompra = document.createElement("div");
    bloqueCompra.classList.add("bloque-compra");
    bloqueCompra.style.border = "2px solid black";
    bloqueCompra.style.padding = "20px";
    bloqueCompra.style.margin = "20px";

    const titulo = document.createElement("h2");
    titulo.textContent = `Compra #${i+1} — ${compra.fecha}`;
    bloqueCompra.appendChild(titulo);

    compra.productos.forEach(p => {

        const divProducto = document.createElement("div");
        divProducto.classList.add("producto");
        divProducto.style.height = "200px";

        const divImagen = document.createElement("div");
        divImagen.classList.add("imagen-producto");

        const img = document.createElement("img");
        img.src = p.imagenProducto;
        img.alt = p.nombreProducto;
        divImagen.appendChild(img);

        const divInfo = document.createElement("div");
        divInfo.classList.add("descripcion-producto");

        const nombre = document.createElement("p");
        nombre.classList.add("descripcion-producto-texto");
        nombre.textContent = p.nombreProducto;

        const precio = document.createElement("p");
        precio.classList.add("descripcion-producto-texto");
        precio.textContent = p.precioProducto;

        divInfo.append(nombre, precio);

        divProducto.append(divImagen, divInfo);
        bloqueCompra.appendChild(divProducto);

    });

    historialContenedor.appendChild(bloqueCompra);
});
