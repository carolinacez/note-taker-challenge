const path = require('path');
const router = require('express').Router();
const notes = require('../db/note')

router.get('/notes', (req, res) => {
   //"get" notes - run getNotes function. 
   notes.getNotes()
   // take notes and provide a json response
   .then(notes => res.json(notes))
   //if not that provide error 
   .catch(err => res.json(err))
});
router.post('/notes', (req, res) => {
   //run addNewNote funtions passing req.body. take old notes and add new notes
   notes.addNewNote(req.body)
   //take new notes and provide json response
   .then(notes => res.json(notes))
   .catch(err => res.json(err))
});

router.delete('/notes/:id', (req, res) => {
   //take notes run removeNote function and pass req.params.id to verify which one needs to be removed based on id
    notes.removeNote(req.params.id)
    .then(() => res.json({ok: true}))
    .catch(err => res.json(err))
});

module.exports = router;