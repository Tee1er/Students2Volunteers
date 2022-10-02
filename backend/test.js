const axios = require('axios');

JSON.stringify({
    title: "Test opportunity",
    description: "Test description",
    signup_link: "Test signup link",
    location: "Test location",
    hours_given: 1,
    organizer_name: "Test organizer name",
    organizer_email: "Test organizer email",
    organizer_phone: "Test organizer phone",
})

// Send an HTTP POST request to the server
try {
    axios.post('http://localhost:3000/api/opportunities', {
        title: "Test opportunity",
        description: "Test description",
        signup_link: "Test signup link",
        location: "Test location",
        hours_given: 1,
        organizer_name: "Test organizer name",
        organizer_email: "Test organizer email",
        organizer_phone: "Test organizer phone",
    })
}
catch (err) { }