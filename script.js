const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');  // ul
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


function onAddItemSubmit(e) {
    e.preventDefault(); // Stops the form submiting to the page

    const newItem = itemInput.value;

    // Validate Input
    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    // Create item DOM element
    addItemToDOM(newItem);
    
    // Add item to local storage
    addItemToStorage(newItem);

    checkUI();

    itemInput.value = '';
}

function addItemToDOM(item) {
    // Create list item
    const li = document.createElement('li');
    const button = createButton('remove-item btn-link text-red');

    li.appendChild(document.createTextNode(item));    
    li.appendChild(button);

    // Add li to the DOM
    itemList.appendChild(li);
}

function addItemToStorage(item) {
    let itemsFromStorage;

    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    // Adding new item to array
    itemsFromStorage.push(item);

    // Convert to JSON string and set to localStorage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;

    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);

    return button;
}

function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;

    return icon;
}

function removeItem(e) {
    if(e.target.parentElement.classList.contains('remove-item')) {  // button
        // Confirm is a function to prompt a confirmation to the user, and its returns true or false depending on the user answer
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove() // li  
            checkUI();          
        }
    }
}

function clearItems() {

    if (confirm('Are you sure?')) {
        while(itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
        checkUI();
    }
}

function filterItems(e) {
    const items = itemList.querySelectorAll('li');
    const text = e.target.value.toLowerCase();

    items.forEach((item) => {
        const itemName = item.firstChild.textContent.toLowerCase();
        
        if(itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function checkUI() {
    const items = itemList.querySelectorAll('li');
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';        
    } else {
        clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
}

// Event Listeners
itemForm.addEventListener('submit', onAddItemSubmit);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

checkUI();