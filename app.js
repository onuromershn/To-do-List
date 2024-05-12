//select all elements

const todoAddForm = document.querySelector('#todoAddForm');
const todoNameAddInput = document.querySelector('#todoName');
const addCardBody = document.querySelector('#addCardBody');
const todoList = document.querySelector('.list-group');
const listCardBody = document.querySelector('#listCardBody');
const clearAllTodoButton = document.querySelector('#clearButton');

let todos = [];

runEvents();

function runEvents() {
    todoAddForm.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",pageLoaded); //when the page is loaded
    listCardBody.addEventListener("click",removeTodoToUI);
}

function pageLoaded() {
    checkTodosFromStorage();
    todos.forEach(function(todo){
        addTodoUI(todo);
    });
}

function removeTodoToUI(e) {
    if(e.target.className === "fa fa-remove"){
        //deleted screen
        const todo = e.target.parentElement.parentElement;
        console.log(todo);
        todo.remove();

        //deletede storage
        removeTodoToStorage(todo.textContent);
        
        showAlert("success","Todo deleted successfully")
    }
}

function removeTodoToStorage(removeTodo) {
    checkTodosFromStorage();
    todos.forEach(function (todo,index) {
       if(removeTodo === todo){
        todos.splice(index,1); //Finds the index of the value equal to the if condition and deletes 1 of them
       } 
    });
    localStorage.setItem("todos",JSON.stringify(todos));
}

function addTodo(e) {

    const inputText = todoNameAddInput.value.trim();
    if(inputText == null || inputText == ""){
        showAlert("warning","Please enter a value!")
    }else {
        //add todo to UI
        addTodoUI(inputText);
        //add todo to storage
        addTodoStorage(inputText);
        //show alert
        showAlert("success","Added to Todo list")
    }

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

function addTodoStorage(newTodo) {    
    checkTodosFromStorage();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
}

function checkTodosFromStorage() {
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
}

function showAlert(type, message) {
    const div = document.createElement("div");

    div.className = "alert alert-"+type + " mt-3";
    div.textContent = message;

    addCardBody.append(div);

    setTimeout(function(){
        div.remove();
    },2500);
}