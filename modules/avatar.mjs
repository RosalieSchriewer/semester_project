
import DBManager from "./storageManager.mjs";

/*  
// If you dont want to use class, this is one alternative

const User = function () {
  return {
    email: "",
    pswHash: "",
    name: "",
    id: null,
    save: Save,
  };

  function Save() {
    console.log(this.name);
  }
};

}*/


class Avatar {

  constructor() {
    ///TODO: Are these the correct fields for your project?
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
}

export default Avatar;