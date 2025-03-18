
window.onload = function() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    

    tasks.forEach(displayTask);
};


document.getElementById("addTask")?.addEventListener("click", function () {
    if (validateForm()) {
        addTask();
    }
});


function addTask() {
    
    const tname = document.querySelector("#taskName").value;
    const tDescription = document.querySelector("#taskDescription").value;
    const tDate = document.querySelector("#taskDate").value;
    const tTime = document.querySelector("#taskTime").value;

    const task = { name: tname, description: tDescription, date: tDate, time: tTime };

   
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    
    displayTask(task);
}


function displayTask(task) {
    const taskContainer = document.getElementById('taskContainer');
    const card = document.createElement('div');
    card.classList.add('task-card');
    
    
    card.innerHTML = `
        <h3>${task.name}</h3>
        <div class="task-description">${task.description}</div>
        <p><strong>Due Date:</strong> ${task.date}</p>
        <p><strong>Due Time:</strong> ${task.time}</p>
    `;

    
    const removeButton = createRemoveButton(task, card);
    card.appendChild(removeButton);

   
    taskContainer.appendChild(card);
}


function createRemoveButton(task, card) {
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-btn');
    
    const icon = document.createElement('i');
    icon.classList.add('bi', 'bi-trash');  

   
    removeButton.appendChild(icon);


   
    removeButton.onclick = function() {
        card.remove();  

       
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        const taskIndex = tasks.findIndex(t => t.name === task.name && t.date === task.date && t.time === task.time);
        if (taskIndex > -1) {
            tasks.splice(taskIndex, 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    };

    return removeButton;
}


function validateForm() {
    const tname = document.querySelector("#taskName").value;
    const tDescription = document.querySelector("#taskDescription").value;
    const tDate = document.querySelector("#taskDate").value;
    const tTime = document.querySelector("#taskTime").value;

    if (!tname || !tDescription || !tDate || !tTime) {
        alert("Please fill in all fields.");
        return false;
    }
    return true;
}
