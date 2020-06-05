let listToDo = JSON.parse(localStorage.getItem('listToDo')) || []
showTodos(listToDo)
let removedTodos = JSON.parse(localStorage.getItem('removedTodos')) || []
showRemovedTodos(removedTodos)
let input = document.getElementById('input-todo')
let btnSubmit = document.getElementById('btn-submit')
let btnCancel = document.getElementById('btn-cancel')
let editMode = false
let editIndex

document.getElementById('form').addEventListener("submit", function(event){
    event.preventDefault()
    if(editMode){
        let editedTodo = getNewTodo()
        if(editedTodo != ''){
            listToDo[editIndex] = editedTodo
            localStorage.setItem('listToDo', JSON.stringify(listToDo))
            showTodos(listToDo)
            editMode = false
            btnCancel.innerHTML = ''
            btnSubmit.classList.toggle('btn-success')
            input.blur()
        }
    }else{
        let newTodo = getNewTodo()
        if(newTodo != ''){
            listToDo.push(newTodo)
            localStorage.setItem('listToDo', JSON.stringify(listToDo))
            showTodos(listToDo)
            input.blur()
        }
    }
})

function showTodos(listToDo){
    if(listToDo.length != 0){
        document.getElementById('list').innerHTML = setList(listToDo)
    } else{
        document.getElementById('list').innerHTML = '<ul class="list-group m-0 text-center"><i>Kosong</i></ul>'
    }
}

function showRemovedTodos(removedTodos){
    if(removedTodos.length != 0){
        document.getElementById('removed-list').innerHTML = setRemovedList(removedTodos)
    } else{
        document.getElementById('removed-list').innerHTML = '<ul class="list-group m-0 text-center"><i>Kosong</i></ul>'
    }
}

function getNewTodo(){
    let value = input.value
    input.value = ''
    return value
}

function setList(listToDo){
    let resultList = '<ul class="list-group shadow-sm">'
    for(let i = 0; i < listToDo.length; i++){
        resultList += list(listToDo[i], i)
    }
    resultList += '</ul>'
    return resultList
}

function setRemovedList(removedTodos){
    let resultList = '<ul class="list-group shadow-sm">'
    for(let i = 0; i < removedTodos.length; i++){
        resultList += removedList(removedTodos[i], i)
    }
    resultList += '</ul>'
    return resultList
}

function list(text, index){
    return '<li class="list-group-item d-flex justify-content-between align-items-center"><div>'+text+'</div><div class="d-flex flex-nowrap"><button type="button" class="btn btn-success mr-1" onclick="edit('+index+')">Edit</button> <button type="button" class="btn btn-danger" onclick="remove('+index+')">Hapus</button></div></li>'
}

function removedList(text, index){
    return '<li class="list-group-item  d-flex justify-content-between align-items-center"><div><s>'+text+'</s></div><div class="d-flex flex-nowrap"><button type="button" class="btn btn-danger" onclick="removeRemovedList('+index+')">Hapus</button></div></li>'
}

function remove(index){
    let removedTodo = listToDo[index]

    listToDo.splice(index, 1)
    localStorage.setItem('listToDo', JSON.stringify(listToDo))
    showTodos(listToDo)

    removedTodos.push(removedTodo)
    localStorage.setItem('removedTodos', JSON.stringify(removedTodos))
    showRemovedTodos(removedTodos)
}

function removeRemovedList(index){
    removedTodos.splice(index,1)
    localStorage.setItem('removedTodos', JSON.stringify(removedTodos))
    showRemovedTodos(removedTodos)
}

function edit(index){
    let editTodo = listToDo[index]
    input.value = editTodo
    editMode = true
    editIndex = index
    input.focus()
    btnSubmit.classList.toggle('btn-success')
    btnCancel.innerHTML = '<button class="btn btn-outline-danger btn-block mt-3" type="button" onclick="cancelEdit()">Batal</button>'
}

function cancelEdit(){
    editMode = false
    input.value = ''
    btnCancel.innerHTML = ''
    btnSubmit.classList.toggle('btn-success')
    input.blur()
}