//Intailising objects....
var id=0;
var document = document;
var currentIndex=0;
var currentTask;
var currentTodoIndex;
var currentTodo;
var myList = [];


function todoList(id, name, listOfToDo){
    this.id=id;
    this.name=name;
    this.listOfToDo=listOfToDo;
};

function todo(isChecked, text, isImportant){
    this.isChecked=isChecked;
    this.text=text;
    this.isImportant=isImportant;
};

function init() {
    getElement("side-menu")[0].addEventListener("click" , toggleSideMenu);
    getElement("add-new-list")[0].addEventListener("click" , addNewList);
    getElement("add-more-text")[0].addEventListener("click" , showAddBotton);
    getElement("add-button")[0].addEventListener("click" , addToDo);
    getElement("todo-star-icon")[0].addEventListener("click" , makeImportant);
    getElement("my-list-name")[0].addEventListener("keyup" ,getTodoListName);
}
init();

function changeStyleByClass(className, style, value){
    getElement(className)[0].style=style+":"+value+";";
}

function getElement(className) {
    return document.getElementsByClassName(className);
}

function createHTMLElement(elementType, className, event, eventFuction, useCapture){
    var htmlElement = document.createElement(elementType);
    htmlElement.className=className;
    if(event!=null && eventFuction!=null) {
       htmlElement.addEventListener(event, eventFuction,useCapture);
    }
    return htmlElement;
}

function addNewList() {
    var list = createHTMLElement("div", "mylist", "click", showTodoList, false);
    var listIcon = createHTMLElement("i","fa fa-list-ul icon");
    var listtext = createHTMLElement("div" ,"list-text");
    list.appendChild(listIcon);
    list.appendChild(listtext);
    console.log("adding new List");
    var todolist = new todoList(id++, "untitled("+id+")...", []);
    listtext.innerHTML=todolist.name;

   getElement("My-List")[0].appendChild(list);
    getElement("my-list-name")[0].placeholder = todolist.name;
    myList.push(todolist);
    currentInedx=id-1;
    currentTask=myList[id-1];
    getElement("list")[0].innerHTML="";
    console.log(myList);
}

function showTodoList(event) {
    var target;
    if(event.target.className==="mylist"){
        target = event.target;
    } else {
        target = event.target.parentNode;
    }
    console.log(target);
    currentIndex = [].indexOf.call(getElement("mylist"), target);
    console.log(currentIndex);
    currentTask = myList[currentIndex];
    console.log(currentTask);
    console.log("showtodolist.................");
    getElement("my-list-name")[0].value = currentTask.name;
    var todoList = currentTask.listOfToDo;
    var todoHTML="";
    if (todoList.lenght!=0) {
        for (var i= 0;i < todoList.length; i++) {
            todoHTML+=createTodoHTMl(todoList[i]);
        } 
    } 
    getElement("list")[0].innerHTML=todoHTML;  
}

function createTodoHTMl(todoList) {
    var task = "<div class='write-todo'>";
        if(todoList.isChecked) {
            task+="<i class='fa fa-check-circle todo-completed'></i>";
        } else {
            task+="<i class='fa fa-circle-thin todo-completed'></i>";
        }
            task+="<div class='todo-text'>"+todoList.text+"</div>";
        if(todoList.isImportant) {
            task+="<i class='fa fa-star todo-important'></i>";
        } else {
            task+="<i class='fa fa-star-o todo-important'></i>";
        }    
        task+="</div>"
        return task;
}



function showAddBotton() {
     getElement("add-button")[0].style.display="inline-block";
     getElement("add-icon")[0].style.display="none";
     getElement("todo-complete")[0].style.display="inline-block";
}

function createTodo(toDoData) {
    console.log("create do......");
    console.log(toDoData);
    var todo=createHTMLElement("div", "write-todo", "click", showRightNav);
    var completedIcon =createHTMLElement("i", "fa fa-circle-thin todo-completed", "click", checked);
    var toDoText=createHTMLElement("div","todo-text");
    var importantIcon =createHTMLElement("i", "fa fa-star-o todo-important", "click", makeImportant);
    toDoText.innerHTML=toDoData.text;
    todo.appendChild(completedIcon);
    todo.appendChild(toDoText);
    todo.appendChild(importantIcon);
    getElement("to-Do")[0].remove();
    return todo;
}

function addToDo() {
     var toDoData;
     var newTodo;
     var toDo;
     getElement("add-button")[0].style.display="none";
     getElement("add-icon")[0].style.display="inline-block";
     getElement("todo-complete")[0].style.display="none";
     getElement("list")[0].style.display="block";
     toDoData = new todo(false, getElement("add-more-text")[0].value, false);
     newTodo = createTodo(toDoData);
     currentTask.listOfToDo.push(toDoData);
     getElement("list")[0].appendChild(newTodo);
     getElement("add-more-text")[0].value="";
     console.log(myList);
}

function checked(event) {
     console.log(event.target);
     var parent = event.target.parentNode;
     var child = parent.childNodes;
     var content = child[0];
     currentTodoIndex = [].indexOf.call(getElement("write-todo"), parent); 
     currentTodo = currentTask.listOfToDo[currentTodoIndex];
     console.log(currentTodoIndex);
     if(content.classList.contains("fa-circle-thin")){
        currentTodo.isChecked =true;
        console.log("marked as checked");
        getElement("todo-content-icon")[0].classList.replace("fa-circle-thin", "fa-check-circle");
        content.classList.replace("fa-circle-thin", "fa-check-circle");
        child[1].style="text-decoration:line-through;";
     } else {
        currentTodo.isChecked =false;  
        content.classList.remove("fa-check-circle");
        content.classList.add("fa-circle-thin");
        getElement("todo-content-icon")[0].classList.replace("fa-check-circle", "fa-circle-thin");
        child[1].style="text-decoration:none;";
     }

}

function showRightNav(event) {
    var content = event.target.parentNode;
    var child =content.childNodes;
    getElement("mid-content")[0].style="width:54.5%;"
    getElement("right-sidenav")[0].style.display="inline-block";
    getElement("todo-content-text")[0].innerHTML = child[1].textContent;
    var content = child[2];
    if(content.classList.contains("fa-star-o")) {
       getElement("todo-star-icon")[0].classList.replace( "fa-star","fa-star-o");
    }
    content = child[0];
    if(content.classList.contains("fa-check-circle")) {
       getElement("todo-completed")[0].classList.replace("fa-circle-thin", "fa-check-circle");
    }
 }

function makeImportant(event) {
  var parent = event.target.parentNode;
  var child = parent.childNodes;
  var content = child[2];
  currentTodoIndex = [].indexOf.call(getElement("write-todo"), parent); 
  currentTodo = currentTask.listOfToDo[currentTodoIndex];
  console.log(currentTodoIndex);
  if(content.classList.contains("fa-star-o")){
     currentTodo.isImportant=true; 
     content.classList.replace("fa-star-o", "fa-star");
     getElement("todo-star-icon")[0].classList.replace("fa-star-o", "fa-star");
  } else {
     content.classList.remove("fa-star");
     content.classList.add("fa-star-o");
     currentTodo.isImportant=; 
     getElement("todo-star-icon")[0].classList.replace("fa-star", "fa-star-o");
  }
}


function toggleSideMenu() {
    var flag=0;
    var sideMenu = getElement("side-menu-text");
    for(var i=0; i<sideMenu.length; i++) {
        var content = sideMenu[i];
        if (content.style.display === "none") {
             changeStyleByClass("side-navbar", "width", "20%");
             changeStyleByClass("mid-content", "width", "79.5%");
             flag=1;
        } else {
             content.style.display = "none";
             changeStyleByClass("side-navbar", "width", "3%");
             changeStyleByClass("mid-content", "width", "96.5%");
             changeStyleByClass("add-new-text", "display", "none")
        }
    }

    var list = getElement("list-text");
    for(var i=0; i<list.length; i++) {
        var content = list[i];
        if (content.style.display === "none") {
             flag=1;
        } else {
             content.style.display = "none";
        }
    }

    //needs code reusability...
    setTimeout(function(){
       for(var i=0; i<list.length; i++) {
       var content = list[i];
        if(flag==1) {
            content.style.display = "inline";
        }
    } }, 300);

    setTimeout(function(){
       for(var i=0; i<sideMenu.length; i++) {
       var content = sideMenu[i];
        if(flag==1) {
            content.style.display = "inline";
            getElement("add-new-text")[0].style="display:inline-block";
        }
    } }, 300);
}