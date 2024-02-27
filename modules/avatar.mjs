
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

    /// TODO: What happens if the DBManager fails to complete its task?

    // We know that if a user object dos not have the ID, then it cant be in the DB.
    if (this.id == null) {
      return await DBManager.saveAvatar(this);
    } else {
      return await DBManager.updateAvatar(this);
    }
  }

  delete() {

    /// TODO: What happens if the DBManager fails to complete its task?
    DBManager.deleteAvatar(this);
  }
  /* generateShareableLink() {
    const tokenPayload = {
      hairColor: this.hairColor,
      eyeColor: this.eyeColor,
      skinColor: this.skinColor,
      eyebrowType: this.eyebrowType,
    };

   
    const token = jwt.sign(tokenPayload,process.env.SECRET_KEY, { expiresIn: '1 day' });

    const shareableLink = `/http://localhost:8080/shareable-avatar?token=${token}`;
    return shareableLink;
  } */
}

export default Avatar;