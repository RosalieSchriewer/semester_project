import pg from "pg"
import { generateHash } from './crypto.mjs';



class DBManager {

    #credentials = {};

    constructor(connectionString) {
        this.#credentials = {
            connectionString,
            ssl: (process.env.DB_SSL === "true") ? process.env.DB_SSL : true
        };

    }

    async updateUser(name, email, pswHash, userId) {
      const client = new pg.Client(this.#credentials);
  
      try {
          await client.connect();
          const queryParams = [name, email];
          
          // Check if a new password is provided
          if (pswHash !== undefined) {
              pswHash = generateHash(pswHash);
              queryParams.push(pswHash);
          }
          
          queryParams.push(userId); 
          
          const output = await client.query(
              'UPDATE "public"."Users" SET "name" = $1, "email" = $2' + 
              (pswHash !== undefined ? ', "pswHash" = $3' : '') + 
              ' WHERE id = $' + (pswHash !== undefined ? '4' : '3') + ' RETURNING *',
              queryParams
          );
  
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
          user.pswHash = generateHash(user.pswHash)
            await client.connect();
            const output = await client.query('INSERT INTO "public"."Users"("name", "email", "pswHash") VALUES($1::Text, $2::Text, $3::Text) RETURNING id;',
             [user.name, user.email, user.pswHash]);

            if (output.rows.length == 1) {
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
          pswHash= generateHash(pswHash);
          const output = await client.query('SELECT * FROM "public"."Users" WHERE email = $1 AND "pswHash" = $2', 
          [email, pswHash]);
    
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

    async saveAvatar( hairColor, eyeColor, skinColor, eyebrowType) {
        const client = new pg.Client(this.#credentials);
    
        try {
            await client.connect();
            
            const output = await client.query('INSERT INTO "public"."Avatar"( "hairColor", "eyeColor", "skinColor", "eyebrowType") VALUES($1, $2, $3, $4)',
            [ hairColor, eyeColor, skinColor, eyebrowType]);
    
           /*  if (output.rows.length > 0) { */
                const savedAvatar = output.rows[0];
                return savedAvatar;
           /*  } else {
                throw new Error("Avatar not saved");
            } */
        } catch (error) {
            console.error("Error saving Avatar:", error);
            throw error;
        } finally {
            client.end(); // Always disconnect from the database.
        }
    }

}








export default new DBManager(process.env.DB_CONNECTIONSTRING_LOCAL);

//