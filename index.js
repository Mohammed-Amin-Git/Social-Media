const express = require('express');
const sqlite3 = require('sqlite3');
const express_formidable = require('express-formidable');
const cookie_parser = require('cookie-parser');
const app = express();

const db = new sqlite3.Database('database.db');

app.use(express.static('public'));
app.use(express_formidable());
app.use(cookie_parser());

app.listen(3000, () => {
    console.log("Listening at port 3000");
});