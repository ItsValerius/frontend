import * as dotenv from 'dotenv'
import Surreal from 'surrealdb.js';

dotenv.config()

const db = new Surreal(process.env.DATABASE_URL);



/**
 * Signs into the db as the user specified in the .env file.
 *
 * 
 * 
 */
export const dbSignin = async (): Promise<void> => {
    try {
        if (process.env.DATABASE_USER && process.env.DATABASE_PW && process.env.DATABASE_NS && process.env.DATABASE_DB) {
            await db.signin({
                user: process.env.DATABASE_USER,
                pass: process.env.DATABASE_PW,
            });



            // Select a specific namespace / database
            await db.use(process.env.DATABASE_NS, process.env.DATABASE_DB);

            console.log("Signed into DB at: " + process.env.DATABASE_URL + " as user: " + process.env.DATABASE_USER);
            return
        }
        throw Error("environment variables aren't set correctly")


    } catch (err) {
        console.log("Couldn Sign in");

        console.log(err);

    }
}



export default db