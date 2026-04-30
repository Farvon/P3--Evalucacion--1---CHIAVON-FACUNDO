import type { IUser } from "./types/IUser";
import { navigate } from "./utils/navigate";
import { getUSer } from "./utils/localStorage";

const sessionValidate = () => {
  const isLoged: boolean = getUSer() ? true : false;
  const currentPath = window.location.pathname;

  // 1. Obtenemos la data si existe
  const userData: IUser = isLoged
    ? JSON.parse(localStorage.getItem("userData") || "{}")
    : ({} as IUser);

  // 2. Definimos si estamos en una página de autenticación
  // Agregamos el chequeo de "/" para que la raíz también sea evaluada
  const isAuthPage =
    currentPath.includes("login.html") || currentPath.includes("register.html");
  const isRoot = currentPath === "/";

  if (isLoged) {
    // Si estoy logueado y estoy en la raíz o en login, me saca de ahí
    if (isRoot || isAuthPage) {
      navigate(`/src/pages/${userData.role}/home/home.html`);
    }
  } else {
    // Si NO estoy logueado y NO estoy en una página de auth, me manda a loguear
    // Esto incluye la ruta raíz "/"
    if (!isAuthPage) {
      navigate("/src/pages/auth/login/login.html");
    }
  }
};

sessionValidate(); // Validamos la sesión al cargar el módulo

export { sessionValidate };
