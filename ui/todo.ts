/** 
 * Intailising global variables and objects....
 */
var id:number=0;
var todoId:number=0;
var currentTodoIndex:number;
var document:Document=document;
var currentIndex:number;
var currentTask:todoList;
var currentTodo:todo;

// create array for storing task.... 
var myList:todoList[]=[];

/** 
 * create constructor for task list..... 
 */
class todoList {
    private id:number;
    private name:string;
    private listOfToDo:Array<todo>;
    private element:HTMLElement;
    constructor(id:number, name:string , listOfToDo:Array<todo>, element:HTMLElement) {
        this.id=id;
        this.name=name;
        this.listOfToDo=listOfToDo;
        this.element=element;
    };
    
    //getter and setters...
    public setId(id:number):void{
         this.id = id;
    }

    public setName(name:string):void{
        this.name = name;
    }

    public setListOFToDo(listOfToDo:todo[]){
        this.listOfToDo = listOfToDo;
    }

    public setElement(element:HTMLElement){
        this.element = element;
    }

    public getId():number {
        return this.id;
    }

    public getName():string {
        return this.name;
    }

    public getListOfToDo():todo[]{
        return this.listOfToDo;
    }

    public getElement():HTMLElement {
        return this.element;
    }

}

/**
 * create constructor for todo..... 
 */
class todo {
    private id:number;
    private isChecked:boolean;
    private text:string;
    private dueDate:Date;
    private isImportant:boolean;
    private note:string;
    private element:HTMLElement;
    constructor(id:number, isChecked:boolean, text:string, date:Date, isImportant:boolean, element:HTMLElement, note:string){
        this.id = id;
        this.isChecked = isChecked;
        this.text = text;
        this.dueDate = date;
        this.isImportant = isImportant;
        this.note = note;
        this.element = element;
        };
    
    //getter and setters...
    public setId(id:number):void{
        this.id = id;
    }

    public setIsChecked(isChecked:boolean):void{
        this.isChecked = isChecked;
    }
    
    public setText(text:string):void {
        this.text = text;
    }  
    
    public setDueDate(dueDate:Date):void{
        this.dueDate = dueDate;
    }

    public setIsImportant(isImportant:boolean):void {
        this.isImportant = isImportant;
    }

    public setNote(note:string):void {
        this.note = note;
    }

    public setElement(element:HTMLElement):void {
        this.element = element;
    }
    
    public getId():number {
        return id;
    } 

    public getIsChecked():boolean {
        return this.isChecked; 
    }

    public getText():string{
        return this.text;
    }

    public getDueDate():Date {
        return this.dueDate;
    }

    public getIsImportant():boolean {
        return this.isImportant;
    }

    public getNote():string {
        return this.note;
    }

    public getElement():HTMLElement {
        return this.element;
    }
}

/**
 * init method is used to initiate  all event listeners.....etc  
 */
function init():void {
    getElement('side-menu')[0].addEventListener('click' , toggleSideMenu);
    getElement('add-new-list')[0].addEventListener('click' , addNewList);
    getElement('add-more-text')[0].addEventListener('click' , showAddBotton);
    getElement('add-more-text')[0].addEventListener('keydown', 
    function e(e:KeyboardEvent):void {
        if (e.keyCode == 13) {
           addToDo();
        }
    });
    getElement('add-button')[0].addEventListener('click' , addToDo);
    getElement('todo-star-icon')[0].addEventListener('click' , makeImportant);
    getElement('my-list-name')[0].addEventListener('keyup' ,getTodoListName);
    getElement('switch-icon')[0].addEventListener('click' ,closeRightSideWindow);
    getElement('delete-icon')[0].addEventListener('click' ,deleteTask);
    getElement('deleteTask')[0].addEventListener('click' ,deleteTaskList);
    getElement('sort')[0].addEventListener('click' ,sortTask);
    getElement('add-note-text')[0].addEventListener('keydown' ,function e(e:KeyboardEvent):void {
        if (e.keyCode == 13) {
            addNewNote(e);
        }
    });
    getElement('datepicker')[0].addEventListener('focusout' ,addDueDate);
    
    getElement('addDue')[0].addEventListener('click', changeDateInput);  
    getElement('search')[0].addEventListener('keydown' ,function e(e:KeyboardEvent):void {
        if (e.keyCode == 13) {
        search(e);
        }
        });
}
init();

/**
 * get the element using class name..
 */
function getElement(className:string):HTMLCollectionOf<any> {
    return document.getElementsByClassName(className);
}

/**
 * Change the style of element using class name...
 */
function changeStyleByClass(className:string, style:string, value:string):void {
    getElement(className)[0].style=style+':'+value+';';
}

/**
 * add the style of element using class name...
 */
function addCSSClassToElement(element:string , ClassName:string):void {
    getElement(element)[0].classList.add(ClassName);
}

/**
 * remove the style of element using class name... 
 */
function removeCSSClassToElement(element:string , ClassName:string):void {
    getElement(element)[0].classList.remove(ClassName);
}

/**
 * toggle the style of element using class name... 
 */
function toggleCSSClassToElement(element:string , ClassName:string):void {
    getElement(element)[0].classList.toggle(ClassName);
}

/**
 * create new Html element using class name and 
 */
function createHTMLElement(elementType:string, className:string, event:any, eventFuction:any, useCapture:boolean):HTMLElement {
    var htmlElement:HTMLElement=document.createElement(elementType);
    htmlElement.className=className;
    if(event!=null && eventFuction!=null) {
       htmlElement.addEventListener(event, eventFuction,useCapture);
    }
    return htmlElement;
}

/**
 * used to get the task name from user..... 
 */
function getTodoListName(event:Event):void {
    getElement('mylist')[currentIndex].childNodes[1].textContent = getElement('my-list-name')[0].value;
    currentTask.setName(getElement('my-list-name')[0].value);
} 

/**
 * Adding new task list....
 */
function addNewList():void {
    var list= createHTMLElement('div', 'mylist', 'click', showTodoList, false);
    var listIcon = createHTMLElement('i','fa fa-list-ul icon','',null,false);
    var listtext = createHTMLElement('div' ,'list-text','',null,false);
    list.appendChild(listIcon);
    list.appendChild(listtext);
    console.log('adding new List....');
    var todolist = new todoList(id++, 'untitled('+id+')...', [], list);
    listtext.innerHTML=todolist.getName();
    getElement('My-List')[0].appendChild(list);
    getElement('my-list-name')[0].value = todolist.getName();
    myList.push(todolist);
    currentIndex = id-1;
    currentTask = myList[id-1];
    getElement('list')[0].innerHTML = '';
    console.log(myList);
    if(getElement('side-menu-text')[1].style.display==='none') {
        var sideMenu = getElement('side-menu-text');
        var listItem = getElement('list-text');
        showRightMenu(sideMenu, listItem);
    }
}

/**
 * Used to search todo in  the current todo list....  
 */
function search(event:any):void {
     console.log('serach....'+event);
     var list = getElement('list')[0];
     for(let i=0;i<currentTask.getListOfToDo().length;i++) {
        if(currentTask.getListOfToDo()[i].getText()===event.target.value) {
        } else {
           currentTask.getListOfToDo()[i].getElement().style.display='none';
        }
     }
     closeRightSideWindow();
}

/**
 * Show the current todo list....  
 */
function showTodoList(event:any):void {
    var target;
    if(event.target.className==='mylist') {
        target = event.target;
    } else {
        target = event.target.parentNode;
    }
    currentIndex = [].indexOf.call(getElement('mylist'), target);
    currentTask = myList[currentIndex];
    showTasks(currentTask);
}

/**
 * Show the current tasks....  
 */
function showTasks(currentTask:todoList):void {
    console.log(currentTask.getName()+'....');
    getElement('my-list-name')[0].value = currentTask.getName();
    var todos:todo[]=currentTask.getListOfToDo();
    getElement('list')[0].innerHTML='';
    if (todos.length!=0) {
        for (let i= 0;i < todos.length; i++) {
            if (todos[i].getElement().style.display==='none'){
                todos[i].getElement().style.display='block';
            }
            getElement('list')[0].appendChild(todos[i].getElement());
        } 
    }   
    closeRightSideWindow();  
}

/**
 * Show the add button which is used to add new todo list....  
 */
function showAddBotton():void {
     addCSSClassToElement('add-button', 'show-inline-block'); 
     addCSSClassToElement('add-icon','hide'); 
     addCSSClassToElement('todo-complete', 'show-inline-block'); 
}

/**
 * Used to create new Todo.... 
 */
function createTodo(toDoData:todo):HTMLElement {
    console.log('create do......');
    console.log(toDoData);
    var todo=createHTMLElement('div', 'write-todo', 'click', showRightNav, false);
    var completedIcon =createHTMLElement('i', 'fa fa-circle-thin todo-completed', 'click', checked, false);
    var toDoText=createHTMLElement('div', 'todo-text', '', null, false);
    var importantIcon =createHTMLElement('i', 'fa fa-star-o todo-important', 'click', makeImportant, false);
    toDoText.innerHTML=toDoData.getText();
    todo.appendChild(completedIcon);
    todo.appendChild(toDoText);
    todo.appendChild(importantIcon);
    getElement('to-Do')[0].remove();
    return todo;
}

/**
 * used to add new todo....  
 */
function addToDo():void {
     var toDoData:todo;
     var newTodo:HTMLElement;
     removeCSSClassToElement('add-button', 'show-inline-block'); 
     removeCSSClassToElement('add-icon','hide'); 
     removeCSSClassToElement('todo-complete', 'show-inline-block'); 
     changeStyleByClass('list', 'display', 'block');
     toDoData = new todo(todoId++, false, getElement('add-more-text')[0].value, null, false ,null , '');
     newTodo = createTodo(toDoData);
     toDoData.setElement(newTodo);
     currentTask.getListOfToDo().push(toDoData);
     getElement('list')[0].appendChild(newTodo);
     getElement('add-more-text')[0].value='';
}

/**
 * used to mark todo as checked.. 
 */
function checked(event:any):void {
     var parent = event.target.parentNode;
     var child = parent.childNodes;
     console.log(parent);
     var content = child[0];
     currentTodoIndex = [].indexOf.call(getElement('write-todo'), parent); 
     currentTodo = currentTask.getListOfToDo()[currentTodoIndex];
     console.log(currentTodoIndex+'.....is clicked');
     console.log(myList);
     var check = getElement('todo-content-icon')[0];
     if (!currentTodo.getIsChecked()){
         currentTodo.setIsChecked(true);
         console.log('marked as checked');
         check.classList.replace('fa-circle-thin', 'fa-check-circle');
         content.classList.replace('fa-circle-thin', 'fa-check-circle');
         child[1].style.textDecoration='line-through';
     } else {
         console.log('un checked...');
         currentTodo.setIsChecked(false);  
         content.classList.replace('fa-check-circle', 'fa-circle-thin');
         check.classList.replace('fa-check-circle', 'fa-circle-thin');
         child[1].style.textDecoration='none';
     }
}


/**
 * used to mark todo as important.. 
 */
function makeImportant(event:any) {
    var parent = event.target.parentNode;
    var child = parent.childNodes;
    var content = child[2];
    currentTodoIndex = [].indexOf.call(getElement('write-todo'), event.target.parentNode); 
    currentTodo = currentTask.getListOfToDo()[currentTodoIndex];
    console.log(currentTodoIndex);
    var makeImportant = getElement('todo-star-icon')[0];
    if(!currentTodo.getIsImportant()){
       currentTodo.setIsImportant(true); 
       content.classList.replace('fa-star-o', 'fa-star');
       makeImportant.classList.replace('fa-star-o', 'fa-star');
    } else {
       content.classList.replace('fa-star', 'fa-star-o');
       currentTodo.setIsImportant(false); 
       makeImportant.classList.replace('fa-star', 'fa-star-o');
    }
}



/**
 * used to toggle right nav.. 
 */
function showRightNav(event:any):void {
    currentTodoIndex = [].indexOf.call(getElement('write-todo'), event.target.parentNode); 
    console.log(currentTodoIndex);
    currentTodo = currentTask.getListOfToDo()[currentTodoIndex];
    console.log(currentTodo);
    showNav(currentTodo);
}

/**
 * used to delete  task... 
 */
function deleteTask():void {
    console.log(currentTodoIndex+'****************');
    currentTask.getListOfToDo().splice(currentTodoIndex, 1);
    getElement('write-todo')[currentTodoIndex].remove();
    var nextTodo =currentTodoIndex;  
    if(currentTodoIndex>currentTask.getListOfToDo().length-1){
       currentTodoIndex = currentTodoIndex-1; 
       nextTodo = currentTodoIndex;
    }
    if(nextTodo!=-1) {
       currentTodo = currentTask.getListOfToDo()[nextTodo];
       console.log(nextTodo);
       showNav(currentTodo);
    } else {
        closeRightSideWindow(); 
    }
}



/**
 * used to delete a particular to do.... 
 */
function deleteTaskList(event:any):void {
    id--;
    myList.splice(currentIndex, 1);
    getElement('mylist')[currentIndex].remove();
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
var trigger:number=0;
function sortTask(event:any):void{
    console.log('navanee');
    if(trigger%2===0) {
       console.log('fuck'); 
    currentTask.getListOfToDo().sort(function(obj1, obj2):number {
        return obj1.getText().localeCompare(obj2.getText());
    });
    } else {
        console.log('off');
        currentTask.getListOfToDo().sort(function(obj1:todo, obj2:todo):number {
            if (obj1.getId() > obj2.getId())
                return -1;
            if (obj1.getId() < obj2.getId())
                return 1;
            return 0; 
        });  
    }
    trigger++;
    console.log(currentTask);
    showTasks(currentTask);
}

/**
 * used to add new note..  
 */
function addNewNote(event:any):void {
    currentTodo.setNote(event.target.value);
}


/**
 * used to add due date...  
 */
function addDueDate(event:any):void {
    currentTodo.setDueDate(event.target.value);
}


/**
 * used to change date input...  
 */
function changeDateInput(event:any):void {
    event.target.style.display='none';
    getElement('datepicker')[0].style.display='inline-block';
}


/**
 * used to show right nav menu... 
 */
function showNav(nextTodo:todo):void {
    removeCSSClassToElement('mid-content','wid-96');
    if(getElement('side-menu-text')[0].style.display==='none') {
        addCSSClassToElement('mid-content','wid-71');
    } else {
        addCSSClassToElement('mid-content','wid-54');
    }
    getElement('right-sidenav')[0].classList.replace('hide', 'show-inline-block');
    if(nextTodo.getDueDate() != null) {
        changeStyleByClass('addDue', 'display', 'none');
        changeStyleByClass('datepicker', 'display', 'inline-block');
        getElement('datepicker')[0].value = nextTodo.getDueDate();
    } else {
        changeStyleByClass('datepicker', 'display', 'none');
        changeStyleByClass('addDue', 'display', 'inline-block'); 
    }
    getElement('todo-content-text')[0].innerHTML =nextTodo.getText();
    getElement('add-note-text')[0].value = nextTodo.getNote();
    getElement('todo-content-icon')[0].classList.replace('fa-check-circle', 'fa-circle-thin');
    getElement('todo-star-icon')[0].classList.replace('fa-star', 'fa-star-o');
    if(nextTodo.getIsChecked()) { 
       getElement('todo-content-icon')[0].classList.replace('fa-circle-thin', 'fa-check-circle');
    } 
    if(nextTodo.getIsImportant()) { 
        getElement('todo-star-icon')[0].classList.replace('fa-star-o', 'fa-star');
    } 
}

/**
 * used to close right side nav menu.. 
 */
function closeRightSideWindow():void{
    getElement('right-sidenav')[0].classList.replace('show-inline-block', 'hide');
    if(getElement('side-menu-text')[0].style.display==='none') {
        removeCSSClassToElement('mid-content','wid-71');
        addCSSClassToElement('mid-content','wid-96');
    } else {
        removeCSSClassToElement('mid-content','wid-54');
        addCSSClassToElement('mid-content','wid-79');
    }   
}


/**
 * used to toggle left side menu.... 
 */
function toggleSideMenu():void {
    console.log(getElement('list-text'));
    var sideMenu:HTMLCollectionOf<any>=getElement('side-menu-text');
    var list:HTMLCollectionOf<any>=getElement('list-text');
    showRightMenu(sideMenu, list);
}

/**
 * used to show right side menu.... 
 */
function showRightMenu(sideMenu:HTMLCollectionOf<any>, 
                                              list:HTMLCollectionOf<any>):void{
    var flag=0;
    toggleCSSClassToElement('side-navbar','wid-3');
    toggleCSSClassToElement('mid-content','wid-96');
    for(let i=0; i<sideMenu.length; i++) { 
        if (sideMenu[i].style.display === 'none') {
            flag=1;
        } else {
            sideMenu[i].style.display='none';
            changeStyleByClass('add-new-text', 'display', 'none')
        }
    }
     
    for(let i=0; i<list.length; i++) {
        let content = list[i];
        if (content.style.display === 'none') {
            flag=1;
        } else {
            content.style.display = 'none';
        }
    }

    setTimeout(function(){
        for(let i=0; i<list.length; i++) {
        let content = list[i];
         if(flag===1) {
             content.style.display = 'inline';
         }
     } }, 300);
 
    setTimeout(function(){
        for(let i=0; i<sideMenu.length; i++) {
        let content = sideMenu[i];
         if(flag===1) {
             content.style.display = 'inline';
             changeStyleByClass('add-new-text', 'display' ,'inline-block');
         }
     } }, 300);
} 

