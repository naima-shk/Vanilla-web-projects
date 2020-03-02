const todoList = {
  todos: [],

  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
    view.displayTodos();
  },

  changeTodo: function(position, newTodoText) {
    this.todos[position].todoText = newTodoText;
    view.displayTodos();
  },

  deleteTodo: function(position) {
    this.todos.splice(position, 1);
    view.displayTodos();
  },

  toggleCompleted: function(position) {
    let todo = this.todos[position];
    todo.completed = !todo.completed;
  },

  toggleAll: function() {
    const allTodos = this.todos.length;
    let completedTodos = 0;

    for (let i = 0; i < allTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }

    if (completedTodos === allTodos) {
      for (let i = 0; i < allTodos; i++) {
        this.todos[i].completed = false;
      }
    } else {
      for (let i = 0; i < allTodos; i++) {
        this.todos[i].completed = true;
      }
    }

    view.displayTodos();
  }
};

const handlers = {
  toggleAll: function() {
    todoList.toggleAll();
  },

  addTodo: function(e) {
    if (e.keyCode === 13) {
      e.preventDefault(); // Ensure it is only this code that run
      let todoTextInput = document.getElementById("todoTextInput");
      todoList.addTodo(todoTextInput.value);
      todoTextInput.value = "";
    }
  },

  deleteTodo: function(position) {
    todoList.deleteTodo(position);
  }
};

const view = {
  displayTodos: function() {
    let todosUl = document.getElementById("todoList");
    todosUl.innerHTML = "";

    for (let i = 0; i < todoList.todos.length; i++) {
      let todoLi = document.createElement("li");
      let todoLiText = document.createElement("input");
      todoLiText.type = "text";
      todoLiText.disabled = true;
      todoLiText.id = "textInput";
      let todoTextWithCompletion = todoList.todos[i].todoText;
      let check = document.createElement("input");
      check.type = "checkbox";
      check.id = "checkbox";
      check.className = "checkbox";
      check.checked = "";

      todoLi.id = i;
      todoLiText.value = todoTextWithCompletion;
      todoLi.appendChild(check);
      todoLi.appendChild(todoLiText);
      todoLi.appendChild(this.createDeleteButton());
      todoLi.appendChild(this.createEditButton());
      todosUl.appendChild(todoLi);

      if (document.getElementById("checkbox").checked === true) {
        todoList.toggleCompleted(i);
      }
      if (todoList.todos[i].completed === true) {
        todoLiText.style.textDecoration = "line-through";
      }
    }
  },

  createDeleteButton: function() {
    let deleteButton = document.createElement("a");
    deleteButton.href = "#";
    deleteButton.textContent = "Delete";
    deleteButton.className = "x";
    return deleteButton;
  },

  createEditButton: function() {
    let editButton = document.createElement("a");
    editButton.href = "#";
    editButton.textContent = "edit";
    editButton.className = "edit";
    return editButton;
  },

  setUpEventListeners: function() {
    let todosUl = document.getElementById("todoList");

    todosUl.addEventListener("click", event => {
      let elementClicked = event.target;

      if (elementClicked.className === "x") {
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });

    // Edit List Item
    todosUl.addEventListener("click", event => {
      let elementClicked = event.target;
      let position = elementClicked.parentNode.id;

      if (elementClicked.className === "edit") {
        let input = document.getElementById("textInput");

        input.disabled = false;
        input.className += " activeTextInput ";

        input.focus();
        input.select();

        input.addEventListener("keyup", event => {
          let elementClicked = event.target;

          if (event.keyCode === 13) {
            let textInput = input.value;
            input.disabled = true;
            input.classList.remove("activeTextInput");
            todoList.changeTodo(position, textInput);
          }
        });
      }
    });

    // Line through on check
    todosUl.addEventListener("click", event => {
      let elementClicked = event.target;
      let position = elementClicked.parentNode.id;
      let check = document.getElementById("checkbox");
      let myStorage = windows.localStorage;
      if (elementClicked.className === "checkbox") {
        todoList.toggleCompleted(position);
        check.checked = true;
      }
    });

    //Delete All
    let clearAll = document.getElementById("clearAll");

    clearAll.addEventListener("click", event => {
      todoList.todos.splice(0, todoList.todos.length);
      view.displayTodos();
    });

    // TODO Delete Selected
  }
};

view.setUpEventListeners();

// Store
localStorage.setItem("key", "value");
// Retrieve
document.getElementById("result").innerHTML = localStorage.getItem("value");
