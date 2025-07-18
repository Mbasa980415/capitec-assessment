import { Client } from "pg";

const client = new Client({
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  user: process.env.DB_USER!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
});

export async function dbConnection(){
    try {

        await client.connect();
        console.log('DB connected successfully!');

    } 
    catch (err) {
        console.error('DB connection failed! :', err);
        process.exit(1);
    }
}

export default client;