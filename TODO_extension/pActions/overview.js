'use strict';
// Todo Extension by Louis-Charles Biron
// Please don't use or credit this code as your own.
//

//Display version
chrome.management.getSelf((e)=>{version.textContent="V"+e.versionName})


let list

// ON LOAD
chrome.storage.sync.get((r)=>{

    list = r.$l

})


//display the todos in the pre_backlog
function displayTodoList(todoList=list) {
    list.forEach(t=>{
        pre_backlog.appendChild(t.)
    })
}







// TODO CREATION (pre_backlog)
c_pb_new.onkeydown=c_pb_new.onblur=(e)=>{
    let v = c_pb_new.value
    if ((e.key == "Enter" || !e.key) && v) {
        c_pb_new.value = ""

        let newTodo = new Todo(v)
    }
}




