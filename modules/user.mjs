


let idCounter = 0;

export default class User{

    constructor(){
        this.email;
        this.pswHash;
        this.gravatar;
        this.name;
        this.id = generateId();
    }
}

function generateId(){
    idCounter++;
return idCounter;
}
