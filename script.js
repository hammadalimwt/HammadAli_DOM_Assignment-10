let taskInput = document.getElementById("taskInput");
let addTask = document.getElementById("addTask");
let taskList = document.getElementById("taskList");
let clearAll = document.getElementById("clearAll");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    let li = document.createElement("li");

    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    li.addEventListener("click", () => {
      task.completed = !task.completed;

      saveTasks();

      renderTasks();
    });

    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";

    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      tasks = tasks.filter((t, i) => i !== index);

      saveTasks();

      renderTasks();
    });

    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      let newText = prompt("Edit task:", task.text);

      if (newText) {
        task.text = newText;

        saveTasks();

        renderTasks();
      }
    });

    li.appendChild(editBtn);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });
}

addTask.addEventListener("click", () => {
  let text = taskInput.value.trim();

  if (text === "") return;

  tasks.push({
    text: text,
    completed: false,
  });

  taskInput.value = "";

  saveTasks();

  renderTasks();
});

clearAll.addEventListener("click", () => {
  tasks = [];

  saveTasks();

  renderTasks();
});

renderTasks();
