const path = require('path');
const router = require('express').Router();
const notes = require('../db/note')

router.get('/notes', (req, res) => {
   notes.getNotes()
   .then(notes => res.json(notes))
   .catch(err => res.json(err))
});
router.post('/notes', (req, res) => {
   notes.addNewNote(req.body)
   .then(notes => res.json(notes))
   .catch(err => res.json(err))
});

router.delete('/notes/:id', (req, res) => {
    notes.removeNote(req.params.id)
    .then(() => res.json({ok: true}))
    .catch(err => res.json(err))
});

module.exports = router;