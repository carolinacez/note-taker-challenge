// const express = require('express');
const path = require('path');
const router = require('express').Router();

router.get('/notes', (req, res) => {
    //join /notes to noted.html so reponse displays on notes.html
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

router.get('*', (req, res) => {
    //if there's nothing else that needs to run display index.html 
    res.sendFile(path.join(__dirname, '../public/index.html'));
});


module.exports = router;