// Library w/ functions to interact with database

const sqlite3 = require("sqlite3").verbose();
// Create db + open it

// Loads database from file, returns it. If file doesn't exist, creates it.
function loadDatabase() {
    let db = new sqlite3.Database("db.sqlite", (err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Connected to the database.");
    });
    return db;
}

function closeDatabase(db) {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log("Closed the database connection.");
    });
}

function createTables(db) {
    db.serialize(() => {
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE, 
                password TEXT NOT NULL, 
                email TEXT NOT NULL,
                token TEXT,
                session_start INTEGER
            );`);
        db.run(`
            CREATE TABLE IF NOT EXISTS opportunities (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                description TEXT,
                signup_link TEXT,
                location TEXT NOT NULL,
                hours_given REAL,
                organizer_name TEXT NOT NULL,
                organizer_email TEXT NOT NULL,
                organizer_phone TEXT
            );`);
    });
}

function addUser(db, user_details) {
    db.run("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [user_details.username, user_details.password, user_details.email], function (err) {
        if (err) {
            throw new Error("Failed to add user to database: " + err);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
}

function addOpportunity(db, opportunity_details) {
    db.run("INSERT INTO opportunities (title, description, signup_link, location, hours_given, organizer_name, organizer_email, organizer_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [opportunity_details.title, opportunity_details.description, opportunity_details.signup_link, opportunity_details.location, opportunity_details.hours_given, opportunity_details.organizer_name, opportunity_details.organizer_email, opportunity_details.organizer_phone], function (err) {
        if (err) {
            throw new Error("Failed to add opportunity to database: " + err);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
}


module.exports = {
    loadDatabase,
    closeDatabase,
    addOpportunity
}