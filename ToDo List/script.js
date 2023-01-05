window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const nameInput = document.querySelector("#name");
  const newTodoForm = document.querySelector("#new-todo-form");

  //getting username
  const username = localStorage.getItem("username") || "";
  nameInput.value = username;

  //setting username
  nameInput.addEventListener("change", (e) => {
    localStorage.setItem("username", e.target.value);
  });

  //Displaying previous ToDo's
  DisplayTodos();

  //////////////////////////////////////////////////////////////////////////////////////////////

  //When submit button( ADD-to here) is clicked
  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    //Checking if content and category is not empty
    //if (todo.content !== "" && todo.category !== "") {
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));

    e.target.reset();
    //}

    DisplayTodos();
  });
});

function DisplayTodos() {
  const todoList = document.querySelector("#todo-list");

  todoList.innerHTML = "";
  todos
    .sort((a, b) => b.createdAt - a.createdAt)
    .forEach((todo) => {
      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-item");

      const label = document.createElement("label");
      const input = document.createElement("input");
      const span = document.createElement("span");
      const content = document.createElement("div");
      const actions = document.createElement("button");
      const edit = document.createElement("button");
      const deleteButton = document.createElement("button");

      console.log(todos.sort());

      input.type = "checkbox";
      input.checked = todo.done;
      span.classList.add("bubble");

      if (todo.category == "personal") {
        span.classList.add("personal");
      } else {
        span.classList.add("bussiness");
      }

      content.classList.add("todo-content");
      actions.classList.add("actions");
      edit.classList.add("edit");
      deleteButton.classList.add("delete");

      content.innerHTML = `<input type='text' value="${todo.content}" readonly>`;

      edit.innerHTML = "Edit";
      deleteButton.innerHTML = "Delete";

      label.appendChild(input);
      label.appendChild(span);
      actions.appendChild(edit);
      actions.appendChild(deleteButton);
      todoItem.appendChild(label);
      todoItem.appendChild(content);
      todoItem.appendChild(actions);

      todoList.appendChild(todoItem);

      //Checked Line( when clicking to circle)
      if (todo.done) {
        todoItem.classList.add("done");
      }

      input.addEventListener("click", (e) => {
        todo.done = e.target.checked;
        localStorage.setItem("todos", JSON.stringify(todos));

        if (todo.done) {
          todoItem.classList.add("done");
        } else {
          todoItem.classList.remove("done");
        }

        DisplayTodos();
      });

      //Edit
      edit.addEventListener("click", (e) => {
        const input = content.querySelector("input");
        input.removeAttribute("readonly");
        input.focus();
        input.addEventListener("blur", (e) => {
          input.setAttribute("readonly", true);
          todo.content = e.target.value;
          localStorage.setItem("todos", JSON.stringify(todos));
          DisplayTodos();
        });
      });

      //Delete
      deleteButton.addEventListener("click", (e) => {
        todos = todos.filter((t) => t != todo);
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodos();
      });
    });
}
