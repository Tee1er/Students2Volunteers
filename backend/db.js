// Library w/ functions to interact with database

const sqlite3 = require("sqlite3").verbose();
const { formatUserInterests } = require("./reccomendations.js");
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
    db.get("PRAGMA foreign_keys = ON")
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
        db.run(`
            CREATE TABLE IF NOT EXISTS opportunity_interests (
                seniors BOOLEAN,
                animals BOOLEAN,
                tutoring BOOLEAN,
                environment BOOLEAN,
                mentorship BOOLEAN,
                foodpantry BOOLEAN,
                sports BOOLEAN,
                foodprep BOOLEAN,
                crafts BOOLEAN,
                music BOOLEAN,
                art BOOLEAN,
                mentalhealth BOOLEAN,
                health BOOLEAN,
                education BOOLEAN,
                government BOOLEAN,
                virtual BOOLEAN,
                inperson BOOLEAN,
                outdoors BOOLEAN,
                indoors BOOLEAN,
                creative BOOLEAN,
                technical BOOLEAN,
                writing BOOLEAN,
                science BOOLEAN,
                opportunity_id INTEGER NOT NULL,
                FOREIGN KEY (opportunity_id) REFERENCES opportunities(id)
            )`)
        db.run(`
            CREATE TABLE IF NOT EXISTS user_interests (
                user_id INTEGER NOT NULL,
                seniors BOOLEAN,
                animals BOOLEAN,
                tutoring BOOLEAN,
                environment BOOLEAN,
                mentorship BOOLEAN,
                foodpantry BOOLEAN,
                sports BOOLEAN,
                foodprep BOOLEAN,
                crafts BOOLEAN,
                music BOOLEAN,
                art BOOLEAN,
                mentalhealth BOOLEAN,
                health BOOLEAN,
                education BOOLEAN,
                government BOOLEAN,
                virtual BOOLEAN,
                inperson BOOLEAN,
                outdoors BOOLEAN,
                indoors BOOLEAN,
                creative BOOLEAN,
                technical BOOLEAN,
                writing BOOLEAN,
                science BOOLEAN,
                FOREIGN KEY (user_id) REFERENCES users(id)
            )`)
    });
}

function addUser(db, userDetails, userInterests) {

    rowNum = 0;
    // User details
    db.run("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [userDetails.username, userDetails.password, userDetails.email], function (err) {
        if (err) {
            throw new Error("Failed to add user to database: " + err);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
        rowNum = this.lastID
    });

    // User interests
    let formattedInterests = formatUserInterests(userInterests)

    db.run("INSERT INTO user_interests (user_id, seniors, animals, tutoring, environment, mentorship, foodpantry, sports, foodprep, crafts, music, art, mentalhealth, health, education, government, virtual, inperson, outdoors, indoors, creative, technical, writing, science) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [rowNum, formattedInterests.seniors, formattedInterests.animals, formattedInterests.tutoring, formattedInterests.environment, formattedInterests.mentorship, formattedInterests.foodpantry, formattedInterests.sports, formattedInterests.foodprep, formattedInterests.crafts, formattedInterests.music, formattedInterests.art, formattedInterests.mentalhealth, formattedInterests.health, formattedInterests.education, formattedInterests.government, formattedInterests.virtual, formattedInterests.inperson, formattedInterests.outdoors, formattedInterests.indoors, formattedInterests.creative, formattedInterests.technical, formattedInterests.writing, formattedInterests.science], function (err) {
            if (err) {
                throw new Error("Failed to add user interests to database: " + err);
            }
            console.log(`A row has been inserted with rowid ${this.lastID}`);

        })
}


function addOpportunity(db, opportunity_details) {
    db.run("INSERT INTO opportunities (title, description, signup_link, location, hours_given, organizer_name, organizer_email, organizer_phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [opportunity_details.title, opportunity_details.description, opportunity_details.signup_link, opportunity_details.location, opportunity_details.hours_given, opportunity_details.organizer_name, opportunity_details.organizer_email, opportunity_details.organizer_phone], function (err) {
        if (err) {
            throw new Error("Failed to add opportunity to database: " + err);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
}

// Test code

let db = loadDatabase();

createTables(db)

addUser(db, { username: "tyler", password: "password", email: "tyler.x.song@gmail.com" }, ["animals", "seniors"])

closeDatabase(db)

module.exports = {
    loadDatabase,
    closeDatabase,
    addOpportunity,
    // getOpportunities,
    addUser,
}