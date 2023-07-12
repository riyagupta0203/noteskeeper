const express = require('express');
const router = express.Router();
const Note = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');

// Router for fetching all notes
router.get('/fetchallnotes',fetchuser,async (req, res)=>{
    try {
        const notes = await Note.find({user : req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(400).send('Some error occured');
    }
});

// Router for adding the notes
router.post('/addnote', fetchuser, [
    body('title', 'Enter a unique email').isLength({ min: 3}),
    body('description', 'Enter a password with 5 minimum characters').isLength({ min: 5 }),
], async (req, res)=>{
    try {

        const {title, description, tag} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user : req.user.id
        });

        const savedNote = await note.save();

        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(400).send('Some error occured');
    }
});

// Endpoint for upadting the notes 
router.put('/updatenote/:id', fetchuser, async (req, res)=>{
    try {
        const {title, description, tag} = req.body;
        const newNote = {};
        if(title){newNote.title = title};
        if(description){newNote.description = description};
        if(tag){newNote.tag = tag};

        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send('Not Found');
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send('Not allowed');
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set : newNote},{new:true});
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(400).send('Some error occured');
    }
})

router.delete('/deletenote/:id', fetchuser, async (req, res)=>{
    try {
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send('Not Found');
        }

        if(note.user.toString() !== req.user.id){
            return res.status(401).send('Not allowed');
        }
        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success" : "Note has been deleted", note: note});
    } catch (error) {
        console.error(error.message);
        res.status(400).send('Some error occured');
    }
})

// Endpoint for viewing the note

router.get('/view/:id', async (req, res)=>{
    
    try{
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(402).send('Not Found');
        }
        // console.log(note);
        res.json({note});
    }
    catch(error) {
        console.error(error.message);
        res.status(400).send('Some error occured');
    }
})
module.exports = router;