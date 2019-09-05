const titleElement=document.querySelector('#note-title')
const bodyElemet=document.querySelector('#note-body')
const removeElemet=document.querySelector('#remove-note')
const dateElement=document.querySelector('#last-edited')
const noteId=location.hash.substring(1)
let notes=getSavedNotes()

let note=notes.find(function(note){
   return note.id==noteId
})

if(note === undefined){
    location.assign('/index.html')
}

titleElement.value=note.title
bodyElemet.value=note.body
dateElement.textContent=generateLastEdited(note.updatedAt)

titleElement.addEventListener('input',function(e){
    note.title=e.target.value
    note.updatedAt=moment().valueOf()
    dateElement.textContent=generateLastEdited(note.updatedAt)

    savedNotes(notes)
})

bodyElemet.addEventListener('input',function(e){
    note.body=e.target.value
    note.updatedAt=moment().valueOf()
    dateElement.textContent=generateLastEdited(note.updatedAt)

    savedNotes(notes)
})

removeElemet.addEventListener('click',function(){
    removeNote(note.id)
    savedNotes(notes)
    location.assign('/index.html')
})

window.addEventListener('storage',function(e){
    if(e.key==='notes'){
       notes= JSON.parse(e.newValue)
        note=notes.find(function(note){
        return note.id==noteId
     })
     
     if(note === undefined){
         location.assign('/index.html')
     }
     

     titleElement.value=note.title
    bodyElemet.value=note.body
    dateElement.textContent=generateLastEdited(note.updatedAt)


    }
})

