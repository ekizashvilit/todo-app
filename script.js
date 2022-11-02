const theme =  document.getElementById('theme');
const newItemInput = document.getElementById('addItem');
const todoList = document.querySelector('.content ul');
const itemsLeft = document.querySelector('.items-left span');

itemsLeft.innerText = document.querySelectorAll('.list-item input[type="checkbox"]').length

// THEME SWITCHER
theme.addEventListener('click', () => {
    document.querySelector('body').classList = [theme.checked ? 'theme-light' : 'theme-dark'];
});

// ADD NEW ITEM
newItemInput.addEventListener('keypress', (e) => {
    if (e.charCode === 13 && newItemInput.value.length > 0) {
        createItem();
    }
});

function createItem () {
    if (newItemInput.value.length > 0) {
        createNewTodoItem(newItemInput.value);
        newItemInput.value = '';
    }
}

// CREATING NEW TODO ITEM
function createNewTodoItem(text) {
    const elem = document.createElement('li');
    elem.innerHTML = `
    <label class="list-item flex-row">
    <input type="checkbox" name="todoItem"/>
    <span class="checkmark"></span>
    <span class="text">${text}</span>
    </label>
    <span class="remove"></span>
    `;
    if(document.querySelector('.filter input[type="radio"]:checked').id === 'completed') {
        elem.classList.add('hidden');
    }
    todoList.append(elem);
    updateItemsCount(1);
};

// UPDATING ITEMS LEFT NUMBER
function updateItemsCount(number) {
    itemsLeft.innerText = +itemsLeft.innerText + number;
};

// REMOVES TODO ITEM
function removeTodoItem(elem) {
    elem.remove();
    updateItemsCount(-1);
};

todoList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove')) {
        removeTodoItem(event.target.parentElement);
    };
});

// CLEAR COMPLETED ITEMS
document.querySelector('.clear').addEventListener('click', () => {
    document.querySelectorAll('.list-item input[type="checkbox"]:checked').forEach(item => {
        removeTodoItem(item.closest('li'));
    });
});

// FILTER ITEMS
document.querySelectorAll('.filter input').forEach(radio => {
    radio.addEventListener('change', (e) => {
        filterTodoItems(e.target.id);
    });
});

function filterTodoItems(id) {
    const allItems = todoList.querySelectorAll('li');

    switch(id) {
        case 'all':
            allItems.forEach(item => {
                item.classList.remove('hidden');
            })
            break;
        case 'active':
            allItems.forEach(item => {
                item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');
            })
            break;
        default:
            allItems.forEach(item => {
                !item.querySelector('input').checked ? item.classList.add('hidden') : item.classList.remove('hidden');
            })
            break;
    };
};
