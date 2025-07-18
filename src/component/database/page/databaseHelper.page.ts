import client, {dbConnection}  from '@utils/dbConnection.util';

type UserInput = {
  title: string;
  completed: boolean;
  user_id: number;
};

export class DatabaseHelper {

  async createRecord(input: UserInput) {
    const record = await client.query(
      'INSERT INTO tasks (title, completed, user_id) VALUES ($1, $2, $3) RETURNING *;',
      [input.title, input.completed, input.user_id]);
      
    return record.rows[0];
  }

  async retrieveRecord(id: number) {
    const record = await client.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return record.rows[0];
  }

  async updateRecord(id: number, column: string, value: string | number | boolean) {
 
    const columnNames= ['title', 'completed', 'user_id']; //SECURITY: Prevention of malicious SQL query injection!
    if (!columnNames.includes(column)) {
      throw new Error('Invalid column name');
    }

    const record = await client.query(
      `UPDATE tasks SET ${column} = $1 WHERE id = $2 RETURNING *;`,
      [value, id]);
      
    return record.rows[0];
  }

  async connectDB(){

    await dbConnection();
  }

  async closeConnection(){
    
    await client.end();
  }

}
