//read existing notes from local storage
const getSavedNotes=function(){
    const notesJSON=localStorage.getItem('notes')

if(notesJSON!=null){
   return JSON.parse(notesJSON)
}else{
    return []
    }
}

//remove note from the list
const removeNote=function(id){
   const noteIndex=notes.findIndex(function(note){
      return note.id==id
   })
   if(noteIndex>-1){
      notes.splice(noteIndex,1)
   }
}


//Genretate the DOM structure for a note
const generateNoteDOM=function(note){
    const noteEl=document.createElement('div')
    const textEl=document.createElement('a')
   const button=document.createElement('button')

   //setup the remove note button
   button.textContent='Delete'
   noteEl.appendChild(button)
   button.addEventListener('click',function(){
      removeNote(note.id)
      savedNotes(notes)
      renderNotes(notes,filters)
   })

   //setup the note title text
    if(note.title.length>0){
       textEl.textContent=note.title
    } else{
       textEl.textContent='Unnamed note'
    }
    textEl.setAttribute('href',`/edit.html#${note.id}`)
    noteEl.appendChild(textEl)
    return noteEl
}

//sort your notes by one of three ways
const sortNotes=function(notes, sortBy){
if(sortBy==='byEdited'){
    return notes.sort(function(a,b){
       if(a.updatedAt>b.updatedAt){
          return -1
       }else if(a.updatedAt<b.updatedAt){
          return 1
       }else{
          return 0
       }
    })
}else if(sortBy==='byCreated'){
   return notes.sort(function(a,b){
      if(a.createdAt>b.createdAt){
         return -1
      }else if(a.createdAt<b.createdAt){
         return 1
      }
      else{
         return 0
      }
   })
}else if(sortBy==='alphabetical'){
 return notes.sort(function(a,b){
    if(a.title.toLowerCase()<b.title.toLowerCase()){
       return -1
    }else if(a.title.toLowerCase()>b.title.toLowerCase()){
       return 1
    }else{
       return 0
    }
 })
}
else{
   return notes
}


}

//render application notes
const renderNotes=function(notes, filters){
   notes=sortNotes(notes, filters.sortBy)
    const filteredNotes=notes.filter(function(note){
       return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })
    
    document.querySelector('#notes').innerHTML=''
 
    filteredNotes.forEach(function(note){
       
      const noteEl=generateNoteDOM(note)
 
       document.querySelector('#notes').appendChild(noteEl)
    })
 }

//saved notes
const savedNotes=function(notes){
    localStorage.setItem('notes',JSON.stringify(notes))
}

//generat the lase edited message
const generateLastEdited=function(timestamp){
   return `Last Edited${moment(timestamp).fromNow()}`
}