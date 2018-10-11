/** 
 * Intailising global variables and objects....
 */
var id=0;
var todoId=0;
var document = document;
var currentIndex=0;
var currentTask;
var currentTodoIndex;
var currentTodo;

// create array for storing task.... 
var myList = [];

/** 
 * create constructor for task list..... 
 */
function todoList(id, name, listOfToDo, element){
    this.id=id;
    this.name=name;
    this.listOfToDo=listOfToDo;
    this.element=element;
};

/**
 * create constructor for todo..... 
 */
function todo(id, isChecked, text, date, isImportant, element, note){
    this.id=id;
    this.isChecked=isChecked;
    this.text=text;
    this.dueDate=date;
    this.isImportant=isImportant;
    this.note=note;
    this.element=element;
};

/**
 * init method is used to initiate  all event listeners.....etc  
 */
function init() {
    getElement("side-menu")[0].addEventListener("click" , toggleSideMenu);
    getElement("add-new-list")[0].addEventListener("click" , addNewList);
    getElement("add-more-text")[0].addEventListener("click" , showAddBotton);
    getElement("add-more-text")[0].addEventListener("keydown", function e(e) {
        if (e.keyCode == 13) {
        addToDo();
        }
        });
    getElement("add-button")[0].addEventListener("click" , addToDo);
    getElement("todo-star-icon")[0].addEventListener("click" , makeImportant);
    getElement("my-list-name")[0].addEventListener("keyup" ,getTodoListName);
    getElement("switch-icon")[0].addEventListener("click" ,closeRightSideWindow);
    getElement("delete-icon")[0].addEventListener("click" ,deleteTask);
    getElement("deleteTask")[0].addEventListener("click" ,deleteTaskList);
    getElement("sort")[0].addEventListener("click" ,sortTask);
    getElement("add-note-text")[0].addEventListener("keydown" ,function e(e) {
    if (e.keyCode == 13) {
    addNewNote(e);
    }
    });
    getElement("datepicker")[0].addEventListener("focusout" ,addDueDate);
    
    getElement("addDue")[0].addEventListener("click", changeDateInput);  
    getElement("search")[0].addEventListener("keydown" ,function e(e) {
        if (e.keyCode == 13) {
        search(e);
        }
        });
}
init();

/**
 * Change the style of element using class name...
 */
function changeStyleByClass(className, style, value){
    getElement(className)[0].style=style+":"+value+";";
}

/**
 * add the style of element using class name...
 */
function addCSSClassToElement(element , ClassName) {
    getElement(element)[0].classList.add(ClassName);
}

/**
 * remove the style of element using class name... 
 */
function removeCSSClassToElement(element , ClassName) {
    getElement(element)[0].classList.remove(ClassName);
}

/**
 * toggle the style of element using class name... 
 */
function toggleCSSClassToElement(element , ClassName) {
    getElement(element)[0].classList.toggle(ClassName);
}

/**
 * get the element using class name..
 */
function getElement(className) {
    return document.getElementsByClassName(className);
}

/**
 * create new Html element using class name and 
 */
function createHTMLElement(elementType, className, event, eventFuction, useCapture){
    var htmlElement = document.createElement(elementType);
    htmlElement.className=className;
    if(event!=null && eventFuction!=null) {
       htmlElement.addEventListener(event, eventFuction,useCapture);
    }
    return htmlElement;
}

/**
 * used to get the task name from user..... 
 */
function getTodoListName(event){
    getElement("mylist")[currentIndex].childNodes[1].textContent = getElement("my-list-name")[0].value;
} 


/**
 * used to toggle left side menu.... 
 */
function toggleSideMenu() {
    var sideMenu = getElement("side-menu-text");
    var list = getElement("list-text");
    showRightMenu(sideMenu, list);
}


/**
 * Adding new task list....
 */
function addNewList() {
    var list = createHTMLElement("div", "mylist", "click", showTodoList, false);
    var listIcon = createHTMLElement("i","fa fa-list-ul icon");
    var listtext = createHTMLElement("div" ,"list-text");
    list.appendChild(listIcon);
    list.appendChild(listtext);
    console.log("adding new List....");
    var todolist = new todoList(id++, "untitled("+id+")...", [], list);
    listtext.innerHTML=todolist.name;
    getElement("My-List")[0].appendChild(list);
    getElement("my-list-name")[0].value = todolist.name;
    myList.push(todolist);
    currentInedx=id-1;
    currentTask=myList[id-1];
    getElement("list")[0].innerHTML="";
    console.log(myList);
    
    if(getElement("side-menu-text")[1].style.display==="none") {
        var sideMenu = getElement("side-menu-text");
        var list = getElement("list-text");
        showRightMenu(sideMenu, list);
    }
}

/**
 * Used to search todo in  the current todo list....  
 */
function search(event) {
     console.log("serach....");
     var list = getElement("list")[0];
     for(let i=0;i<currentTask.listOfToDo.length;i++) {
        if(currentTask.listOfToDo[i].text===event.target.value) {
           
        } else {
            currentTask.listOfToDo[i].element.style.display="none";
        }
     }
     closeRightSideWindow();
}

/**
 * Show the current todo list....  
 */
function showTodoList(event) {
    var target;
    if(event.target.className==="mylist"){
        target = event.target;
    } else {
        target = event.target.parentNode;
    }
    currentIndex = [].indexOf.call(getElement("mylist"), target);
    currentTask = myList[currentIndex];
    showTasks(currentTask);
    
}

/**
 * Show the current tasks....  
 */
function showTasks(currentTask) {
    getElement("my-list-name")[0].value = currentTask.name;
    var todoList = currentTask.listOfToDo;
    getElement("list")[0].innerHTML="";
    if (todoList.lenght!=0) {
        for (let i= 0;i < todoList.length; i++) {
            getElement("list")[0].appendChild(todoList[i].element);
        } 
    }   
    closeRightSideWindow();  
}

/**
 * Show the add button which is used to add new todo list....  
 */
function showAddBotton() {
     addCSSClassToElement("add-button", "show-inline-block"); 
     addCSSClassToElement("add-icon","hide"); 
     addCSSClassToElement("todo-complete", "show-inline-block"); 
}

/**
 * Used to create new Todo.... 
 */
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

/**
 * used to add new todo....  
 */
function addToDo() {
     var toDoData;
     var newTodo;
     removeCSSClassToElement("add-button", "show-inline-block"); 
     removeCSSClassToElement("add-icon","hide"); 
     removeCSSClassToElement("todo-complete", "show-inline-block"); 
     changeStyleByClass("list", "display", "block");
     toDoData = new todo(todoId++, false, getElement("add-more-text")[0].value, null, false ,null , "");
     newTodo = createTodo(toDoData);
     toDoData.element = newTodo;
     currentTask.listOfToDo.push(toDoData);
     getElement("list")[0].appendChild(newTodo);
     getElement("add-more-text")[0].value="";
}

/**
 * used to mark todo as checked.. 
 */
function checked(event) {
     var parent = event.target.parentNode;
     var child = parent.childNodes;
     console.log(parent);
     var content = child[0];
     currentTodoIndex = [].indexOf.call(getElement("write-todo"), parent); 
     currentTodo = currentTask.listOfToDo[currentTodoIndex];
     console.log(currentTodoIndex+".....is clicked");
     console.log(myList);
     var check = getElement("todo-content-icon")[0];
     if (!currentTodo.isChecked){
         currentTodo.isChecked =true;
         console.log("marked as checked");
         check.classList.replace("fa-circle-thin", "fa-check-circle");
         content.classList.replace("fa-circle-thin", "fa-check-circle");
         child[1].style.textDecoration="line-through";
     } else {
         console.log("un checked...");
         currentTodo.isChecked =false;  
         content.classList.replace("fa-check-circle", "fa-circle-thin");
         check.classList.replace("fa-check-circle", "fa-circle-thin");
         child[1].style.textDecoration="none";
     }

}


/**
 * used to mark todo as important.. 
 */
function makeImportant(event) {
    var parent = event.target.parentNode;
    var child = parent.childNodes;
    var content = child[2];
    currentTodoIndex = [].indexOf.call(getElement("write-todo"), event.target.parentNode); 
    currentTodo = currentTask.listOfToDo[currentTodoIndex];
    console.log(currentTodoIndex);
    var makeImportant = getElement("todo-star-icon")[0];
    if(!currentTodo.isImportant){
       currentTodo.isImportant=true; 
       content.classList.replace("fa-star-o", "fa-star");
       makeImportant.classList.replace("fa-star-o", "fa-star");
    } else {
       content.classList.replace("fa-star", "fa-star-o");
       currentTodo.isImportant= false; 
       makeImportant.classList.replace("fa-star", "fa-star-o");
    }
  }



/**
 * used to toggle right nav.. 
 */
function showRightNav(event) {
    currentTodoIndex = [].indexOf.call(getElement("write-todo"), event.target.parentNode); 
    console.log(currentTodoIndex);
    currentTodo = currentTask.listOfToDo[currentTodoIndex];
    console.log(currentTodo);
    showNav(currentTodo);
}

/**
 * used to delete  task... 
 */
function deleteTask() {
    console.log(currentTodoIndex+"****************");
    currentTask.listOfToDo.splice(currentTodoIndex, 1);
    getElement("write-todo")[currentTodoIndex].remove();
    var nextTodo =currentTodoIndex;  
    if(currentTodoIndex>currentTask.listOfToDo.length-1){
       currentTodoIndex = currentTodoIndex-1; 
       nextTodo = currentTodoIndex;
    }
    if(nextTodo!=-1) {
       currentTodo = currentTask.listOfToDo[nextTodo];
       console.log(nextTodo);
       showNav(currentTodo);
    } else {
        closeRightSideWindow(); 
    }
}



/**
 * used to delete a particular to do.... 
 */
function deleteTaskList(event) {
    id--;
    myList.splice(currentIndex, 1);
    getElement("mylist")[currentIndex].remove();
    var nextTask =currentIndex;  
    if(currentIndex>myList.length-1){
       currentIndex = currentIndex-1; 
       nextTask = currentIndex;
    }
    if(nextTask!=-1) {
       currentTask = myList[nextTask];
       showTasks(currentTask);
    } 
}

/**
 * used to sort task ascending order...
 */
var trigger=0;
function sortTask(event){
    console.log("navanee");
    if(trigger%2==0) {
    currentTask.listOfToDo.sort(function(obj1, obj2) {
        return obj1.text.localeCompare(obj2.text);
    });
    } else {
    currentTask.listOfToDo.sort(function(obj1, obj2) {
            return obj1.id - obj2.id;
    });  
    }
    trigger++;
    showTasks(currentTask);
}

/**
 * used to add new note..  
 */
function addNewNote(event) {
    currentTodo.note = event.target.value;
}


/**
 * used to add due date...  
 */
function addDueDate(event) {
    currentTodo.dueDate = event.target.value;
}


/**
 * used to change date input...  
 */
function changeDateInput(event) {
    event.target.style.display="none";
    getElement("datepicker")[0].style.display="inline-block";
}


/**
 * used to show right nav menu... 
 */
function showNav(nextTodo) {
    removeCSSClassToElement("mid-content","wid-96");
    if(getElement("side-menu-text")[0].style.display==="none") {
        addCSSClassToElement("mid-content","wid-71");
        //changeStyleByClass("mid-content", "width", "71.5%"); 
    } else {
        addCSSClassToElement("mid-content","wid-54");
        //changeStyleByClass("mid-content", "width", "54.5%"); 
    }
    getElement("right-sidenav")[0].classList.replace("hide", "show-inline-block");
    if(nextTodo.dueDate != null) {
        changeStyleByClass("addDue", "display", "none");
        changeStyleByClass("datepicker", "display", "inline-block");
        getElement("datepicker")[0].value = nextTodo.dueDate;
    } else {
        changeStyleByClass("datepicker", "display", "none");
        changeStyleByClass("addDue", "display", "inline-block"); 
    }

    getElement("todo-content-text")[0].innerHTML =nextTodo.text;
    getElement("add-note-text")[0].value = nextTodo.note;
    getElement("todo-content-icon")[0].classList.replace("fa-check-circle", "fa-circle-thin");
    getElement("todo-star-icon")[0].classList.replace("fa-star", "fa-star-o");

    if(nextTodo.isChecked) { 
       getElement("todo-content-icon")[0].classList.replace("fa-circle-thin", "fa-check-circle");
    } 
    if(nextTodo.isImportant) { 
        getElement("todo-star-icon")[0].classList.replace("fa-star-o", "fa-star");
    } 
}

/**
 * used to close right side nav menu.. 
 */
function closeRightSideWindow(){
    getElement("right-sidenav")[0].classList.replace("show-inline-block", "hide");
    if(getElement("side-menu-text")[0].style.display==="none") {
        removeCSSClassToElement("mid-content","wid-71");
        addCSSClassToElement("mid-content","wid-96");
        //changeStyleByClass("mid-content", "width", "96.5%"); 
    } else {
        removeCSSClassToElement("mid-content","wid-54");
        addCSSClassToElement("mid-content","wid-79");
        //changeStyleByClass("mid-content", "width", "79.5%"); 
    }   
}

//needs code reusablity.....###############
/**
 * used to show right side menu.... 
 */
function showRightMenu(sideMenu, list){
    var flag=0;
    toggleCSSClassToElement("side-navbar","wid-3");
    toggleCSSClassToElement("mid-content","wid-96");
    for(let i=0; i<sideMenu.length; i++) {
        if (sideMenu[i].style.display === "none") {
            flag=1;
        } else {
            sideMenu[i].style.display="none";
            changeStyleByClass("add-new-text", "display", "none")
        }
    }
     

    for(let i=0; i<list.length; i++) {
        let content = list[i];
        if (content.style.display === "none") {
            flag=1;
        } else {
            content.style.display = "none";
        }
    }

    setTimeout(function(){
        for(let i=0; i<list.length; i++) {
        let content = list[i];
         if(flag==1) {
             content.style.display = "inline";
         }
     } }, 300);
 
    setTimeout(function(){
        for(let i=0; i<sideMenu.length; i++) {
        let content = sideMenu[i];
         if(flag==1) {
             content.style.display = "inline";
             changeStyleByClass("add-new-text", "display" ,"inline-block");
         }
     } }, 300);
} 

