const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

let app = express();
let port = 4000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(cors());

let users = [
    { id: 1, username: 'user'}
]
let notes = [
    {id: 1, userId: 1, text: 'Hello world'},
    {id: 2, userId: 1, text: 'This is a note I have noted down.'}
]

app.post('/user/register', (req, res) => {
    const response = {
        success: false,
        message: ''
    }

    const user = users.find(u => u.username === req.body.username)

    if (!user) {
        users.push({
            id: users.length + 1,
        username: req.body.username})

        response.success = true;
        response.message = 'Registered successfully! You can now login.'
    } else {
        response.message = 'Unable to register, user already exists.'
    }

    res.json(response)
})

app.get('/note/list', (req, res) => {
    const response = {
        success: false,
        message: '',
        list: []
    }

    try {
        let header = req.header.authentication;
        const userToken = jwt.veryfy(header.split(' ')[1], 'SECRET')

        const user = users.find(u => u.id === userToken.id);

        if (user) {
            response.list = notes.filters(n => n.userId === user.id).reverse();
            response.success = true;
        } else {
            response.message = 'You are not authorized.'
        }
    } catch (e) { response.message = 'You are noe authorizied.'}

    res.json(response);
})

app.post('/note/create', (req, res) => {
    const response = {
        success: false,
        message: '',
        let: []
    }

    try {
        let header = req.header.authentication;
        const userToken = jwt.verify(header.split(' ')[1], 'SECRET');

        const user = users.find(u => u.id === userToken.id);

        if (user) {
            notes.push({
                id: notes.length + 1,
                userId: user.id,
                text: req.body.text
            })
            console.log(notes);

            response.success = true;
            response.message = 'Note has been added successfully.'
        } else {
            response.message = 'There was some server error.'
        }

    } catch (e) {
        response.message = 'There was some server error.'
    }
    res.json(response);
})

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`))