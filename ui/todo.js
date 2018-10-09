function init() {
  var allList =[];
  var myList = {
      id:null,
      name:null,
      listOfToDo:[]
  };
  var todo = {
    isChecked:false,
    isImportant:false,
    todo:null
  }
}

init();

function getElement(className) {
   return document.getElementsByClassName(className);
}

function createHTMLElement(elementType , className){
    var htmlElement = document.createElement(elementType);
    htmlElement.className=className;
    return htmlElement;
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
             getElement("add-new-text")[0].style="display:none";
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


getElement("add-new-list")[0].addEventListener("click" , addNewList);
function addNewList() {
    var list=createHTMLElement("div" ,"mylist");
    var listIcon=createHTMLElement("i","fa fa-list-ul icon");
    var listtext=createHTMLElement("div" ,"list-text");
    list.appendChild(listIcon);
    listtext.innerHTML="navanee";
    list.appendChild(listtext);
    getElement("My-List")[0].appendChild(list);


}

getElement("add-more-text")[0].addEventListener("click" , showAddBotton);
function showAddBotton() {
     getElement("add-button")[0].style.display="inline-block";
     getElement("add-icon")[0].style.display="none";
     getElement("todo-complete")[0].style.display="inline-block";
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
     todo.appendChild(completedIcon);
     todo.appendChild(toDoText);
     todo.appendChild(importantIcon);
     todo.addEventListener("click" ,showRightNav);
     completedIcon.addEventListener("click" ,checked);
     importantIcon.addEventListener("click" ,makeImportant);
     getElement("list")[0].appendChild(todo);
     var toDo=getElement("to-Do");
     toDo[0].remove();
}

function checked(event) {
     var parent = event.target.parentNode;
     var child = parent.childNodes;
     var content = child[0];
     if(content.classList.contains("fa-circle-thin")){
        console.log("marked as checked");
        getElement("todo-content-icon")[0].classList.replace("fa-circle-thin", "fa-check-circle");
        content.classList.replace("fa-circle-thin", "fa-check-circle");
        child[1].style="text-decoration:line-through;";
     } else {
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
  if(content.classList.contains("fa-star-o")){
     content.classList.replace("fa-star-o", "fa-star");
     getElement("todo-star-icon")[0].classList.replace("fa-star-o", "fa-star");
  } else {
     content.classList.remove("fa-star");
     content.classList.add("fa-star-o");
     getElement("todo-star-icon")[0].classList.replace("fa-star", "fa-star-o");
  }
}
