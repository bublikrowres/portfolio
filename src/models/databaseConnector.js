const Sequelize = require('sequelize');
const config = require('config');
const BookModel = require('./book.model');

const dbConfig = {
    database: config.get('mysql.database'),
    username: config.get('mysql.username'),
    password: config.get('mysql.password'),
    host: config.get('mysql.host'),

};

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'mysql'
});

const Book = sequelize.define("book", BookModel);

module.exports = { sequelize, Book };