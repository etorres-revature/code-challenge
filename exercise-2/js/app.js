const init = () => {
  const taskInput = document.getElementById("new-task");
  const addButton = document.getElementsByTagName("button")[0];
  const incompleteTasksHolder = document.getElementById("incomplete-tasks");
  const completedTasksHolder = document.getElementById("completed-tasks");

  const createNewTaskElement = (taskString, arr) => {
    listItem = document.createElement("li");
    checkBox = document.createElement("input");
    label = document.createElement("label");
    editInput = document.createElement("input");
    editButton = document.createElement("button");
    deleteButton = document.createElement("button");

    checkBox.type = "checkbox";
    editInput.type = "text";
    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    label.innerText = taskString;

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
  };

  const addTask = () => {
    let listItemName = taskInput.value;
    if (listItemName === "") {
      alert("Please enter a task");
    } else {
      listItem = createNewTaskElement(listItemName);
      incompleteTasksHolder.appendChild(listItem);
      bindTaskEvents(listItem, taskCompleted);
      taskInput.value = "";
    }

    addToLocalStorage(listItemName);
  };

  var editTask = function () {
    const listItem = this.parentNode;
    const editInput = listItem.querySelectorAll("input[type=text")[0];
    const label = listItem.querySelector("label");
    const button = listItem.getElementsByTagName("button")[0];

    const containsClass = listItem.classList.contains("editMode");

    if (containsClass) {
      label.innerText = editInput.value;
      button.innerText = "Edit";
    } else {
      editInput.value = label.innerText;
      button.innerText = "Save";
    }

    listItem.classList.toggle("editMode");
  };

  var deleteTask = function (el) {
    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    ul.removeChild(listItem);
  };

  var taskCompleted = function (el) {
    const listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
  };

  var taskIncomplete = function () {
    const listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
  };

  var bindTaskEvents = function (taskListItem, checkBoxEventHandler, cb) {
    var checkBox = taskListItem.querySelectorAll("input[type=checkbox]")[0];
    var editButton = taskListItem.querySelectorAll("button.edit")[0];
    var deleteButton = taskListItem.querySelectorAll("button.delete")[0];
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    checkBox.onchange = checkBoxEventHandler;
  };

  var addToLocalStorage = function (todo) {
    let todos;
    console.log("you are in local storage");
    if (localStorage.getItem("todos") === null) {
      todos = [];
      todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(todos));
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
      todos.push(todo);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  };

  var getFromLocalStorage = function () {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
  };

  let savedTodos = getFromLocalStorage();
  for (let i = 0; i < savedTodos.length; i++) {
    let newSavedTodosElement = createNewTaskElement(savedTodos[i]);
    incompleteTasksHolder.appendChild(newSavedTodosElement);
  }

  addButton.addEventListener("click", (event) => {
    event.preventDefault();
    addTask();
  });

  for (var i = 0; i < incompleteTasksHolder.children.length; i++) {
    bindTaskEvents(incompleteTasksHolder.children[i], taskCompleted);
  }

  for (var i = 0; i < completedTasksHolder.children.length; i++) {
    bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
  }
};

init();
