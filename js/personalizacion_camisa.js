const params = new URLSearchParams(window.location.search);
const nombre = params.get("nombre");
const precio = params.get("precio");
const imagen = params.get("imagen");
const imagen2 = params.get("imagen2");
const subcategoria = params.get("subcategoria");

const imageFront = document.querySelector(".image-gallery .image-wrapper img");
const imageBack = document.querySelector(".camisa-back img");
const categoriaText = document.querySelector(".details h3");
const nombreText = document.querySelector(".details h1");
const precioText = document.querySelector(".price");


const addToCartBtn = document.querySelector('.btn-secondary');
const cartPanel = document.getElementById('cartConfirmation');
const cartName = document.getElementById('cartProductName');
const cartPrice = document.getElementById('cartProductPrice');

if (nombre && precio && imagen && subcategoria) {

  imageFront.src = imagen;
  imageFront.alt = nombre;

  
  if (imagen2 && imagen2.trim() !== "") {
    imageBack.src = imagen2;
    imageBack.alt = `${nombre} reverso`;
  } else {
    imageBack.parentElement.style.display = "none";
  }


  categoriaText.textContent = subcategoria.toUpperCase();
  nombreText.textContent = nombre.toUpperCase();
  precioText.textContent = precio;
} else {
  console.warn("⚠️ No se recibieron datos válidos del catálogo.");
}

addToCartBtn.addEventListener('click', () => {
  
  const productName = document.querySelector('.details h1').textContent.trim();
  const productPrice = document.querySelector('.price').textContent.trim();

  cartName.textContent = productName;
  cartPrice.textContent = productPrice;


  cartPanel.classList.remove('hidden');
  cartPanel.classList.add('show');

  setTimeout(() => {
    cartPanel.classList.remove('show');
    cartPanel.classList.add('hidden');
  }, 4000);
});

