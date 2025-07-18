import test, { expect } from '@fixtures/baseTest.fixture';
import { createTable, dropTable } from '@utils/manageDB.util';

let createdId: number;

test.beforeAll('Setup connection and data', async({databaseHelper})=>{
    await databaseHelper.connectDB();
    await createTable();
    const record = await databaseHelper.createRecord({
      title: 'Complete technical assessment',
      completed: false,
      user_id: 1,
    });
    createdId = record.id;
});

test.afterAll('Clean up and close connection', async({databaseHelper})=>{
  await dropTable();
  await databaseHelper.closeConnection();
});

test('Retrieve record from the tasks table @db', async ({ databaseHelper }) => {

  const record = await databaseHelper.retrieveRecord(createdId);
  expect(record.id).toBe(createdId);
  expect(record.title).toBe('Complete technical assessment');
});

test('Update tasks table complete status @db', async ({ databaseHelper }) => {
  
  const updatedRecord = await databaseHelper.updateRecord(createdId, 'completed', true);
  expect(updatedRecord.completed).toBe(true);

});

