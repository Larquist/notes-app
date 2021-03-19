const fs = require('fs')
const chalk = require('chalk')

const addNote =  (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
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
    const result = notes.filter((note) => note.title !== title)

    if(notes.length !== result.length){
        saveNotes(result)
        console.log(chalk.bgGreen('Removed "' + title + '"'))
    }else{
        console.log(chalk.bgRed('Note does not exist!'))
    }
    
}

const listNotes = () => {
    console.log(chalk.blue('Your Notes'))

    const notes = loadNotes()

    notes.forEach(note => console.log(note.title));
}

const readNote = (title) => {
    const notes = loadNotes()
    const noteToRead = notes.find((note) => note.title === title)

    if(noteToRead){
        console.log(chalk.blue(noteToRead.title))
        console.log(noteToRead.body)
    }else{
        console.log(chalk.bgRed('No matching title found!'))
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
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}