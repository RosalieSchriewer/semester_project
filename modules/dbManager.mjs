import pg from "pg"

//ALL DATABASE STUFF HERE

if (process.env){}

const dbConnectionString = process.env.DB_CONNECTIONSTRING

class DBManager {
    #credentials = {};
    constructor(connectionstring){
        this.#credentials = {
            connectionstring,
            ssl: {
                rejectUnauthorized: process.env.LIVE || false
            }
        }
    }

    async createUser(user){
        const client = new Client(this.#credentials)

        try{
            await client.connect();
            const output = await client.query(`INSERT INTO Users ("id","name","pswHash","email") 
            VALUES (${user.id},${user.name}, ${user.pswHash}, ${user.email}`);


            if(output.rows.length === 1){
                user.id = output.rows[0].id
            }
        }catch(error){

        }
    }
}

export default new DBManager(process.env)
