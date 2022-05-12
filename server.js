//dependencies
const express = require('express');
const path = require('path');
const db = require('./db/db.json');
//constants
const PORT = process.env.PORT || 3001;
const app = express();
//
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
//
app.get('/', (req,res) =>{
    res.sendFile(path.resolve('./public/index.html'))
})
app.get('/notes', (req,res) =>{
    res.sendFile(path.resolve('./public/notes.html'))
})
app.post('/notes', (req, res) =>{
    console.log(req);
    if(req.body){
        res.sendStatus(200);
    }else{
        res.sendStatus(400);
    }
})

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))