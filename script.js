
const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const pendingText = document.getElementById("pendingText");
const clearBtn = document.getElementById("clearBtn");

// Local Storage save data
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// show the display
function showTodos() {

    todoList.innerHTML = "";

    todos.forEach((todo, index) => {

        const li = document.createElement("li");

        const span = document.createElement("span");
        span.innerText = todo.text;
        span.classList.add("todo-text");

        if (todo.completed) {
            span.classList.add("completed");
        }

        // add to completed list
        span.addEventListener("click", () => {

            todos[index].completed = !todos[index].completed;

            saveTodos();

        });

        // delete btn
        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "&#128465;";
        deleteBtn.classList.add("deleteBtn");

        deleteBtn.addEventListener("click", () => {

            todos.splice(index, 1);

            saveTodos();

        });

        li.appendChild(span);
        li.appendChild(deleteBtn);

        todoList.appendChild(li);

    });

    // add pending task
    const pending = todos.filter(todo => !todo.completed).length;

    pendingText.innerText = `You have ${pending} pending tasks`;

}

// Add new todo task
function addTodo() {

    const todoText = todoInput.value.trim();

    if (todoText === "") {
        alert("Please enter a todo!");
        return;
    }

    todos.push({
        text: todoText,
        completed: false
    });

    todoInput.value = "";

    saveTodos();

}

// Save todo
function saveTodos() {

    localStorage.setItem("todos", JSON.stringify(todos));

    showTodos();

}

// Add  button
addBtn.addEventListener("click", addTodo);

// Add Enter key
todoInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {
        addTodo();
    }

});

// Clear all todo task
clearBtn.addEventListener("click", () => {

    todos = [];

    saveTodos();

});

// Show todos
showTodos();






