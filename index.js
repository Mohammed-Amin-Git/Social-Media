const express = require('express'); // Handles routes
const sqlite3 = require('sqlite3'); // SQLite3 as database
const express_formidable = require('express-formidable'); // Handles form data
const cookie_parser = require('cookie-parser'); // Handles incoming cookies
const app = express();

const db = new sqlite3.Database('database.db'); // Uses the database.db file as a sqlite3 database

app.use(express.static('public'));
app.use(express_formidable());
app.use(cookie_parser());

// Creating Http server on port 3000
app.listen(3000, () => {
    console.log("Listening at port 3000");
});