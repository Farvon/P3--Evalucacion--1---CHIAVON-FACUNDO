import { checkAuhtUser, logout } from "../../../utils/auth";
import { getProducts, getCategories } from "../../../data/data";
import type { Product } from "../../../types/product";

const listaCategorias: HTMLElement | null =
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

// Función de inicialización
const initPage = () => {
  console.log("inicio de pagina");
  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/admin/home/home.html",
    "client",
  );

  const cargarCategorias = () => {
    const categorias = getCategories().map((c) => c.nombre);
    categorias.forEach((categoria) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#" id="filtro" class="nav-link">${categoria}</a>`;
      listaCategorias?.appendChild(li);
    });
    if (listaCategorias) {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#" id="limpiarFiltro" class="nav-link">Todas</a>`;
      listaCategorias.appendChild(li);
    }
  };

  let productosMostrados: Product[] = [...getProducts()];

  const cargarProductos = (productos: Product[]) => {
    if (!contenedorProductos) return;

    contenedorProductos.innerHTML = "";
    productos.forEach((producto) => {
      const article = document.createElement("article");
      article.innerHTML = `
            <img src="/assets/${producto.imagen}" width="250" alt="${producto.nombre}" />
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: <strong>$${producto.precio.toFixed(2)}</strong></p>
            <button id="boton-agregar">Añadir al Carrito</button>
         
        `;
      contenedorProductos?.appendChild(article);
    });
  };

  /* Agregar evento de click a los botones "Añadir al Carrito" - guardarlos en localstorage */
  contenedorProductos?.addEventListener("click", (event) => {
    if (
      event.target instanceof HTMLButtonElement &&
      event.target.id === "boton-agregar"
    ) {
      const productoNombre =
        event.target.parentElement?.querySelector("h3")?.textContent;
      const producto = getProducts().find((p) => p.nombre === productoNombre);
      if (producto) {
        let carrito: Product[] = JSON.parse(
          localStorage.getItem("carrito") || "[]",
        );
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarContadorCarrito();
      }
    }
  });

  /* Agregar evento de click al botón "Aplicar Filtro" */
  listaCategorias?.addEventListener("click", (event) => {
    if (
      event.target instanceof HTMLAnchorElement &&
      event.target.id === "filtro"
    ) {
      const categoriaNombre = event.target.textContent;
      const categoria = getCategories().find(
        (c) => c.nombre === categoriaNombre,
      );
      if (categoria) {
        filterProductosByCategoria(categoria.id);
      }
    }
    if (
      event.target instanceof HTMLAnchorElement &&
      event.target.id === "limpiarFiltro"
    ) {
      clearFilter();
    }
  });

  // Función para filtrar productos por categoría
  const filterProductosByCategoria = (categoriaId: number) => {
    const productosFiltrados = productosMostrados.filter((producto) =>
      producto.categorias.some((cat) => cat.id === categoriaId),
    );
    cargarProductos(productosFiltrados);
  };

  // Función para limpiar el filtro
  const clearFilter = () => {
    cargarProductos(productosMostrados);
  };

  // Sumar el total de productos en el carrito y mostrarlo en el icono del carrito
  const actualizarContadorCarrito = () => {
    const carrito: Product[] = JSON.parse(
      localStorage.getItem("carrito") || "[]",
    );
    const contador = document.getElementById("cartElementCount");
    if (contador) {
      contador.textContent = carrito.length.toString();
    }
    if (carrito.length === 0) {
      const contador = document.getElementById("cartElementCount");
      if (contador) {
        contador.textContent = "0";
      }
    }
  };

  // Actualizar el contador del carrito al cargar la página
  actualizarContadorCarrito();

  //--- LLamo a las funciones de carga inicial ---
  cargarCategorias();
  cargarProductos(productosMostrados);

  // al hacer click en el icono del carrito, redirigir a la página del carrito
  const cartIcon = document.getElementById("cartIcon");
  cartIcon?.addEventListener("click", () => {
    window.location.href = "/src/pages/store/cart/cart.html";
  });
};

initPage();
