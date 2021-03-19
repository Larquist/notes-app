const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    return 'Your notes...'
}

const addNote =  (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.filter(function(note){
        return note.title === title
    })

    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.bgGreen('New note added!'))
    }else{
        console.log(chalk.bgRed('Note title must be unique.'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const result = notes.filter(function(note){
        return note.title !== title
    })

    if(notes.length !== result.length){
        saveNotes(result)
        console.log(chalk.bgGreen('Removed "' + title + '"'))
    }else{
        console.log(chalk.bgRed('Note does not exist!'))
    }
    
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    // If no file exists, return an empty string
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote
}