const Productos= JSON.parse(localStorage.getItem("Carrito")) || null;
const ENVIO_STORAGE_KEY = "envios";

const loadShipments = () => {
    const saved = localStorage.getItem(ENVIO_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
};

const saveShipments = (shipments) => {
    localStorage.setItem(ENVIO_STORAGE_KEY, JSON.stringify(shipments));
};
const safeRead = (key) => {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        console.warn('No se pudo leer el valor de', key, error);
        return null;
    }
};
const generateShipmentId = () => {
    const random = Math.floor(Math.random() * 900) + 100;
    return `ADN-${Date.now()}-${random}`;
};
let ValorTotal=0;

const contenedor=document.getElementById("contenedor");
const divContenedorProd=document.createElement("div");
divContenedorProd.classList.add("contenedor-productos");
contenedor.append(divContenedorProd);
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
                localStorage.setItem("Carrito", JSON.stringify(Productos));
            }, 300);

            ValorTotal-= parseInt(p.precioProducto.replace(/[^\d]/g, ""));
            Productos.splice(index, 1);  
            localStorage.setItem("Carrito", JSON.stringify(Productos));
            Total.textContent = "Total: $" + ValorTotal;

        })
    
        divInfo.append(NombreProducto,PrecioProducto);
        divProducto.append(divImagen,divInfo,BotonEliminar);
        divContenedorProd.append(divProducto);
        contenedor.append(divContenedorProd);
    });
}

    const divInformacion=document.createElement("div");
    divInformacion.classList.add("contenedor-informacion");

    
    const divDatos=document.createElement("div");
    divDatos.classList.add("contenedor-informacion-datos");

    const divTitulo=document.createElement("div");
    divTitulo.classList.add("titulo");
    divTitulo.textContent="CARRITO";

    const Nombre=document.createElement("p");
    Nombre.classList.add("informacion");
    
    const Numero=document.createElement("p");
    Numero.classList.add("informacion");

    const Direccion=document.createElement("p");
    Direccion.classList.add("informacion");

    const Ciudad=document.createElement("p");
    Ciudad.classList.add("informacion");

    const safeParse = (value) => {
        try {
            return JSON.parse(value);
        } catch (error) {
            console.warn('No se pudo interpretar el usuario almacenado:', error);
            return null;
        }
    };

    const getUsuarioActual = () => {
        const rawUser = safeRead("usuario_actual");
        const user = rawUser ? safeParse(rawUser) : null;
        if (user && user.username && user.address && user.city) return user;

        const usuariosRaw = safeRead("usuarios");
        const usuariosParsed = usuariosRaw ? safeParse(usuariosRaw) : null;
        if (usuariosParsed && Array.isArray(usuariosParsed.users) && usuariosParsed.users.length > 0) {
            return usuariosParsed.users[usuariosParsed.users.length - 1];
        }
        return null;
    };

    const usuarioActual = getUsuarioActual();

    if (usuarioActual) {
        Nombre.textContent = usuarioActual.username;
        Numero.textContent = usuarioActual.phone || "-";
        Direccion.textContent = usuarioActual.address || "-";
        Ciudad.textContent = usuarioActual.city || "-";
    } else {
        Nombre.textContent = "Usuario no encontrado";
        Numero.textContent = "-";
        Direccion.textContent = "-";
        Ciudad.textContent = "-";
    }


    const p1=document.createElement("h2");
    p1.classList.add("informacion-frase");
    p1.textContent="SENTIR";

    const p2=document.createElement("h2");
    p2.classList.add("informacion-frase");
    p2.textContent="SANGRE";

    const Frase=document.createElement("p");
    Frase.classList.add("informacion-frase");
    Frase.append("A UN PASO DE ", p1, " EL DEPORTE EN TU ", p2);

    const Total=document.createElement("p");
    Total.classList.add("informacion");
    if(ValorTotal<=0){
      Total.textContent="Total: $0"; 
    }
    else{
        Total.textContent="Total: $"+ValorTotal;
    }
    
    const BtnComprar=document.createElement("button");
    BtnComprar.classList.add("boton-comprar");
    BtnComprar.textContent="REALIZAR COMPRA";

  BtnComprar.addEventListener('click', () => {
    if (!Productos || Productos.length === 0) {
        alert("No tienes productos en el carrito.");
        return;
    }

    const usuarioActual = getUsuarioActual();

    if (!usuarioActual) {
        alert("Debes iniciar sesión para finalizar la compra.");
        return;
    }
    if (!usuarioActual.username || !usuarioActual.address || !usuarioActual.city) {
        alert("Tu cuenta no tiene datos completos de envío. Actualiza tu registro para continuar.");
        return;
    }
    const nuevoEnvio = {
        id: generateShipmentId(),
        cliente: usuarioActual.username,
        telefono: usuarioActual.phone || "-",
        direccion: usuarioActual.address,
        ciudad: usuarioActual.city,
        articulos: Productos.map((p) => p.nombreProducto),
        total: `$${ValorTotal}`,
        comprado: new Date().toISOString().slice(0, 10),
        diasRestantes: 5,
        urgente: false,
        estado: 'pendiente'
    };

    const envios = loadShipments();
    envios.push(nuevoEnvio);
    saveShipments(envios);
    const cartPanel = document.createElement("div");
    cartPanel.classList.add("cart-confirmation");

    const content = document.createElement("div");
    content.classList.add("cart-content");

    const title = document.createElement("div");
    title.classList.add("cart-title");
    title.textContent = "Compra realizada 🛒";

    const nameInfo = document.createElement("div");
    nameInfo.classList.add("cart-name");
    nameInfo.textContent = "Productos comprados: " + Productos.length;

    const priceInfo = document.createElement("div");
    priceInfo.classList.add("cart-price");
    priceInfo.textContent = "Total pagado: $" + ValorTotal;

    content.append(title, nameInfo, priceInfo);
    cartPanel.append(content);
    document.body.appendChild(cartPanel);
    Productos.length = 0;


    localStorage.setItem("Carrito", JSON.stringify(Productos));


    divContenedorProd.innerHTML = "";


    ValorTotal = 0;
    Total.textContent = "Total: $0";

    setTimeout(() => cartPanel.classList.add("show"), 10);
    setTimeout(() => {
        cartPanel.classList.remove("show");
        cartPanel.classList.add("hide");
    }, 3000);
    setTimeout(() => cartPanel.remove(), 4000);
});
    divDatos.append(divTitulo,Nombre,Numero,Direccion,Ciudad,Frase,Total);
    divInformacion.append(divDatos,BtnComprar);
    contenedor.append(divInformacion);
    


