const router = require("express").Router();
const db = require("..db/db.json");
const fs = require('fs');

// unique id
const uuid = require("uuid");

// GET /api/notes - Should read the db.json file and 
router.get("/api/notes", function (request, response) {

    fs.readFile("db/db.json", "utf-8", function (err, data) {
        if (err) throw err;

        let newNote = JSON.parse(data);
        // return all saved notes as JSON.
        return response.json(newNote);
    })

});

// POST /api/notes - Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.

router.post("/api/notes", function (request, response) {

    request.body.id = uuid.v1();

    fs.readFile("./db/db.json", "utf-8", function (err, data) {

        if (err) throw err;

        let notes = JSON.parse(data);

        notes.push(request.body);

        noteWriteDB(JSON.stringify(notes));

        response.json(notes);

    });
    // DELETE /api/notes/:id - Should receive a query parameter containing the id of a note to delete. This means you'll need to find a way to give each note a unique id when it's saved. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property

    router.delete("/api/notes/:id", function (request, response) {
        // to clear note?

        let inputID = request.params.id;

        fs.readFile("./db/db.json", "utf-8", function (err, data) {

            if (err) throw err;

            let notes = JSON.parse(data);

            notes = notes.filter(note => note.id !== inputID);

            let erasedNote = notes.filter(note => note.id === inputID);

            console.log(erasedNote);

            noteWriteDB(JSON.stringify(notes));

            response.json(notes)


        });


    });



    // and then rewrite the notes to the db.json file

    function noteWriteDB(notes) {
        fs.writeFile("db/db.json", notes, function (err) {
            if (err) throw err
        });
    };


    module.exports = router;
