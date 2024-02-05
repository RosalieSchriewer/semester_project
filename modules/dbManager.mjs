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
                rejectUnautherized: process.env.LIVE || false
            }
        }
    }

    async createUser(user){
        const client = new Client(this.#credentials)

        try{
            await client.connect();
            const output = await client.query(`INSERT INTO users (username, email, name) VALUES (${user.email}, ${user.name}, ${user.pswHash} 'john.doe@example.com'`);


            if(output.rows.length === 1){
                user.id = output.rows[0].id
            }
        }catch(error){

        }
    }
}

export default new DBManager(process.env)
