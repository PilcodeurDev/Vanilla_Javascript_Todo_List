//Selecteurs
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//Ecouteurs
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("input", filterTodo);

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

  //. Ajouter la todo au localstorage
  saveLocalTodos(todoInput.value);

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
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    })
  }
  //. Check mark
  if (item.classList[0] === "complete-btn") {
    item.parentElement.classList.toggle("completed");
  }
}

function filterTodo(event) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    switch (event.target.value) {

      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  })
}

function saveLocalTodos(todo) {
  //. checker items existants au lancement de la page
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(todo) {
  //. checker items existants au lancement de la page
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }

  todos.forEach(function (todo) {
    //. Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //. Créer le Li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
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
  })
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"))
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
