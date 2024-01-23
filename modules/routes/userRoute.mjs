import express, { response } from "express";
import User from "../user.mjs";
import HttpCodes from "../httpErrorCodes.mjs";

const USER_API = express.Router();
//const express = require('express')

const users = [];

//url: localhost:8080/user -->lists all users

USER_API.get("/", (req, res) => {
  res.status(HttpCodes.SuccesfullResponse.Ok).json(users);
}); 

//url: localhost:8080/user/id -->lists specific user

USER_API.get("/:id", (req, res) => { 
    const userId = parseInt(req.params.id, 10); //has to be parsed for some reason, didnt work if i didnt

    if (userId) {
      let foundId = users.find((user) => user.id === userId);

      if (foundId) {
        res.status(HttpCodes.SuccesfullResponse.Ok).json(foundId);
      } else {
        res.status(HttpCodes.ClientSideErrorResponse.NotFound).send("User not found").end();
      }
    } else {
      res.status(HttpCodes.ClientSideErrorResponse.BadRequest).send("Invalid user ID").end();
    }
  });

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
      res.status(HttpCodes.SuccesfullResponse.Ok).end();
    } else {
      res
        .status(HttpCodes.ClientSideErrorResponse.BadRequest)
        .send("This email is already in use.")
        .end();
    }
  } else {
    res
      .status(HttpCodes.ClientSideErrorResponse.BadRequest)
      .send("Missing input")
      .end();
  }
});

USER_API.put("/:id", (req, res) => {
  /// TODO: Edit user
});

USER_API.delete("/:id", (req, res) => {
  /// TODO: Delete user.
});

export default USER_API;
