const itemForm = document.querySelector('#item-form')
const itemInput = document.querySelector('#item-input')
const itemList = document.querySelector('#item-list')


const addItem = (e) => {
e.preventDefault();

const newItem = itemInput.value;
//validate input
if(newItem === ''){
    alert('please add items!');
    return;
}
//create list item
const li = document.createElement('li');
li.appendChild(document.createTextNode(newItem));

//create a seprate function for creating button with icon

const button = createButton('remove-item btn-link text-red');
li.appendChild(button);

itemList.appendChild(li);
itemInput.value = "";

}

//button creation:
const createButton = (classes) => {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);
    return button;
}

//icon creationn:
const createIcon = (classes) => {
const icon = document.createElement('i');
icon.className = classes;
return icon;

}

//event listener
itemForm.addEventListener('submit' , addItem);