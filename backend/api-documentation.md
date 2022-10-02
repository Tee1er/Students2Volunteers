# API Documentation
### For Students2Volunteers backend

All returned data is in JSON format.

## Log in & authentication

### POST /api/login?username=username&password=password
Will return a token that can be used for authentication.

Server will generate a random token for the user & store it in the database - with each request, include the API key as a parameter like so:
```/api/endpoint?api_key=YOUR_API_KEY```

All requests to the API must be authenticated with a valid API key.

## Request volunteer opportunities

### GET /api/volunteer-opportunities
Will return a list of reccomended volunteer-opportunities for the user

#### **Parameters**
`length`: The number of volunteer opportunities to return. Default is 10.

`interest`: The interest of the volunteer opportunities to return. Default is all interests specified by the user.

**Example:** `/api/volunteer-opportunities?length=5&interest=animals`

