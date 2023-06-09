// Task list array to store tasks
let taskList = [];
let taskId = 1;
let selectedTaskId = null;

// Function to add a task to the list
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskName = taskInput.value.trim();

    if (taskName !== '') {
        const task = {
            id: taskId++,
            name: taskName,
            completed: false,
            priority: false
        };

        taskList.push(task);
        taskInput.value = '';
        displayTasks();
    }
}

// Function to display tasks in the list
function displayTasks() {
    const taskListElement = document.getElementById('taskList');
    taskListElement.innerHTML = '';

    for (let i = 0; i < taskList.length; i++) {
        const task = taskList[i];
        const listItem = document.createElement('li');
        listItem.classList.add('task-item');
        listItem.draggable = true;

        const itemName = document.createElement('span');
        itemName.classList.add('item-name');
        itemName.innerHTML = `${task.id}. ${task.name}`;
        listItem.appendChild(itemName);


        listItem.addEventListener('dragstart', function(event) {
            event.dataTransfer.setData('text/plain', i);
        });
        listItem.addEventListener('dragover', function(event) {
            event.preventDefault();
        });
        listItem.addEventListener('drop', function(event) {
            const sourceIndex = event.dataTransfer.getData('text/plain');
            const targetIndex = i;
            swapTasks(sourceIndex, targetIndex);
            reassignTaskIds();
            displayTasks();
        });

        listItem.innerHTML = `
      <span class="${task.completed ? 'completed' : ''} ${task.priority ? 'high-priority' : ''}">
        ${task.id}. ${task.name}
      </span>
      <div class="button-group">
      <button class="completeBtn" onclick="toggleComplete(${i})">
      <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 -960 960 960" width=""><path d="M294-242 70-466l43-43 181 181 43 43-43 43Zm170 0L240-466l43-43 181 181 384-384 43 43-427 427Zm0-170-43-43 257-257 43 43-257 257Z"/></svg>Completed</button>
      <button class="priorityBtn" onclick="togglePriority(${i})"><script src="https://cdn.lordicon.com/bhenfmcm.js"></script>
      <lord-icon
          src="https://cdn.lordicon.com/mxzuvjjs.json"
          trigger="click"
          colors="primary:#121331"
          style="width:20px;height:20px">
      </lord-icon>Priortize</button>
      <button class="swapBtn" onclick="swapask(${i})">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="30" height="30">
  <path d="M19 9l-7 7-7-7" />
  <path d="M5 15l7-7 7 7" />
</svg>Swap
</button>
<div>
    `;

        taskListElement.appendChild(listItem);
    }
}
// Function to toggle task completion
function toggleComplete(index) {
    taskList[index].completed = !taskList[index].completed;
    displayTasks();
}

// Function to toggle task priority
function togglePriority(index) {
    taskList[index].priority = !taskList[index].priority;
    displayTasks();
}

// Function to swap tasks in the list
function swapTasks(sourceIndex, targetIndex) {
    const temp = taskList[sourceIndex];
    taskList[sourceIndex] = taskList[targetIndex];
    taskList[targetIndex] = temp;
}

// Function to reassign task IDs based on their order
function reassignTaskIds() {
    for (let i = 0; i < taskList.length; i++) {
        taskList[i].id = i + 1;
    }
}

function filterTasks() {
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput.value.toLowerCase();
    const taskListElement = document.getElementById('taskList');
    const tasks = taskListElement.getElementsByTagName('li');

    for (let i = 0; i < tasks.length; i++) {
        const taskName = tasks[i].querySelector('span').textContent.toLowerCase();
        if (taskName.includes(searchQuery)) {
            tasks[i].style.display = '';
        } else {
            tasks[i].style.display = 'none';
        }
    }
}

// Event listener for add task button
document.getElementById('addTaskBtn').addEventListener('click', addTask);

// Event listener for enter key press
document.getElementById('taskInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Event listener for search input
document.getElementById('searchInput').addEventListener('input', filterTasks);
// Event listener for enter key press
document.getElementById('searchInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        filterTasks();
    }
});