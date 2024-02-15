import express, { raw } from "express";
import User from "../user.mjs";
import HTTPCodes from "../httpConstants.mjs";
import jwt from 'jsonwebtoken';
import { verifyToken } from "../authentication.mjs";
import  DBManager from "../storageManager.mjs";

const USER_API = express.Router();

const users = []


//url: localhost:8080/user -->lists all users
/* 
USER_API.get("/user", (req, res) => {
  res.status(HTTPCodes.SuccessfulResponse.Ok).json(users);
}); 
 */
//url: localhost:8080/user/id -->lists specific user
/*
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
  });*/

/*   -----------NEW USER--------------- */
USER_API.post("/",async (req, res, next) => {
  
  const { name, email, pswHash } = req.body;

  if (name != "" && email != "" && pswHash != "") {
    ///TODO: Do not save passwords.

    let exists = await DBManager.getUserByEmail(email)
    console.log(exists)

    if (!exists) {
      let user = new User();
      user.name = name;
      user.email = email;
      user.pswHash = pswHash;
      users.push(user);
      res.status(HTTPCodes.SuccessfulResponse.Ok).end();
      //TODO: What happens if this fails?
      user = await user.save();
     // res.status(HTTPCodes.SuccessfulResponse.Ok).json(JSON.stringify(user)).end();
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

USER_API.post("/login", async (req,res) => {
  const {email, pswHash} = req.body;
  console.log(req.body);

  const secretKey =  process.env.SECRET_KEY;;

  const user = await DBManager.getUserByEmailAndPassword(email, pswHash);

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
USER_API.put("/updateUser", verifyToken, async (req, res, next) => {
  const {email, pswHash,name} = req.body
  const userId = req.user.userId;
  

  try {
    const userUpdate = await DBManager.updateUser(name, email, pswHash, userId);
    res.status(HTTPCodes.SuccessfulResponse.Ok).json( userUpdate );
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).send("Internal Server Error").end();
  }


 
});

 

USER_API.delete("/deleteUser", verifyToken, async (req, res, next) => {
  const userId = req.user.userId;
  try {
    const userDeletion = await DBManager.deleteUser(userId);
    res.status(HTTPCodes.SuccessfulResponse.Ok).json( userDeletion );
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).send("Internal Server Error").end();
  }
});

USER_API.get('/token/', verifyToken, async (req, res) =>{
  //let userId = await storageManager.getUserById(userId)

const userId = await DBManager.getUserById(id)
    res.json({ userId });
})

USER_API.get('/getUserId', verifyToken, (req, res,next) =>{
  //let userId = await storageManager.getUserById(userId)

const userId = req.user.userId
//req.params.id

res.json({userId})
})


USER_API.get('/getUserById', verifyToken, async (req, res, next) =>{
 
  const userId = req.user.userId
  let userInfo = await DBManager.getUserById(userId)
  
res.json({userInfo})

  
})
////--------------DELETE THIS LATER-----------------
USER_API.get('/', async (req, res) =>{
 
 
  let allUsers = await DBManager.getAllUsers()
 res.status(200).json(allUsers)
 return allUsers;

  
})
//----------------------------------------------------
export default USER_API;
