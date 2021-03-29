const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bookDictionary = require('./controllers/bookDictionary.controller');
const { sequelize } = require('./models/databaseConnector');
const app = express();
const config = require('config');

// DB connect
sequelize.sync({
    force: false,
}).then(() => {
    console.log('Succesfully connected to DB');
});

//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile('public/static/index.html', { root: __dirname })
});

app.use('/books', bookDictionary);

app.get('**', (req, res) => res.redirect('/'));

const server = app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`));