//select all elements

const todoAddForm = document.querySelector('#todoAddForm');
const todoNameAddInput = document.querySelector('#todoName');
const addCardBody = document.querySelector('#addCardBody');
const todoList = document.querySelector('.list-group');
const listCardBody = document.querySelector('#listCardBody');
const clearAllTodoButton = document.querySelector('#clearButton');

runEvents();

function runEvents() {
    todoAddForm.addEventListener("submit",addTodo);
}

function addTodo(e) {

    const inputText = todoNameAddInput.value.trim();
    if(inputText == null || inputText == ""){
        alert('Please enter a value');
    }else {
        //add todo to UI
        addTodoUI(inputText);
    }
    
    //add todo to storage


    e.preventDefault(); //We prevented it from redirecting to a different page
}

function addTodoUI(newTodo) {

    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between";
    li.textContent = newTodo;

    const a = document.createElement("a");
    a.href = "#"
    a.className= "delete-item";

    const i = document.createElement("i");
    i.className = "fa fa-remove";

    a.appendChild(i);
    li.appendChild(a);
    todoList.appendChild(li);

    todoNameAddInput.value = "";

}