// Get elements
const taskForm = document.getElementById("taskForm");
const tasksContainer = document.getElementById("tasksContainer");

// Load tasks when page loads
document.addEventListener("DOMContentLoaded", function () {
  loadTasks();
});

// Submit form
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("taskName").value.trim();
  const desc = document.getElementById("taskDesc").value.trim();
  const price = document.getElementById("taskPrice").value.trim();

  if (name === "" || desc === "" || price === "") {
    alert("Please fill all fields");
    return;
  }

  const task = { name, desc, price };

  // Save to localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Display
  loadTasks();

  taskForm.reset();
});

// Load tasks from LocalStorage
function loadTasks() {
  tasksContainer.innerHTML = "";

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(function (task, index) {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${task.name}</h3>
      <p>${task.desc}</p>
      <strong>₹ ${task.price}</strong>
      <br><br>
      <button onclick="deleteTask(${index})">Delete</button>
      <hr>
    `;
    tasksContainer.appendChild(div);
  });
}

// Delete task
function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  loadTasks();
}