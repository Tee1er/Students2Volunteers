const express = require("express");
const app = express();
const port = 3000;

const auth = require("./auth.js");
const { loadDatabase, closeDatabase } = require("./db.js");

let db = loadDatabase();

app.use(express.static("../frontend"))

// Log in request
app.get("/api/login", (req, res) => {
    let username = req.query.username;
    let password = req.query.password;

    // Authenticate user
    let token = auth.authenticateUser(db, username, password);
    res.send(JSON.stringify({ "token": token }));
});

// Add an opportunity
app.post("/api/opportunities", (req, res) => {
    let opportunity_details = JSON.parse(req.body);
    db.addOpportunity(db, opportunity_details);
    res.send("Opportunity added");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})

process.on("SIGINT", function () {
    console.log("Interrupt, closing db & exiting.");
    closeDatabase(db);
    process.exit();
});