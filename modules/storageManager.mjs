import pg from "pg"
import SuperLogger from "./superLogger.mjs";
import jwt from 'jsonwebtoken'
import userId from "./routes/userRoute.mjs"

// We are using an environment variable to get the db credentials 
/* if (process.env.DB_CONNECTIONSTRING == undefined) {
    throw ("You forgot the db connection string");
} */

/// TODO: is the structure / design of the DBManager as good as it could be?

class DBManager {

    #credentials = {};

    constructor(connectionString) {
        this.#credentials = {
            connectionString,
            ssl: (process.env.DB_SSL === "true") ? process.env.DB_SSL : false
        };

    }

    async updateUser(name,email,pswHash,userId) {

        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            const output = await client.query('UPDATE "public"."Users" SET "name" = $1, "email" = $2, "pswHash" = $3 WHERE id = $4 RETURNING *;', 
            [name, email, pswHash, userId]);

            // Client.Query returns an object of type pg.Result (https://node-postgres.com/apis/result)
            // Of special interest is the rows and rowCount properties of this object.

            //TODO Did we update the user?
            return output.rows[0];

            if (output.rows.length > 0) {
                const updatedUser = output.rows[0];
                return updatedUser;
              } else {
                throw new Error("User not found or not updated");
              }
            } catch (error) {
              console.error("Error updating user:", error);
              throw error; 
            } finally {
              client.end(); // Always disconnect from the database.
            }

        return user;

    }

    async deleteUser(userId) {

        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            const output = await client.query('Delete from "public"."Users"  where id = $1;', [userId]);

            // Client.Query returns an object of type pg.Result (https://node-postgres.com/apis/result)
            // Of special intrest is the rows and rowCount properties of this object.

            //TODO: Did the user get deleted?
            

        } catch (error) {
            //TODO : Error handling?? Remember that this is a module seperate from your server 
        } finally {
            client.end(); // Always disconnect from the database.
        }

        
    }

    async getUserByEmail(email) {
        const client = new pg.Client(this.#credentials);

        try {
          await client.connect();
    
          const output = await client.query('SELECT * FROM "public"."Users" WHERE email = $1', [email]);
    
          return output.rows[0];
        } catch (error) {
          console.error('Error getting user by email:', error);
          throw error;
        } finally {
          client.end();
        }
      }

    async createUser(user) {

        const client = new pg.Client(this.#credentials);

        try {
            await client.connect();
            const output = await client.query('INSERT INTO "public"."Users"("name", "email", "pswHash") VALUES($1::Text, $2::Text, $3::Text) RETURNING id;', [user.name, user.email, user.pswHash]);

            // Client.Query returns an object of type pg.Result (https://node-postgres.com/apis/result)
            // Of special interest is the rows and rowCount properties of this object.

            if (output.rows.length == 1) {
                // We stored the user in the DB.
                user.id = output.rows[0].id;
            }

        } catch (error) {
            console.error(error);
            //TODO : Error handling?? Remember that this is a module seperate from your server 
        } finally {
            client.end(); // Always disconnect from the database.
        }

        return user;

    }

    async getUserByEmailAndPassword(email,pswHash) {
        const client = new pg.Client(this.#credentials);

        try {
          await client.connect();
    
          const output = await client.query('SELECT * FROM "public"."Users" WHERE email = $1 AND "pswHash" = $2', [email, pswHash]);
    
          return output.rows[0];
        } catch (error) {
          console.error('Error fetching user by email and password:', error);
          throw error;
        } finally {
          client.end();
        }
      }

 

      async getUserById(userId) {
        const client = new pg.Client(this.#credentials);
    
        try {
            await client.connect();
    
            const output = await client.query('SELECT * FROM "public"."Users" WHERE id = $1', [userId]);
    
            return output.rows[0];
        } catch (error) {
            console.error('Error getting user by ID:', error);
            throw error;
        } finally {
            client.end();
        }
    }
    
    async getAllUsers() {
        const client = new pg.Client(this.#credentials);
    
        try {
            await client.connect();
    
            const output = await client.query('SELECT * FROM public."Users"');
    
            return output.rows;
        } catch (error) {
            console.error('cant get all users:', error);
            throw error;
        } finally {
            client.end();
        }
    }

}








export default new DBManager(process.env.DB_CONNECTIONSTRING);

//