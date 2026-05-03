# Proyecto: Evaluacion 1

**Alumno:** Chiavón, Facundo

## ✍️ Descripción

consolidar los conocimientos adquiridos en las primeras unidades del cursado (HTML, CSS, JavaScript y TypeScript), mediante la evolución del proyecto Food Store hacia una aplicación frontend más dinámica e interactiva llegando a convertirse en un **Carrito** básico con persistencia.

Se incorporaron las siguientes funcionalidades:

- Agregar productos desde el catálogo
- Visualizar los productos agregados en una vista de carrito
- Mostrar nombre, precio y cantidad de cada producto en el carrito
- Calcular y mostrar el total de la compra

---

## 🚀 Instalación y Uso

Se recomienda usar `pnpm` como gestor de paquetes para mayor eficiencia en el manejo de dependencias.

### 1. Descomprimir el contenido del archivo zip

### 2. Instalar Dependencias del Proyecto

Una vez en la carpeta raíz del proyecto, instala las dependencias necesarias con `pnpm`:

```bash
pnpm install
```

### 3. Ejecutar el Proyecto

Para iniciar el servidor de desarrollo de Vite, ejecuta:

```bash
pnpm dev
```

La aplicación estará disponible en la URL que aparezca en la terminal (generalmente `http://localhost:5173`).

---

## ⚙️ ¿Cómo Funciona el Carrito?

1.  **Inicio de Sesión**: Cuando un usuario se "loguea", su información (incluido su rol) se guarda como un string JSON en `localStorage`.
2.  **Carga de Página Protegida**: Cada vez que se intenta cargar una página protegida (ej. la página de Administrador), se ejecuta un script de verificación (`checkAuhtUser` en `src/utils/auth.ts`).
3.  **Verificación**: El script comprueba:
    - Si existe un usuario en `localStorage`. Si no, redirige al login.
    - Si el rol del usuario guardado coincide con el rol requerido para acceder a esa página. Si no coincide, lo redirige a una página de acceso denegado o a su "home" correspondiente.
4.  **Sesión de Cliente**: Si el usuario posee el rol de **cliente** podrá ver un listado de los productos disponibles, interactuar con los diferentes filtros y agregar artículos a su carrito de compras. Estos artículos se guardan en un array dentro del `localStorage`.
    También tiene acceso a su carrito de compras donde se visualizarán los productos anteriormente agregados, pudiendo aumentar o reducir las cantidades de dichos productos, o bien un mensaje correspondiente si es que el carrito se encuentra vacío.
5.  **Finalizar Compra**: La funcionalidad del botón de **Finalizar Compra** se encuentra actualmente en desarrollo. De momento solo mostrará una alerta informando la finalización de la compra.
6.  **Cierre de Sesión (Logout)**: Al cerrar sesión, la información del usuario se elimina de `localStorage`.

---

## 📁 Estructura del Proyecto

```
/
├── src/
│   ├── data/                 # Contiene nuestra base de datos (Categorias, Productos)
│   ├── pages/                # Contiene las páginas de la aplicación
│   │   ├── admin/            # Páginas solo para administradores
│   │   ├── auth/             # Páginas de autenticación (login, registro)
│   │   └── store/            # Páginas solo para clientes
│   ├── types/                # Define las interfaces y tipos (IUser, IUsers, Rol, Categoria, Product)
│   └── utils/                # Lógica reutilizable
│       ├── auth.ts           # Función principal de verificación de rol y sesión
│       ├── localStorage.ts   # Funciones para leer/escribir en localStorage
│       └── navigate.ts       # Función para redirigir al usuario
├── package.json              # Dependencias y scripts
└── README.md                 # Este archivo
```
