import express, { raw } from "express";
import User from "../user.mjs";
import HTTPCodes from "../httpConstants.mjs";
import jwt from 'jsonwebtoken';
import { verifyToken } from "../authentication.mjs";
import  DBManager from "../storageManager.mjs";

const USER_API = express.Router();

const users = []




/*   -----------NEW USER--------------- */
USER_API.post("/", async (req, res) => {
  try {
    const { name, email, pswHash } = req.body;

    if (!name || !email || !pswHash) {
      throw new Error("Missing input");
    }

    const exists = await DBManager.getUserByEmail(email);

    if (exists) {
      throw new Error("This email is already in use.");
    }

    let user = new User();
    user.name = name;
    user.email = email;
    user.pswHash = pswHash;

    // Save user to DB
    await user.save();

    res.status(HTTPCodes.SuccessfulResponse.Ok).end();
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(HTTPCodes.ClientSideErrorResponse.BadRequest).send(error.message).end();
  }
});
/*   -----------LOGIN--------------- */

USER_API.post("/login", async (req, res) => {
  try {
    const { email, pswHash } = req.body;
    const secretKey = process.env.SECRET_KEY;

    const user = await DBManager.getUserByEmailAndPassword(email, pswHash);

    if (!user) {
      throw new Error("Wrong password or e-mail address.");
    }

    const token = jwt.sign({
      userId: user.id,
      email: user.email
    }, secretKey, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(HTTPCodes.ClientSideErrorResponse.Unauthorized).send(error.message);
  }
});

/*   -----------EDIT--------------- */
USER_API.put("/updateUser", verifyToken, async (req, res) => {
  try {
    const { email, pswHash, name } = req.body;
    const userId = req.user.userId;

    const userUpdate = await DBManager.updateUser(name, email, pswHash || undefined, userId);
    res.status(HTTPCodes.SuccessfulResponse.Ok).json(userUpdate);
  } catch (error) {
    console.error("Error updating user:", error.message);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).send("Internal Server Error");
  }
});

 
/*   -----------DELETE--------------- */
USER_API.delete("/deleteUser", verifyToken, async (req, res, next) => {
  
  try {
    const userId = req.user.userId;
    const userDeletion = await DBManager.deleteUser(userId);
    res.status(HTTPCodes.SuccessfulResponse.Ok).json( userDeletion );
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).send("Internal Server Error").end();
  }
});

/*   -----------GET ID--------------- */
USER_API.get('/getUserId', verifyToken, (req, res) =>{

const userId = req.user.userId

res.json({userId})
})

/*   -----------GET USER BY ID--------------- */
USER_API.get('/getUserById', verifyToken, async (req, res, next) =>{
 
  try {
    const userId = req.user.userId;
    const userInfo = await DBManager.getUserById(userId);
    res.json({ userInfo });
  } catch (error) {
    console.error("Error getting user by ID:", error.message);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).send("Internal Server Error");
  }  
})

////--------------ALL USERS-----------------
USER_API.get('/', async (req, res) =>{
 
  try {
    const allUsers = await DBManager.getAllUsers();
    res.status(HTTPCodes.SuccessfulResponse.Ok).json(allUsers);
  } catch (error) {
    console.error("Error fetching all users:", error.message);
    res.status(HTTPCodes.ServerErrorResponse.InternalError).send("Internal Server Error");
  }
});
//----------------------------------------------------
export default USER_API;
