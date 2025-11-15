// ============ HUNT ELEMENTS FROM DOCUMENT ============ //
const filterAll = document.getElementById("all");
const filterActive = document.getElementById("active");
const filterCompleted = document.getElementById("completed");
const clearCompleted = document.getElementById("clear-completed-btn") ?
document.getElementById("clear-completed-btn") : null; // this button will be removed in mobile so this check to avoid error 

const todoLeft = document.querySelector("#items-left span")

const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");

// empty array to store the tasks
let todoArray = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : [];

// ============ CREATE TODO FUNCTION ============ //
function createTodo() {
    let todoInpValue = todoInput.value;

    if(todoInpValue !== "") {

        todoArray.push(todoInpValue.toLowerCase());
        localStorage.setItem("todoList", JSON.stringify([...new Set(todoArray)])); // avoid repeated tasks

        displayTodo(todoArray);
        todoInput.value = ""
    }
}

// ============ DISPLAY TODO ELEMENT FUNCTION ============ //
function displayTodo(arr) {
    let uniqueArr = [...new Set(arr)]
    todoList.innerHTML = "";
    uniqueArr.map((item, index) => {

        // create li
        const li = document.createElement("li");
        li.classList.add("todo-item");
        li.dataset.index = index;

        // check circle
        const div = document.createElement("div");
        div.classList.add("check-circle");
        const checkIcon = document.createElement("img");
        checkIcon.src = "./images/icon-check.svg";
        checkIcon.alt = "check icon";
        div.appendChild(checkIcon);
        div.addEventListener("click",()=>{
            li.classList.toggle("checked")
        })

        // task span
        const span = document.createElement("span");
        span.classList.add("task");
        span.innerHTML = item;

        // delete button
        const button = document.createElement("button");
        button.classList.add("del-btn");
        button.dataset.index = index;
        const crossIcon = document.createElement("img");
        crossIcon.src = "./images/icon-cross.svg";
        crossIcon.alt = "cross icon";
        button.appendChild(crossIcon);

        // add elements in todo item
        li.appendChild(div);
        li.appendChild(span);
        li.appendChild(button);

        todoList.appendChild(li);

    });

    todoLeft.innerHTML = todoArray.length;

    deleteTodo()

}
displayTodo(todoArray);

// ============ DELETE TODO FUNCTION ============ //
function deleteTodo() {
    if(todoArray.length > 0) {

        const delBtns = document.querySelectorAll(".del-btn");
        delBtns.forEach(btn => {
            btn.addEventListener("click",()=>{

                todoArray.splice(btn.dataset.index,1);
                localStorage.setItem("todoList",JSON.stringify(todoArray));

                displayTodo(todoArray)

            })
        })

    }
}
// ============ FILTER COMPLETED TODO FUNCTION ============ //
function filterCompletedTodo() {
    const todoListItems = document.querySelectorAll("#todo-list .todo-item");
    todoListItems.forEach((item) => {
        if(!item.classList.contains("checked")) item.style.display = "none";
        else item.style.display = "flex";
    })
}
filterCompleted.addEventListener("click", filterCompletedTodo);

// ============ FILTER ACTIVE TODO FUNCTION ============ //
function filterActiveTodo() {
    const todoListItems = document.querySelectorAll("#todo-list .todo-item");
    todoListItems.forEach(item => {
        if(item.classList.contains("checked")) item.style.display = "none";
        else item.style.display = "flex";
    })
}
filterActive.addEventListener("click",filterActiveTodo)

// ============ FILTER ALL TODO FUNCTION ============ //
function filterAllTodo() {
    displayTodo(todoArray);
}
filterAll.addEventListener("click",filterAllTodo)

// ============ CLEAR COMPLETED TODO FUNCTION ============ //
function clearCompletedTodo() {
    let todoListItems = Array.from(document.querySelectorAll("#todo-list .todo-item"));
    todoListItems = todoListItems.filter(it => it.classList.contains("checked"));
    todoListItems.map(it => {
        todoArray.splice(it.dataset.index,1);
        localStorage.setItem("todoList", JSON.stringify(todoArray));
    })
    displayTodo(todoArray);
}
clearCompleted.addEventListener("click", clearCompletedTodo)

document.addEventListener("keyup",(event) => {
    if(event.key === "Enter") createTodo();
})