const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : 'nhung@17',
        database : 'smart-brain'
    }
});

// console.log(knex.select('*').from('users'));
// db.select('*').from('users').then(data => {
//     console.log(data);
// });

const app = express();

app.use(cors());
app.use(express.json());

// temporary database, not being used anymore, just put it here for lateral reference
const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'nhung',
            email: 'nhung@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]

}

// not being used anymore, just put it here for lateral reference
app.get('/', (req, res) => {
    res.send(database.users);
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
})

// console.log(process.env)

/* 
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user

*/
