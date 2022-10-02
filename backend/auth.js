let { randomBytes } = require('crypto');

// Authenticate user
// Returns token if successful, else returns null
function authenticateUser(db, username, password) {

    let user;

    // Check to see if username & password match database
    db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], function (err, row) {
        if (err) {
            throw new Error("Failed to authenticate user: " + err);
        }
        user = row
    });

    // Generate token and store in database, as well as when the session started

    token = generateToken();

    db.run("UPDATE users SET token = ?, session_start = ? WHERE username = ?", [token, Date.now(), username], function (err) {
        if (err) {
            throw new Error("Failed to update user token: " + err);
        }
    });
    return token;
}

// Generate token
function generateToken() {
    // Base 64 encoded random number
    return randomBytes(64).toString('base64');
}

function checkUserSession(id) {
    // Check to see if user session is still valid
    // If it is, return true else return false

    let user;

    // Get user from database
    db.get("SELECT * FROM users WHERE id = ?", [id], function (err, row) {
        if (err) {
            throw new Error("Failed to authenticate user: " + err);
        }
        user = row
    });

    // Check if user has a token
    if (user["token"] != null && user["session_start"] != null) {
        // Check if session is still valid
        if (Date.now() - user["session_start"] <= 3600000) {
            return true;
        } else {
            // Session expired
            return false;
        }
    }

}



module.exports = {
    authenticateUser,
    checkUserSession,
}