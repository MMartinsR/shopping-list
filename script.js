const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');  // ul
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


function addItem(e) {
    e.preventDefault(); // Stops the form submiting to the page

    const newItem = itemInput.value;

    // Validate Input
    if (newItem === '') {
        alert('Please add an item');
        return;
    }

    // Create list item
    const li = document.createElement('li');
    const button = createButton('remove-item btn-link text-red');

    li.appendChild(document.createTextNode(newItem));    
    li.appendChild(button);

    // Add li to the DOM
    itemList.appendChild(li);

    checkUI();

    itemInput.value = '';

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
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);

checkUI();