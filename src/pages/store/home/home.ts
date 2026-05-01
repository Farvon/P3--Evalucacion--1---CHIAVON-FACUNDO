import { checkAuhtUser, logout } from "../../../utils/auth";
import { PRODUCTS, categorias } from "../../../data/data";

const listaCategorias: HTMLUListElement | null =
  document.getElementById("lista-categorias");
const contenedorProductos: HTMLElement | null = document.getElementById(
  "contenedor-productos",
);

const buttonLogout = document.getElementById(
  "logoutButton",
) as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});

// // Función para renderizar las categorías
// const renderCategorias = () => {
//   const listaCategorias = document.getElementById(
//     "lista-categorias",
//   ) as HTMLUListElement;

//   if (!listaCategorias) return;

//   listaCategorias.innerHTML = "";

//   categorias.forEach((categoria) => {
//     const li = document.createElement("li");
//     li.textContent = categoria.nombre;
//     li.style.cursor = "pointer";
//     li.addEventListener("click", () => {
//       filterProductosByCategoria(categoria.id);
//     });
//     listaCategorias.appendChild(li);
//   });
// };

// // Función para renderizar los productos
// const renderProductos = (productos: Product[]) => {
//   const contenedor = document.getElementById(
//     "contenedor-productos",
//   ) as HTMLElement;

//   if (!contenedor) return;

//   contenedor.innerHTML = "";

//   productos.forEach((producto) => {
//     const div = document.createElement("div");
//     div.style.border = "1px solid #ddd";
//     div.style.padding = "15px";
//     div.style.borderRadius = "5px";
//     div.style.marginBottom = "15px";

//     const nombre = document.createElement("h3");
//     nombre.textContent = producto.nombre;

//     const precio = document.createElement("p");
//     precio.textContent = `Precio: $${producto.precio}`;

//     const descripcion = document.createElement("p");
//     descripcion.textContent = producto.descripcion;

//     const stock = document.createElement("p");
//     stock.textContent = `Stock: ${producto.stock}`;

//     const disponibilidad = document.createElement("p");
//     disponibilidad.textContent = producto.disponible
//       ? "Disponible"
//       : "No disponible";
//     disponibilidad.style.color = producto.disponible ? "green" : "red";

//     div.appendChild(nombre);
//     div.appendChild(precio);
//     div.appendChild(descripcion);
//     div.appendChild(stock);
//     div.appendChild(disponibilidad);

//     contenedor.appendChild(div);
//   });
// };

// // Función para filtrar productos por categoría
// const filterProductosByCategoria = (categoriaId: number) => {
//   const productosFiltrados = PRODUCTS.filter((producto) =>
//     producto.categorias.some((cat) => cat.id === categoriaId),
//   );
//   renderProductos(productosFiltrados);
// };

// Función de inicialización
const initPage = () => {
  console.log("inicio de pagina");
  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/admin/home/home.html",
    "client",
  );

  const cargarCategorias = () => {
    categorias.forEach((categoria) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#" class="nav-link">${categoria}</a>`;
      listaCategorias?.appendChild(li);
    });
  };

  const cargarProductos = () => {
    PRODUCTS.forEach((producto) => {
      const article = document.createElement("article");
      article.innerHTML = `
            <img src="/assets/pizza.jpg" width="250" alt="${producto.nombre}" />
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: <strong>$${producto.precio.toFixed(2)}</strong></p>
            <button id="boton-agregar">Añadir al Carrito</button>
         
        `;
      contenedorProductos?.appendChild(article);
    });
  };

  /* Agregar evento de click a los botones "Añadir al Carrito" */
  contenedorProductos?.addEventListener("click", (event) => {
    if (event.target.id === "boton-agregar") {
      const productoNombre =
        event.target.parentElement?.querySelector("h3")?.textContent;
      alert(`Producto "${productoNombre}" añadido al carrito`);
    }
  });

  /* LLamo a las funciones */
  cargarCategorias();
  cargarProductos();

  // renderCategorias();
  // renderProductos(PRODUCTS);
};

initPage();
