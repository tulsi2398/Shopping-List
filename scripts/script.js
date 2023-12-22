const itemForm = document.querySelector('#item-form')
const itemInput = document.querySelector('#item-input')
const itemList = document.querySelector('#item-list')
const clearBtn = document.querySelector('#clear')
let isEditMode = false;
const formBtn = itemForm.querySelector('button')

const filter = document.querySelector('#filter');

function displayItems() {
    const itemsfromStorage = getItemsFromStorage();
    itemsfromStorage.forEach((item) => {
        addItemToDOM(item);
    });
    checkUI();
}



const onItemSubmit = (e) => {
    e.preventDefault();

    const newItem = itemInput.value;
    //validate input
    if (newItem === '') {
        alert('please add items!');
        return;
    }

    //check edit mode
    if(isEditMode){ 
        const itemToEdit = itemList.querySelector('.edit-mode');
        //remove it from the storage
        removeItemFromStorage(itemToEdit.textContent)
        //remove edit-mode class
        itemToEdit.classList.remove('edit-mode');
        //remove from the DOM
        itemToEdit.remove();

        isEditMode = false
    }

    if(ifItemExist(newItem)){ 
        alert('that item already exist!');
        return;
    }

    addItemToDOM(newItem);
    addItemsToStorage(newItem);


    checkUI();
    itemInput.value = "";

}



function addItemToDOM(item) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));

    //create a seprate function for creating button with icon

    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

    itemList.appendChild(li);
}

function addItemsToStorage(item) {
    let itemsfromStorage = getItemsFromStorage();
    itemsfromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsfromStorage))
    
}

function getItemsFromStorage() {
    let itemsfromStorage;
    if (localStorage.getItem('items') === null) {
        itemsfromStorage = [];
    } else {
        itemsfromStorage = JSON.parse(localStorage.getItem('items'))
    }

    return itemsfromStorage;
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


function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItems(e.target.parentElement.parentElement);
    }else { 
        
        setItemToEdit(e.target);
    }
}

//check for duplicate items

function ifItemExist(item){ 
     const intemsFromStorage = getItemsFromStorage();
     return intemsFromStorage.includes(item);
}

function setItemToEdit(item){ 

    isEditMode = true;
    //all list item turns gray while i only want those items to turn gray which are being clicked
    itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode')) 
    item.classList.add('edit-mode');

    //change button's innerHtml
    formBtn.innerHTML = `<i class="fa-solid fa-pen"></i>  Update Item`;
    formBtn.style.backgroundColor = '#228B22'
    itemInput.value = item.textContent;
    
}
//event delegation : listen on the patent element and navigate to liste item and delete
const removeItems = (item) => {
    if(confirm('are you sure want to delete this item?')){
        //removing from DOM
        item.remove();

        //removing from storage
        removeItemFromStorage(item.textContent);
    }
    checkUI();

}
function removeItemFromStorage(item){
    let itemsfromStorage = getItemsFromStorage();
    itemsfromStorage = itemsfromStorage.filter((i) => i !== item);

    //reset storage array with this new items
    localStorage.setItem('items',JSON.stringify(itemsfromStorage))
}

const clearItems = () => {

    if (confirm('are you sure you want to delete all the ietms?')) {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
    }

    //clear from storage
    localStorage.removeItem('items')
    checkUI();
}
//when you clear all the items , you dont want to show  Filter field , and clear button 
const checkUI = () => {
    const items = itemList.querySelectorAll('li')
    if (items.length === 0) {
        clearBtn.style.display = 'none'
        filter.style.display = 'none'
    } else {
        clearBtn.style.display = 'block'
        filter.style.display = 'block'
    }

    formBtn.innerHTML = ` <i class = "fa-solid fa-plus"></i> Edit Item`;
    formBtn.style.backgroundColor = '#333';
    isEditMode = false;
}

const filterItems = (e) => {
    const items = itemList.querySelectorAll('li')
    const text = e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        //text has one letter at a time so i
        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex'
        } else {
            item.style.display = 'none'
        }
    })
}



//event listeners : instead of keeping all events in global scope, wrap them in initial function..

function init() {
    itemForm.addEventListener('submit', onItemSubmit);
    itemList.addEventListener('click', onClickItem);
    clearBtn.addEventListener('click', clearItems);
    filter.addEventListener('input', filterItems);
    document.addEventListener('DOMContentLoaded', displayItems)

    checkUI();
    //localStorage.clear();
}

init();
