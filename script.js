document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load tasks from Local Storage on page load
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don’t save again
    }

    // Save tasks array to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Add a new task to the list and optionally save it to Local Storage
    function addTask(taskText, save = true) {
        // Prevent adding empty tasks
        if (taskText.trim() === "") {
            alert("Please enter a task.");
            return;
        }

        // Create list item
        const li = document.createElement("li");
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.classList.add("remove-btn");

        // Remove task on button click and update Local Storage
        removeBtn.onclick = function () {
            taskList.removeChild(li);
            if (save) {
                const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
                const updatedTasks = tasks.filter(task => task !== taskText);
                saveTasks(updatedTasks);
            }
        };

        // Append remove button and list item
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Clear input if this is a new user input task
        if (save) {
            taskInput.value = "";
            // Save task to Local Storage
            const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            tasks.push(taskText);
            saveTasks(tasks);
        }
    }

    // Event listener for add button click
    addButton.addEventListener("click", () => {
        addTask(taskInput.value);
    });

    // Event listener for Enter key press in input field
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask(taskInput.value);
        }
    });

    // Initialize by loading saved tasks
    loadTasks();
});
