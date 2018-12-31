//REPLACE ELEMENT

//Create Element

const newHeading = document.createElement('h2');

//add id
newHeading.id = 'task-title';

//new text node
newHeading.appendChild(document.createTextNode('Task List'));


//Get old heading
const oldHeading = document.getElementById('task-title');

//Parent
const cardAction = document.querySelector('.card-action');

//Replace
cardAction.replaceChild(newHeading, oldHeading);


console.log(newHeading);
