const theme =  document.getElementById('theme');
const newItemInput = document.getElementById('addItem');
const todoList = document.querySelector('.content ul');
const itemsLeft = document.querySelector('.items-left span');

theme.addEventListener('click', () => {
    document.querySelector('body').classList = [theme.checked ? 'theme-light' : 'theme-dark'];
});

newItemInput.addEventListener('keypress', (e) => {
    if (e.charCode === 13 && newItemInput.value.length > 0) {
        createNewTodoItem(newItemInput.value);
        newItemInput.value = '';
    }
});

function createNewTodoItem(text) {
    const elem = document.createElement('li');

    elem.innerHTML = `
    <label class="list-item">
    <input type="checkbox" name="todoItem"/>
    <span class="checkmark"></span>
    <span class="text">${text}</span>
    </label>
    <span class="remove"></span>
    `;

    todoList.append(elem);
    updateItemsCount(1);
};

function updateItemsCount(number) {
    itemsLeft.innerText = +itemsLeft.innerText + number;
};

function removeTodoItem(elem) {
    elem.remove();
    updateItemsCount(-1);
};

todoList.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove')) {
        removeTodoItem(event.target.parentElement);
    }
})