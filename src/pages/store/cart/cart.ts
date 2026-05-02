import { checkAuhtUser, logout } from "../../../utils/auth";

const buttonLogout = document.getElementById(
  "logoutButton",
) as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});

const initPage = () => {
  console.log("inicio de pagina");
  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/admin/home/home.html",
    "client",
  );
};
initPage();

// acceder al carrito en localstorage y mostrar los productos en el contenedor del carrito con los botones para agregar o quitar productos del carrito junto con el total del producto en el carrito
const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
const contenedorCarrito = document.getElementById(
  "contenedor-carrito",
) as HTMLDivElement;

if (carrito.length === 0) {
  contenedorCarrito.innerHTML = "<p>Tu carrito está vacío</p>";
}

const elementosUnicos = Array.from(new Set(carrito.map((p: any) => p.id))).map(
  (id) => {
    return carrito.find((p: any) => p.id === id);
  },
);

elementosUnicos.forEach((producto: any) => {
  const cantidad = carrito.filter((p: any) => p.id === producto.id).length;
  const article = document.createElement("article");
  article.innerHTML = `
    <img src="/assets/${producto.imagen}" alt="${producto.nombre}" />
    <h3>${producto.nombre}</h3>
    <p>Precio: $${producto.precio}</p>
    <div class="cantidad-control">
      <button class="restar-cantidad" data-id="${producto.id}">-</button>
      <span>${cantidad}</span>
      <button class="sumar-cantidad" data-id="${producto.id}">+</button>
    </div>
  `;
  contenedorCarrito.appendChild(article);
});

//actualizar el carrito al hacer click en los botones de sumar o restar cantidad. Eliminar el elemento si la cantidad es 0
contenedorCarrito.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  if (target.classList.contains("sumar-cantidad")) {
    const id = target.getAttribute("data-id");
    const producto = carrito.find((p: any) => p.id == id);
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    location.reload();
  } else if (target.classList.contains("restar-cantidad")) {
    const id = target.getAttribute("data-id");
    const index = carrito.findIndex((p: any) => p.id == id);
    if (index !== -1) {
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      location.reload();
    }
  }
});

//vaciar carrito
const botonVaciar = document.getElementById("vaciar-carrito");
botonVaciar?.addEventListener("click", () => {
  localStorage.removeItem("carrito");
  location.reload();
});

//calcular el total del carrito y mostrarlo en el contenedor del resumen de compra
const total = carrito.reduce((acc: number, producto: any) => {
  return acc + producto.precio;
}, 0);
const resumenCompra = document.getElementById("total-compra") as HTMLDivElement;
resumenCompra.innerHTML = `
  <p>SubTotal: $${total.toFixed(2)}</p>
  <p>Total: $${total.toFixed(2)}</p>
`;

//Ir a inicio al hacer click en el botón de id inicio
const inicio = document.getElementById("inicio");
inicio?.addEventListener("click", () => {
  window.location.href = "/src/pages/store/home/home.html";
});
