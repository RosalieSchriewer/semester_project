import express from 'express' // Express is installed using npm
import USER_API from './modules/routes/userRoute.mjs'; // This is where we have defined the API for working with users.
import SuperLogger from './modules/superLogger.mjs';
//import 'dotenv/config'
import { verifyToken } from './modules/authentication.mjs';

// Creating an instance of the server
const server = express();
//server.use(express.static('public', { extensions: ['html', 'mjs'] }));
// Selecting a port for the server to use.
const port = (process.env.PORT || 8080);

server.set('port', port);

// Enable logging for server
 const logger = new SuperLogger();
server.use(logger.createAutoHTTPRequestLogger()); // Will log all http method requests 

// Defining a folder that will contain static files.
server.use(express.static('public'));


server.use(express.json());

// Telling the server to use the USER_API 
server.use("/user",  USER_API);

//server.put("/:id", verifyToken, USER_API.put);
//server.get("/user/:id", verifyToken, USER_API.get);

//server.post("/user", USER_API.post); 

// A get request handler example)
server.get("/", (req, res, next) => {

    res.status(200).send(JSON.stringify({ msg: "These are not the droids...." })).end();
});

// Start the server 
server.listen(server.get('port'), function () {
    console.log('server running', server.get('port'));
});
