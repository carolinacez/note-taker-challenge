const util = require('util');
const fs = require('fs');
const uuidv1 = require('uuid/v1');
const readFileASync = util.promisify(fs.readFile);
const writeFileASync = util.promisify(fs.writeFile);

class Notes {
    read() {
        return readFileASync('db/db.json', 'utf8')
    }

    write(note) {
        return writeFileASync('db/db.json', JSON.stringify(note))
    }

    getNotes() {
        return this.read()
        .then((notes)=>{
            let updatedNotes;
            try{
                updatedNotes = [].concat(JSON.parse(notes))
            } 
            catch(err) {
                updatedNotes = [];
            }
            return updatedNotes;
        })
    }

    addNewNote(note) {
        const {title, text} = note;
        if(!title || !text){
            throw new Error('Note must have title and text')
        }
        const newNote = {title, text, id:uuidv1()}

        return this.getNotes()
        .then(notes => [...notes, newNote])
        .then(updateNote => this.write(updateNote))
        .then(() => newNote)
    }

    removeNote(id) {
        return this.getNotes()
        .then(notes => notes.filter(note => note.id !== id))
        .then(filteredNotes => this.write(filteredNotes))
    }


}

module.exports = new Notes();


// function getNotes() {

// };

// function createNewNote() {

// };

// function deleteNotes() {

// };