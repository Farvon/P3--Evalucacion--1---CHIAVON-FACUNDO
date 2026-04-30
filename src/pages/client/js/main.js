const listaCategorias = document.getElementById("lista-categorias");
const contenedorProductos = document.getElementById("contenedor-productos");

const cargarCategorias = () => {
  categorias.forEach((categoria) => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="#" class="nav-link">${categoria}</a>`;
    listaCategorias.appendChild(li);
  });
};

const cargarProductos = () => {
  productos.forEach((producto) => {
    const article = document.createElement("article");
    article.innerHTML = `
            <img src="${producto.imagen}" width="250" alt="${producto.nombre}" />
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <p>Precio: <strong>$${producto.precio.toFixed(2)}</strong></p>
            <button id="boton-agregar">Añadir al Carrito</button>
        `;
    contenedorProductos.appendChild(article);
  });
};

/* Agregar evento de click a los botones "Añadir al Carrito" */
contenedorProductos.addEventListener("click", (event) => {
  if (event.target.id === "boton-agregar") {
    const productoNombre =
      event.target.parentElement.querySelector("h3").textContent;
    alert(`Producto "${productoNombre}" añadido al carrito`);
  }
});

/* LLamo a las funciones */
cargarCategorias();
cargarProductos();
