
## User

GET / -> Returns current authenticated user object. If no authenticated user, returns 403 Not authorized.

"/"  
METHOD: POST
Expects: JSON
Returns: JSON
Requires: Authentication (token)
Creates a user, required fields {name,password,email,....}