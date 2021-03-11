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

app.post('/user/login', (req, res) => {
    const response = {
        success: false,
        messag: '',
        user: null
    }

    const user = users.find(u => u.username === req.body.username)

    if (user) {
        response.success = true;
        response.message = 'Logged in successfully.'
        response.user = user;
        response.token = jwt.sign({ id: user.id }, 'SECRET')
    } else {
        response.message = 'Unable to login, user not found.'
    }

    res.json(response);
})

app.get('/note/list', (req, res) => {
    const response = {
        success: false,
        message: '',
        list: []
    }
    try {
        let header = req.headers.authentication;
        console.log('req:', header)
        const userToken = jwt.verify(header.split(' ')[1], 'SECRET')
        console.log('req:', header.split(' ')[1])
        const user = users.find(u => u.id === userToken.id);
        console.log('req:', user)

        if (user) {
            response.list = notes.filter(n => n.userId === user.id).reverse();
            response.success = true;
        } else {
            response.message = 'You are not authorized.'
        }
    } catch (e) { response.message = 'You are not authorizied.'}

    res.json(response);
})

app.post('/note/create', (req, res) => {
    const response = {
        success: false,
        message: '',
        list: []
    }

    try {
        let header = req.headers.authentication;
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