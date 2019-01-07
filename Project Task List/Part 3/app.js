//Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//  Load all event listeners
loadEventListeners();

//  Load all event listeners
function loadEventListeners(){
    //Add task event
    form.addEventListener('submit', addTask);

    //Remove task event
    taskList.addEventListener('click', removeTask);

    //Clear task event
    clearBtn.addEventListener('click', clearTasks);

    //Filter task event
    filter.addEventListener('keyup', filterTasks);

    //DOM load event - for displaying task after being persistent
    document.addEventListener('DOMContentLoaded', getTasks);

}

//  Add task
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }

    //create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    
    //create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);

    //  Store in Local Storage
    storeTaskInLocalStorage();

    //console.log(li);

    //Clear Input
    taskInput.value = '';
    e.preventDefault();
}


//Remove task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
    //console.log(e.target);
        if(confirm('Are you sure?')){
            e.target.parentElement.parentElement.remove();

            //REmove from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Clear Tasks at once
function clearTasks(e){
   // taskList.innerHTML = '';

   //Faster
   while(taskList.firstChild){
       taskList.removeChild(taskList.firstChild);
   }

   //Clear from LS
   clearTaskfromLocalStorage();
}

//Filter Tasks
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    })
}

function storeTaskInLocalStorage(task){

    //first check for existing tasks
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];        
    }else{
        task = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}


//GET tasks from Local Storage
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task){
        //create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    
    //create new link element
    const link = document.createElement('a');
    //Add class
    link.className = 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    //append the link to li
    li.appendChild(link);

    //Append li to ul
    taskList.appendChild(li);
    })
}

//Clear from LS
function clearTaskfromLocalStorage(){
    //clear everything
    localStorage.clear();      
}
