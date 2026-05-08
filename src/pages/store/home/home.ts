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

const initPage = () => {
  console.log("inicio de pagina");
  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/admin/home/home.html",
    "client",
  );

  //Cargamos las categorias en el menu de categorias y agregamos un boton para limpiar el filtro de categorias----------------------
  const cargarCategorias = () => {
    const categorias = getCategories().map((c) => c.nombre);
    if (listaCategorias) {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#" id="limpiarFiltro">Todas</a>`;
      listaCategorias.appendChild(li);
    }
    categorias.forEach((categoria) => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="#" id="filtro" class="nav-link">${categoria}</a>`;
      listaCategorias?.appendChild(li);
    });
  };

  let productosMostrados: Product[] = [...getProducts()];

  //Cargamos los productos en el contenedor de productos----------------------
  const cargarProductos = (productos: Product[]) => {
    if (!contenedorProductos) return;

    contenedorProductos.innerHTML = "";
    productos.forEach((producto) => {
      const article = document.createElement("article");
      article.innerHTML = `
        <div class="${producto.disponible ? "" : "no-disponible"}">
          <img src="/assets/${producto.imagen}" width="250" alt="${producto.nombre}" />
          <h3 key="${producto.id}">${producto.nombre}</h3>
          <p>${producto.descripcion}</p>
          <p>Precio: <strong>$${producto.precio.toFixed(2)}</strong></p>    
          
          <button id="boton-agregar" ${producto.disponible ? "" : "disabled"} class="${producto.disponible ? "" : "ocultar"}">Añadir al Carrito</button>
          <h4 class="${producto.disponible ? "ocultar" : ""}">Sin Stock</h4>   
        </div>
        `;

      contenedorProductos?.appendChild(article);
    });
  };

  //Filtramos los productos por nombre o descripción al escribir en la barra de búsqueda----------------------
  const inputBusqueda = document.getElementById(
    "buscarProducto",
  ) as HTMLInputElement;
  inputBusqueda.addEventListener("input", () => {
    const query = inputBusqueda.value.toLowerCase();
    const productosFiltrados = getProducts().filter(
      (producto) =>
        producto.nombre.toLowerCase().includes(query) ||
        producto.descripcion.toLowerCase().includes(query) ||
        producto.categorias.some((cat) =>
          cat.nombre.toLowerCase().includes(query),
        ),
    );
    if (productosFiltrados.length === 0) {
      contenedorProductos!.innerHTML =
        "<p id='sin-resultados'>No se encontraron productos</p>";
      return;
    }
    cargarProductos(productosFiltrados);
  });

  // Evitamos que el formulario se envíe al presionar Enter en la barra de búsqueda----------------------
  inputBusqueda.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });

  //Agregamos el producto al carrito al hacer click en el botón "Añadir al Carrito" y actualizamos el contador en el icono del carrito----------------------
  contenedorProductos?.addEventListener("click", (event) => {
    if (
      event.target instanceof HTMLButtonElement &&
      event.target.id === "boton-agregar"
    ) {
      const productoId = event.target.parentElement
        ?.querySelector("h3")
        ?.getAttribute("key");

      if (productoId) {
        let carrito: Product[] = JSON.parse(
          localStorage.getItem("carrito") || "[]",
        );
        if (carrito.some((p) => p.id === parseInt(productoId))) {
          // Si el producto ya está en el carrito, sumamos su cantidad
          carrito = carrito.map((p) =>
            p.id === parseInt(productoId) ? { ...p, stock: p.stock + 1 } : p,
          );
           const producto = getProducts().find(
            (p) => p.id === parseInt(productoId),
          );
          if (producto) {
            mensajeProductoAgregado(producto);
          }
          
          
        } else {
          // Si el producto no está en el carrito, lo agregamos con cantidad 1
          const producto = getProducts().find(
            (p) => p.id === parseInt(productoId),
          );
          if (producto) {
            carrito.push({ ...producto, stock: 1 });
            mensajeProductoAgregado(producto);
          }
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        
        actualizarContadorCarrito();
      }
    }
  });

  //Filtramos los productos al hacer click en una categoría y agregamos un botón para volver a mostrar todos los productos----------------------
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

  //Funcion que realiza el filtro de productos
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

  // Funcion para actualizar el contador del carrito en el icono del carrito----------------------
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

  //Mensaje de producto agregado
  const mensajeProductoAgregado =(producto:Product)=>{
    const body = document.getElementById("contenedor-productos");
    if (body){
    body.innerHTML += `<div class='toast' id='toast'></div>`;
    }
    
    const toast = document.getElementById("toast");
    if (toast){
    toast.textContent=`${producto.nombre} agregado`;
    toast.style.opacity = "1";
    toast.style.transform= "translateY(-30px)";
    setTimeout(() => {
       toast.style.opacity='0';
       toast.style.transform= "translateY(20px)";
      
       
    }, 2000);

    
  }
}

  // Actualiza el contador del carrito al cargar la página
  actualizarContadorCarrito();

  //LLamo a las funciones de carga inicial ---
  cargarCategorias();
  cargarProductos(productosMostrados);

  // Redirecciona a la página del carrito al hacer click en el icono del carrito----------------------
  const cartIcon = document.getElementById("cartIcon");
  cartIcon?.addEventListener("click", () => {
    window.location.href = "/src/pages/store/cart/cart.html";
  });

  const carritoLink = document.getElementById("carrito");
  carritoLink?.addEventListener("click", () => {
    window.location.href = "/src/pages/store/cart/cart.html";
  });
};

initPage();
