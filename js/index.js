var inp = document.getElementById('todo-inp');
var addBtn = document.getElementById('add');

var todoUl = document.getElementById('todo-list');

var all = document.getElementById('All');
var active = document.getElementById('active');
var completed = document.getElementById('completed');
var toggleAll = document.getElementById('toggle-all');

var todoList = [];
let id = 0;

addBtn.addEventListener('click', function () {
    const item = {
        title: inp.value,
        id: id,
        completed: false,
    };
    todoList.push(item);
    id++;
    render(todoList);
});

all.addEventListener('click', function (){
    render(todoList);
})

completed.addEventListener('click', function (){
    todoList.forEach(obj => {
        obj.completed = true;
    })
    render(todoList)
})

toggleAll.addEventListener('click', function (){
    if (oneCompleted(todoList)){
        todoList.forEach(obj => {
            obj.completed = true
        })
    } else {
        todoList.forEach(obj => {
            obj.completed = false
        })
    }
    render(todoList)
})

active.addEventListener('click', function (){
    var newList = todoList.filter(obj => {
        return !obj.completed
    })
    render(newList)
})


function oneCompleted(list) {
    for (obj of list) {
        if (obj.completed === false) {
            return true
        }
    }
}

function findById(id) {
    for (obj of todoList){
        if (obj.id === id){
            return obj
        }
    }
}

function render(list) {
    todoUl.innerHTML = '';
    list.forEach((obj) => {
        let item = document.createElement("LI");
        item.className = "todo-items";
        item.id = obj.id;

        var checkBox = document.createElement("INPUT");
        checkBox.setAttribute("type", "checkbox");
        checkBox.className = "check-box";
        checkBox.id = 'chekBox-' + obj.id
        let x = document.createElement("BUTTON");
        x.innerText = "x";
        x.className = "remove-item";

        x.addEventListener('click', function (ev) {
            var objToDelete = findById(obj.id)
            todoList = todoList.filter(obj => {
                return obj !== objToDelete
            })
            render(todoList)
        });

        checkBox.addEventListener("click", function (ev) {
            var objToUpdate = findById(obj.id)
            todoList.map(obj => {
                if (obj === objToUpdate){
                    obj.completed = !obj.completed
                }
                return obj
            })
            render(todoList)
        });




        if (obj.completed) {
            checkBox.checked = true;
            item.classList.add('del-text');
        } else {
            checkBox.checked = false;
            item.classList.remove('del-text');

        }

        var newTodo = document.createTextNode(obj.title);
        item.appendChild(checkBox);
        item.appendChild(newTodo);
        item.appendChild(x);


        todoUl.appendChild(item);

    })
}
