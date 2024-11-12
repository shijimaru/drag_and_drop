const columns = document.querySelectorAll('.column');

function addTask(columnId) {
    const taskTitle = prompt("Введите название задачи:");
    if (taskTitle) {
        const task = document.createElement("div");
        task.className = 'task';
        task.innerText = taskTitle;

        task.setAttribute('draggable', 'true');
        task.addEventListener('dragstart', dragStart);
        
        document.getElementById(columnId).querySelector('.task-container').appendChild(task);
    }
}

function dragStart(e) {
    e.dataTransfer.setData('object', e.target.innerText);
}

columns.forEach(column => {
    column.addEventListener('dragover', dragOver);
    column.addEventListener('drop', drop);
});

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    const taskTitle = e.dataTransfer.getData('object');

    const newTask = document.createElement("div");
    newTask.className = 'task';
    newTask.innerText = taskTitle;

    newTask.setAttribute('draggable', 'true');
    newTask.addEventListener('dragstart', dragStart);

    const taskContainer = e.target.querySelector('.task-container');
    if (taskContainer) {
        taskContainer.appendChild(newTask);
        
        const draggedElement = Array.from(document.getElementsByClassName('task')).find(task => task.innerText === taskTitle);
        if (draggedElement) {
            draggedElement.remove();
        }
    }
}