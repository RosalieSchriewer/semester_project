
## User

GET / -> Returns current authenticated user object. If no authenticated user, returns 403 Not authorized.

fetch url: "./user/"  
METHOD: GET
Expects: JSON
Returns: JSON
Requires: Authentication (token)
Creates a user, required fields {name,password,email,....}

## -----------------------------------------------------------------------------------------------

POST / -> Posts new user into database.

fetch url: "./user/"  
METHOD: POST
Expects: JSON
Creates a user, 
required fields {name:      name,
                password:   pswHash,
                email:      email}
## -----------------------------------------------------------------------------------------------
POST /login -> Checks user login data and assigns a token

fetch url: "./user/login"  
METHOD: POST
Expects: JSON
Returns: JSON 
Token contents: {userId: the user's unique ID,
                email: the user's email,
                avatar_id: the user's avatar ID (only if applicable),
                lightmode: the user's lightmode preference,
                role: the user's role (admin or user)}
Token expires after: 1h
required fields {email:      email,
                password:   pswHash}


## -----------------------------------------------------------------------------------------------
PUT /updateUser -> updates the user's information in the database

fetch url: "./user/updateUser"  
METHOD: PUT
Expects: JSON
Returns: JSON 
Requires: Authentication (token)
required fields {name:      name,
                password:   pswHash,
                email:      email}

## -----------------------------------------------------------------------------------------------
DELETE /delete -> Deletes a user from the database

fetch url: "./user/delete"  
METHOD: DELETE
Returns: JSON 
Requires: Authentication (token)

## -----------------------------------------------------------------------------------------------
GET /getUserById -> Returns the logged in user's info by the provided ID

fetch url: "./user/getUserById"  
METHOD: GET
Returns: JSON 
Requires: Authentication (token)


## -----------------------------------------------------------------------------------------------
PUT /saveAvatar -> saves a user's avatar to the database

fetch url: "./user/saveAvatar"  
METHOD: PUT
Expects: JSON
Returns: JSON 
Requires: Authentication (token)
required fields {eyeColor,
                hairColor,
                skinColor,
                eyebrowType}


## -----------------------------------------------------------------------------------------------
GET /getAvatar -> gets all traits of the current user's saved avatar

fetch url: "./user/getAvatar"  
METHOD: GET
Returns: JSON 
Requires: Authentication (token)
## -----------------------------------------------------------------------------------------------
POST /generateShareableLink -> generates a link for sharing avatars

fetch url: "./user/generateShareableLink"  
METHOD: POST
Returns: JSON 
Requires: Authentication (token)

the link contains a token that contains all the info of the to-be-shared avatar

## -----------------------------------------------------------------------------------------------
GET /shareable-link -> decodes token from link and reroutes to display the shared avatar

fetch url: "./user/shareable-link"  
METHOD: GET
Returns: JSON 


