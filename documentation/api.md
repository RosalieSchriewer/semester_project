

## -----------------------------------------------------------------------------------------------

##### POST / -> Posts new user into database.

fetch url: "./user/"  
METHOD: POST
Expects: JSON

Required fields: {"name": "Example name",
"pswHash": "password",
"email": "example@email.com"}

## -----------------------------------------------------------------------------------------------

##### POST /login -> Checks user login data and assigns a token

fetch url: "./user/login"  
METHOD: POST
Expects: JSON
Returns: JSON {"token":}

Token contents: {
userId: the user's unique ID,
email: the user's email,
avatar_id: the user's avatar ID (only if applicable),
lightmode: the user's lightmode preference,
role: the user's role (admin or user),
iat: time when token issued,
exp: time when token expires}

Token expires after: 1h
Required fields: {
email: email,
password: pswHash}

## -----------------------------------------------------------------------------------------------

##### PUT /updateUser -> updates the user's information in the database

fetch url: "./user/updateUser"  
METHOD: PUT
Expects: JSON
Returns: JSON
{"id":
"name":
"pswHash":
"email":
"avatar_id":
"lightmode":
"role":
"lastLogin":}

Requires: Authentication (token)
required fields {"name": "New name",
"pswHash": "newPassword",
"email": "new@email.com"}

## -----------------------------------------------------------------------------------------------

##### DELETE /deleteUser -> Deletes a user from the database

fetch url: "./user/deleteUser"  
METHOD: DELETE
Requires: Authentication (token)

## -----------------------------------------------------------------------------------------------

##### GET /getUserById -> Returns the logged in user's info by the provided ID

fetch url: "./user/getUserById"  
METHOD: GET
Returns: JSON
{
"userInfo": {
"id":
"name":
"pswHash":
"email":
"avatar_id":
"lightmode":
"role":
"lastLogin":
}
}
Requires: Authentication (token)

## -----------------------------------------------------------------------------------------------

##### PUT /saveAvatar -> saves a user's avatar to the database

fetch url: "./user/saveAvatar"  
METHOD: PUT
Expects: JSON
Returns: JSON
{"eyeColor":,
"hairColor":,
"skinColor":,
"eyebrowType":}

Requires: Authentication (token)
Required fields: {
"eyeColor":,
"hairColor":,
"skinColor":,
"eyebrowType":}

## -----------------------------------------------------------------------------------------------

##### GET /getAvatar -> gets all traits of the current user's saved avatar

fetch url: "./user/getAvatar"  
METHOD: GET
Returns: JSON
{"eyeColor":,
"hairColor":,
"skinColor":,
"eyebrowType":}
Requires: Authentication (token)

## -----------------------------------------------------------------------------------------------

##### POST /generateShareableLink -> generates a link for sharing avatars

fetch url: "./user/generateShareableLink"  
METHOD: POST
Returns: JSON
{
  "shareableLink": 
}
Requires: Authentication (token)

the link contains a token that contains all the info of the to-be-shared avatar. 
It also adds an expiry of 1 day.

## -----------------------------------------------------------------------------------------------

##### POST /decodeSharedAvatar -> decodes token from link and reroutes to display the shared avatar

fetch url: "./user/decodeSharedAvatar"  
METHOD: POST
Returns: JSON
{
  "hairColor": 
  "eyeColor": 
  "skinColor": 
  "eyebrowType": 
  "iat": 
  "exp": 
}
Queries: token
Required fields: {
    "token":
}

## -----------------------------------------------------------------------------------------------

##### PUT /updateLightMode -> saves the users' lightmode preferences to the database

fetch url: "./user/updateLightMode"  
METHOD: PUT
Returns: JSON
{
  "lightmode": 2,
  "lightmodeUpdate": {
    "id": 
    "name": 
    "pswHash": 
    "email": 
    "avatar_id": 
    "lightmode": 
    "role": 
    "lastLogin": 
  }
}
Requires: Authentication (token)
Required fields: {"lightmode": 1 or 2}

## -----------------------------------------------------------------------------------------------

##### GET /getLightMode -> gets the users' lightmode preferences from the database

fetch url: "./user/getLightMode"  
METHOD: GET
Returns: JSON
{
  "lightmode": 
}
Requires: Authentication (token)

## -----------------------------------------------------------------------------------------------

##### GET admin/allUsers --> gets all users

fetch url: ".user/admin/allUsers" 
METHOD: GET
Returns:JSON
Object for each user:[ 
  {
    "id": 
    "name":
    "pswHash":
    "email": 
    "avatar_id": 
    "lightmode": 
    "role": 
    "lastLogin":
  }

]
Requires: Authentication (token). -->This has to be the token from a user with the role "admin"

## -----------------------------------------------------------------------------------------------

##### PUT admin/updateUserRole/:userId -->updates the users' role to either "user" or "admin"

fetch url: ".user/admin/updateUserRole/:userId" 
METHOD: PUT
Returns: JSON
{
  "id": 
  "name":
  "pswHash": 
  "email": 
  "avatar_id": 
  "lightmode": 
  "role": 
  "lastLogin": 
}
Requires: Authentication (token). -->This has to be the token from a user with the role "admin".
Required fields: {
"role": either admin or user
}
The users' id needs to be added in the fetch URL.