// const dbManager = require("./db.js");

// // Get database

// // let db = dbManager.loadDatabase();

// User interest class

// Input list of user interest strings, returns object with boolean values for each interest. 
function formatUserInterests(interests) {
    // Same list of interests from db.js
    let formattedInterests = {
        seniors: false,
        animals: false,
        tutoring: false,
        environment: false,
        mentorship: false,
        foodpantry: false,
        sports: false,
        foodprep: false,
        crafts: false,
        music: false,
        art: false,
        mentalhealth: false,
        health: false,
        education: false,
        government: false,
        virtual: false,
        inperson: false,
        outdoors: false,
        indoors: false,
        creative: false,
        technical: false,
        writing: false,
        science: false,
    }
    for (interest of interests) {
        formattedInterests[interest] = true;
    }
    return formattedInterests

}

// Get user interests by ID
function getUserInterests(db, id) {
    db.get("SELECT * FROM user WHERE user_id = ?", [id], function (err, row) {
        if (err) {
            throw new Error("Failed to get user interests: " + err);
        }
        console.log(row)
        console.log(typeof row)
    });
    return interests;
}

module.exports = {
    formatUserInterests,
    getUserInterests,
}