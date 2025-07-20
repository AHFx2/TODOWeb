const form = document.querySelector(".main__feildContainer");
const container = document.querySelector(".main__todos");
let total = document.querySelector(".totalStats .number")
let rest = document.querySelector(".restStats .number");
let complete = document.querySelector(".completeStats .number");
form.addEventListener("submit", (e) => {
    e.preventDefault(); 
    let todo = document.querySelector(".main__feildContainer input[type=\"text\"]");
    if (todo.value.length > 0) {
        addTodo(todo)
    }
});

document.addEventListener("DOMContentLoaded", function () {
    loadTodosFromStoarageToPage();
});

function addTodo(todo) {
    const now = new Date();
    const todoContent = {

        fullDate: now.toLocaleDateString(),
        todoName: todo.value,
        formattedTime:  now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isChecked: false,
        id: Math.random().toString(16).slice(2)
    }
    addToContainer(fillTodoRecord(todoContent));
    saveInLocalStorage(todoContent);
}

function fillTodoRecord(todoContent) {
    let div = document.createElement('div');
    div.classList.add("todo", "--box", "flex-container");
    div.innerHTML =  `
                <div class="todo_trash"><i class="fa-solid fa-trash-can icon"></i></div>
                <div class="todo__content">
                    <p class="todo__name">${todoContent.todoName}</p>
                    <p class="todo__date">${todoContent.fullDate} - ${todoContent.formattedTime}</p>
                </div>
                <div class="todo__check">
                    <input type="checkbox" ${todoContent.isChecked ? "checked" : ""}>
                </div>`;
    
    deleteToDo(div, todoContent);
    return div;
}

function deleteToDo(todo, todoContent) {
    todo.querySelector(".todo_trash").addEventListener("click", () => {
        todo.remove();
        deleteToDoFromLocalStorage(todoContent);
        if (!IsContainerHasItem("todo"))
        {
            let emptyy = document.createElement("div");
            emptyy.classList.add("empty__todos", "--box");
            emptyy.innerHTML = `
                        لا توجد مهام. أضف مهمة جديدة للبدء!
            `;
            counter();
            container.appendChild(emptyy);
        }

        counter();

    });
}

function deleteToDoFromLocalStorage(todoContent) {
    window.localStorage.removeItem(`${todoContent.id}`);
}

function saveInLocalStorage(todoContent) {
    console.log(JSON.stringify(todoContent));
    window.localStorage.setItem(`${todoContent.id}`, JSON.stringify(todoContent));
}

function loadTodosFromStoarageToPage() {
    const localStorage = window.localStorage;
    for (let i = 0; i < localStorage.length; i++) {
        addToContainer(fillTodoRecord(JSON.parse(localStorage.getItem(localStorage.key(i)))));
    }
}

function addToContainer(todoNode) {
    let empty__element = document.querySelector(".empty__todos");
    if (container.contains(empty__element))
    {   
        empty__element.remove();
    }
    container.append(todoNode);
    counter();
}

function counter() {
    let todos = new Array();
    if (IsContainerHasItem("todo")) {
        todos = Array.from(container.children)
    }
    total.innerHTML = todos.length;
    complete.innerHTML = todos.length === 0 ? 0 : todos.filter((item) => item.querySelector("input[type=\"checkbox\"]").checked == true).length
    rest.innerHTML = parseInt(total.innerHTML) - parseInt(complete.innerHTML);
}

function IsContainerHasItem(itemClassName) {
    return container.contains(document.querySelector(`.${itemClassName}`));
}

function HandelActiveFilter() {

}