import express, { response } from "express";
import User from "../user.mjs";
import HttpCodes from "../httpErrorCodes.mjs";

const USER_API = express.Router();
//const express = require('express')

const users = [];
USER_API.get("/", (req, res) => {
  res.status(HttpCodes.SuccesfullResponse.Ok).json(users);
});

USER_API.get("/:id", (req, res) => {
  const userId = req.params.id;

  //res.send(users)
  res.status(HttpCodes.SuccesfullResponse.Ok).json(users);

  /// TODO:
  // Return user object
});

USER_API.post("/", (req, res, next) => {
  // This is using javascript object destructuring.
  // Recomend reading up https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#syntax
  // https://www.freecodecamp.org/news/javascript-object-destructuring-spread-operator-rest-parameter/
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
