//variables
const userForm = document.getElementById("user-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const userIdInput = document.getElementById("user-id");
const userTable = document.getElementById("user-table");

//funciones
function leerUsuarios() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function guardarUsuarios(users) {
  localStorage.setItem("users", JSON.stringify(users));
}

function mostrarUsuarios(){
  const users = leerUsuarios();
  userTable.innerHTML = "";

  users.forEach((user, index)=>{
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td class="actions">
        <button class="edit-btn" onclick="editar(${index})">Editar</button>
        <button class="delete-btn" onclick="eliminar(${index})">Eliminar</button>
      </td>
    `;

    userTable.appendChild(row);
  });
}

function crear(user){
  const users = leerUsuarios();
  users.push(user);
  guardarUsuarios(users);
  mostrarUsuarios();
}

function actualizar(index, updatedUser){
  const users= leerUsuarios();
  users[index]= updatedUser;
  guardarUsuarios(users);
  mostrarUsuarios();
}

function eliminar(index){
  const users= leerUsuarios();
  users.splice(index, 1);
  guardarUsuarios(users);
  mostrarUsuarios();
}

function editar(index){
  const users= leerUsuarios();
  const user= users[index];
  nameInput.value= user.name;
  emailInput.value= user.email;
  userIdInput.value= index;
}

//eventos
userForm.addEventListener("submit", (e)=>{
  e.preventDefault();
  const name= nameInput.value.trim();
  const email= emailInput.value.trim();
  const id= userIdInput.value;

  if (!name || !email) return alert("Todos los campos son obligatorios");

  if (id === ""){
    crear({ name, email });
  } else {
    actualizar(Number(id), { name, email });
  }

  userForm.reset();
  userIdInput.value= "";
});

//inicalizacion
document.addEventListener("DOMContentLoaded", mostrarUsuarios);
