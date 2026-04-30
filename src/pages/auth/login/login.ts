import type { IUser } from "../../../types/IUser";
import type { IUsers } from "../../../types/IUsers";
import type { Rol } from "../../../types/Rol";
import { navigate } from "../../../utils/navigate";
import { sessionValidate } from "../../../main";
import { getUSer, saveUser } from "../../../utils/localStorage";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;
const selectRol = document.getElementById("rol") as HTMLSelectElement;

const isLoged: boolean = getUSer() ? true : false;
isLoged && sessionValidate();

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const users: IUsers[] = JSON.parse(localStorage.getItem("users") || "[]");

  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;
  //const valueRol = users.find((u) => u.email === valueEmail)?.role as Rol;
  const valueRol = selectRol.value as Rol;

  if (users.some((u) => u.email === valueEmail)) {
    if (valuePassword === users.find((u) => u.email === valueEmail)?.password) {
      const user: IUser = {
        email: valueEmail,
        role: valueRol,
        loggedIn: true,
      };

      saveUser(user);

      if (valueRol === "admin") {
        navigate("/src/pages/admin/home/home.html");
      } else if (valueRol === "client") {
        navigate("/src/pages/store/home/home.html");
      }

      return;
    } else {
      alert("Contraseña incorrecta.");
    }
  } else {
    alert("El usuario no se encuentra registrado.");
  }
});
