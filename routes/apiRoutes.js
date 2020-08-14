const path = require('path');
const router = require('express').Router();
const notes = require('../db/note')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, ''));
});
router.post('', (req, res) => {
    res.sendFile(path.join(__dirname, ''));
});

router.delete('', (req, res) => {
    res.sendFile(path.join(__dirname, ''));
});

module.exports = router;