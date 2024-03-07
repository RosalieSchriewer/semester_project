
import DBManager from "./storageManager.mjs";
import jwt from "jsonwebtoken";



class Avatar {

  constructor() {
   
    this.hairColor;
    this.eyeColor;
    this.skinColor;
    this.eyebrowType
    this.id;
    
  }

  async save() {

  
    if (this.id == null) {
      return await DBManager.saveAvatar(this);
    }
  }/*  else {
      return await DBManager.updateAvatar(this);
    }
  }

  delete() {

  
    DBManager.deleteAvatar(this);
  } */
  //NOT IN USE, if time --> TODO

}

export default Avatar;