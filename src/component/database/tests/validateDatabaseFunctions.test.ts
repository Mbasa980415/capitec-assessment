import test, { expect } from '@fixtures/baseTest.fixture';

let createdId: number;

test('Create record in tasks table @db', async ({ databaseHelper }) => {
  const input = {
    title: 'Complete technical assessment',
    completed: false,
    user_id: 1,
  };

  const record = await databaseHelper.createRecord(input);


  expect(record).toHaveProperty('id');
  expect(record.title).toBe(input.title);
  expect(record.completed).toBe(input.completed);
  expect(record.user_id).toBe(input.user_id);
  
});

//NB: in the below tests createdId can be updated with the Id of existing row. 

test('Retrieve record from the tasks table @db', async ({ databaseHelper }) => {
  createdId = 37
  const record = await databaseHelper.retrieveRecord(createdId);
  expect(record.id).toBe(createdId);
  expect(record.title).toBe('Complete technical assessment');
});

test('Update tasks table complete status @db', async ({ databaseHelper }) => {
  
  createdId = 37
  const updatedRecord = await databaseHelper.updateRecord(createdId, 'completed', true);

  expect(updatedRecord.completed).toBe(true);
  console.log(updatedRecord);
});

