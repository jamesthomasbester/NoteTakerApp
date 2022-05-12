//dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
//constants
const PORT = process.env.PORT || 3001;
const app = express();
//building environment
app.use(express.json());
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/db'))
app.use(express.urlencoded({ extended: true}))
//declearing a global variable to store the db.json data in
var notes = [];
// reading file on sever startup and writing to global variable
fs.readFile('./db/db.json', 'utf8', (err, data) =>{
    if(err){
        console.log(err);
    }else{
        JSON.parse(data).forEach(elem => {
            notes.push(elem)
        })
    }
})
// routing for the home/index page
app.get('/', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/index.html'))
    
})
//routing for the notes page
app.get('/notes', (req,res) =>{
    res.sendFile(path.join(__dirname, '/public/notes.html'))
})
//sending the json to api page
app.get('/api/notes/', (req, res) =>{
    res.send(notes)
})
//removing from array on delete request writing to db file to persist data
app.delete('/api/notes/:id', (req, res) => {
    notes.splice( req.params.id, 1);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes), (err) =>{
        console.log(err);
        res.sendStatus(200)
    })
})
//returning the single json item on api call
app.get('/api/notes/:id', (req, res) => {
    res.send(
        notes[req.params.id]
    )
})
//saving data from notes page on post request assigning an id based on array length
app.post('/api/notes', (req, res) =>{
    console.log(req.body);
    if(req.body){
        let content = req.body;
        content.id = notes.length;
        res.sendStatus(200);
        notes.push(content);
        fs.writeFileSync('./db/db.json', JSON.stringify(notes), (err) =>{
            console.log(err);
        })
    }else{
        res.sendStatus(400);
    }
})
// listening 
app.listen(PORT, () => console.log(`http://localhost:${PORT}`))