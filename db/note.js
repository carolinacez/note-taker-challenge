const util = require('util');
const fs = require('fs');
//allows us to produce a unique id for each notes
const uuidv1 = require('uuid/v1');
const readFileASync = util.promisify(fs.readFile);
const writeFileASync = util.promisify(fs.writeFile);

class Notes {
    //method to read the db.json file
    read() {
        return readFileASync('db/db.json', 'utf8')
    }
    //method to write to the db.json file and turn response into json
    write(note) {
        return writeFileASync('db/db.json', JSON.stringify(note))
    }
    //getNotes method
    getNotes() {
        //read db.json 
        return this.read()
        //take reponse -notes and add them to the db.json file
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
        //note is going to contain titale and text
        const {title, text} = note;
        // if there is no title or text throw an error 
        if(!title || !text){
            throw new Error('Note must have title and text')
        }
        const newNote = {title, text, id:uuidv1()}
        
        return this.getNotes()
        //get all the notes and add new note
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