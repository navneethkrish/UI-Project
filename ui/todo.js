function getElement(className) {
    return document.getElementsByClassName(className);
}

getElement("side-menu")[0].addEventListener("click" , toggleSideMenu);
function toggleSideMenu() {
    var flag=0;
    var sideMenu = getElement("side-menu-text");
    for(var i=0; i<sideMenu.length; i++) {
        var content = sideMenu[i];
        if (content.style.display === "none") {
             getElement("side-navbar")[0].style="width:20%;"
             getElement("mid-content")[0].style="width:79.5%;"
             flag=1;
        } else {
             content.style.display = "none";
             getElement("side-navbar")[0].style="width:3%;"
             getElement("mid-content")[0].style="width:96.5%;"
        }
    }
    setTimeout(function(){
       for(var i=0; i<sideMenu.length; i++) {
        var content = sideMenu[i];
        if(flag==1) {
            content.style.display = "inline";
        }
    } }, 300);
}

getElement("add-more-text")[0].addEventListener("click" , showAdd);
function showAdd() {
     getElement("add-button")[0].style.display="inline-block";
     getElement("add-icon")[0].style.display="none";
     getElement("todo-complete")[0].style.display="inline-block";
}

function createHTMLElement(elementType , className){
    var htmlElement = document.createElement(elementType);
    htmlElement.className=className;
    return htmlElement;
}

getElement("add-button")[0].addEventListener("click" , addToDo);
function addToDo() {
     var toDoData;
     getElement("add-button")[0].style.display="none";
     getElement("add-icon")[0].style.display="inline-block";
     getElement("todo-complete")[0].style.display="none";
     getElement("list")[0].style.display="block";
     toDoData=getElement("add-more-text")[0].value;
     getElement("add-more-text")[0].value="";
     var todo=createHTMLElement("div","write-todo");
     var completedIcon =createHTMLElement("i","fa fa-circle-thin todo-completed");
     var toDoText=createHTMLElement("div","todo-text");
     toDoText.innerHTML=toDoData;
     var importantIcon =createHTMLElement("i","fa fa-star-o todo-important");
     console.log(todo);
     todo.appendChild(completedIcon);
     todo.appendChild(toDoText);
     todo.appendChild(importantIcon);
     getElement("list")[0].appendChild(todo);
     var toDo=getElement("to-Do");
     toDo[0].remove();
     console.log(toDo);
}
