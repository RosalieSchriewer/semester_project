import DBManager from "./dbManager.mjs"


let idCounter = 0;

export default class User{

    constructor(){
        this.email;
        this.pswHash;
        //this.gravatar;
        this.name;
        this.id = generateId();
    }
    save(){
        DBManager.save(this)
    }
}

function generateId(){
    idCounter++;
return idCounter;
}

