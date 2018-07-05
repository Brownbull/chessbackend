// libs
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

// routes
const games = require('./controllers/games');

// database
const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: true
    }
});
// const db = knex({
//     client: 'pg',
//     // version: '7.2',
//     connection: {
//         host: '127.0.0.1',
//         user: 'postgres',
//         password: '928236543',
//         database: 'chessBack',
//         schema: 'DEV01'
//     }
// });

// calls
const app = express();
app.use(bodyParser.json());
app.use(cors());

// RESTful
app.get('/', (req, res) => { res.send("hi")})
app.post('/gameadd', (req, res) => { games.handleAdd(req, res, db) }) 
app.get('/games/', (req, res) => { games.handleGames(req, res, db) }) 
app.get('/games/:id', (req, res) => { games.handleGame(req, res, db) }) 

// LISTEN
app.listen(process.env.PORT || 3000, () => {
    console.log('Server Started...');
})