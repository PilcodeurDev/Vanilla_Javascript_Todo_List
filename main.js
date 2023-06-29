//Selecteurs
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//Ecouteurs
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);

//Fonctions
function addTodo(event) {
  event.preventDefault();
  //. Todo Div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //. Créer le Li
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  //. Bouton check
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<span class="material-symbols-outlined">done</span>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  //. Bouton supprimer
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<span class="material-symbols-outlined">delete_forever</span>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  //. ajouter le todo à todo-list
  todoList.appendChild(todoDiv);
  todoInput.value = "";
}

function deleteCheck(event) {
  const item = event.target;

  //. Delete todo
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    })
  }

  //. Check mark
  if (item.classList[0] === "complete-btn") {
    item.parentElement.classList.toggle("completed");
  }

}
