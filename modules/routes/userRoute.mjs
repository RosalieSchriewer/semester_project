import express, { response } from "express";
import User from "../user.mjs";
import HTTPCodes from "../httpConstants.mjs";
import jwt from 'jsonwebtoken';
import { verifyToken } from "../authentication.mjs";

const USER_API = express.Router();

/* TEMPORARY HARDCODE USERS */
const users = []
  /*{id: 1, name: 'Vanilla Ice', email: 'vanilla@gmail.com', pswHash: 'password'}
]; */

//url: localhost:8080/user -->lists all users
/* 
USER_API.get("/", (req, res) => {
  res.status(HTTPCodes.SuccessfulResponse.Ok).json(users);
}); 
 */
//url: localhost:8080/user/id -->lists specific user

USER_API.get("/:id", verifyToken, (req, res) => { 
    const userId = parseInt(req.params.id, 10); //has to be parsed for some reason, didn't work if i didn't

    if (userId) {
      let foundId = users.find((user) => user.id === userId);

      if (foundId) {
        res.status(HTTPCodes.SuccessfulResponse.Ok).json(foundId);
      } else {
        res.status(HTTPCodes.ClientSideErrorResponse.NotFound).send("User not found").end();
      }
    } else {
      res.status(HTTPCodes.ClientSideErrorResponse.BadRequest).send("Invalid user ID").end();
    }
  });

/*   -----------NEW USER--------------- */
USER_API.post("/", (req, res, next) => {
  
  const { name, email, password } = req.body;

  if (name != "" && email != "" && password != "") {
    ///TODO: Do not save passwords.

    let exists = users.find((user) => user.email === email);

    if (!exists) {
      const user = new User();
      user.name = name;
      user.email = email;
      user.pswHash = password;
      users.push(user);
      res.status(HTTPCodes.SuccessfulResponse.Ok).end();
    } else {
      res
        .status(HTTPCodes.ClientSideErrorResponse.BadRequest)
        .send("This email is already in use.")
        .end();
    }
  } else {
    res
      .status(HTTPCodes.ClientSideErrorResponse.BadRequest)
      .send("Missing input")
      .end();
  }
});

/*   -----------LOGIN--------------- */

USER_API.post("/login", (req,res) => {
  const {email, pswHash} = req.body;
  console.log("hihihi" +req.body);

  const secretKey = 'mySecretKey';

  const user = users.find((user) => user.email === email && user.pswHash === pswHash)

  if(user) {
    const token = jwt.sign({
      userId: user.id,
      email: user.email
    },
    secretKey,
    {expiresIn: '1h'}
    )
    res.json({token});
  }else {
    res.status(HTTPCodes.ClientSideErrorResponse.Unauthorized).send("Wrong password or e-mail address.")
  }
})





//EDIT USER

USER_API.put("/:id", verifyToken, (req, res) => {
    const userId = parseInt(req.params.id, 10);

    if (!isNaN(userId)) {
      const foundIndex = users.findIndex((user) => user.id === userId);
  
      if (foundIndex !== -1) {
        const { name, email, password } = req.body;
        users[foundIndex].name = name 
        users[foundIndex].email = email 
        users[foundIndex].pswHash = password 
        res.status(HTTPCodes.SuccessfulResponse.Ok).end();
      } else {
        res.status(HTTPCodes.ClientSideErrorResponse.NotFound).send("User not found").end();
      }
    } else {
      res.status(HTTPCodes.ClientSideErrorResponse.BadRequest).send("Invalid user ID").end();
    }
  });
 




USER_API.delete("/:id", verifyToken, (req, res) => {
    const userId = parseInt(req.params.id, 10);

    if (!isNaN(userId)) {
      const foundIndex = users.findIndex((user) => user.id === userId);
  
      if (foundIndex !== -1) {
        users.splice(foundIndex, 1);
        res.status(HTTPCodes.SuccessfulResponse.Ok).end();
      } else {
        res.status(HTTPCodes.ClientSideErrorResponse.NotFound).send("User not found").end();
      }
    } else {
      res.status(HTTPCodes.ClientSideErrorResponse.BadRequest).send("Invalid user ID").end();
    }
});

export default USER_API;
