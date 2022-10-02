// Send an HTTP POST request to the server

function postOpportunity(details) {

    console.log(validateDetails(details))

    if (!(validateDetails(details).isValid)) {
        return
    }

    axios.post("/api/opportunities", details)
}

class FormValidity {

    // isValid: bool
    // invalidFields: array of objects with fields: name, message
    constructor(isValid, invalidFields) {
        this.isValid = isValid;
        this.invalidFields = invalidFields;
    }

    addInvalidField(name, message) {
        this.isValid = false;
        this.invalidFields.push({ name: name, message: message });
    }
}

function validateDetails(details) {
    let requiredAttributes = ["title", "location", "hours_given", "organizer_name", "organizer_email"];

    let validity = new FormValidity(true, []);

    for (attr of requiredAttributes) {
        if (!details[attr]) {
            validity.addInvalidField(attr, "This field is required");
        }
    }
    return validity
}

postOpportunity({
    title: "Test opportunity",
    description: "Test description",
    signup_link: "Test signup link",
    location: "Test location",
    hours_given: 1,
    organizer_name: "Test organizer name",
    organizer_email: "Test organizer email",
    organizer_phone: "Test organizer phone",
})