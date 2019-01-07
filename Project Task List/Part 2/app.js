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
        }
    }
}

//Clear Tasks at once
function clearTasks(e){
   // taskList.innerHTML = '';

   //Faster
   while(taskList.firstChild){
       taskList.removeChild(taskList.firstChild);
   }
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