// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// Functions
function todosExist(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function saveTodos(todo){
    let todos = todosExist();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos(e){
    let todos = todosExist();
    todos.forEach(function(todo){
        e.preventDefault();
        // todo div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // li
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todo;
        todoDiv.appendChild(newTodo);
        // check mark 
        const completedButton = document.createElement('button');
        completedButton.classList.add('complete-btn');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        todoDiv.appendChild(completedButton);
        // trash button
        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-btn');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        todoDiv.appendChild(trashButton);
        // append to list
        todoList.appendChild(todoDiv);
    })
}

function removeTodos(todo){
    let todos = todosExist();
    const todoText = todo.children[0].innerText;

    todos.splice(todos.indexOf(todoText), 1);
    localStorage.setItem("todos", JSON.stringify(todos));

}

function addTodo(event){
    // prevents form submission
    event.preventDefault();
    // todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // li
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    todoDiv.appendChild(newTodo);
    // add todo to local storage
    saveTodos(todoInput.value);
    // check mark 
    const completedButton = document.createElement('button');
    completedButton.classList.add('complete-btn');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    todoDiv.appendChild(completedButton);
    // trash button
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    todoDiv.appendChild(trashButton);
    // append to list
    todoList.appendChild(todoDiv);
    // clear input value
    todoInput.value = '';
}

function deleteCheck(e){
    const item = e.target;
    // delete item
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add('fall');
        removeTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });

    }
    // mark as complete
    else if(item.classList[0] === 'complete-btn'){
        item.parentElement.classList.toggle('completed');
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    
    todos.forEach(function(todo){
        const optionVal = e.target.value;
        switch(optionVal){
            case "all":
                    todo.style.display = "flex";
                    break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;  
        }
    })
}


