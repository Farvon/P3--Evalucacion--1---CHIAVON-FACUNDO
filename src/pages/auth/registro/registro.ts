import type { IUsers } from "../../../types/IUsers";
import type { Rol } from "../../../types/Rol";
import { navigate } from "../../../utils/navigate";

const form = document.getElementById("form") as HTMLFormElement;
const inputEmail = document.getElementById("email") as HTMLInputElement;
const inputPassword = document.getElementById("password") as HTMLInputElement;

form.addEventListener("submit", (e: SubmitEvent) => {
  e.preventDefault();

  const valueEmail = inputEmail.value;
  const valuePassword = inputPassword.value;
  const valueRol = "client" as Rol;

  const users: IUsers[] = JSON.parse(localStorage.getItem("users") || "[]");

  const userExists = users.some((u) => u.email === valueEmail);

  if (userExists) {
    alert("El usuario ya se encuentra registrado.");
    return;
  }

  const newUser: IUsers = {
    email: valueEmail,
    role: valueRol,
    password: valuePassword,
  };

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  console.log("Usuario registrado con éxito", newUser);

  if (valueRol === "admin") {
    navigate("/src/pages/admin/home/home.html");
  } else {
    navigate("/src/pages/store/home/home.html");
  }
});
