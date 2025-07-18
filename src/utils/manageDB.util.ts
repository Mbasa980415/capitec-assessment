import client from '@utils/dbConnection.util';

export async function createTable() {
  await client.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT,
      completed BOOLEAN,
      user_id INT
    );
  `);
  console.log('Table created successfully');
}

export async function dropTable() {
  await client.query(`
    DROP TABLE IF EXISTS tasks;
  `);
  console.log('Table dropped successfully');
}
