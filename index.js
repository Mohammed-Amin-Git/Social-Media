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

app.post("/register", (req, res) => {
    let username = req.fields.username;
    let email = req.fields.email;
    let password = req.fields.password;

    db.all("SELECT * FROM users WHERE username = ? OR email = ?", [username, email], (err, rows) => {
        if(rows.length > 0) {
            res.redirect("/register?alreadytaken")
        } else {
            db.run("INSERT INTO users (username, email, password) VALUES(?,?,?);", [username, email, password]);
            res.redirect("/register/success")
        }
    });
});

