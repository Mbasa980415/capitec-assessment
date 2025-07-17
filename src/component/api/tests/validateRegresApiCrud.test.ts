import test, {expect} from '@fixtures/baseAPI.fixture'

let createdUserId: string;

const userInput = {
  name: 'Mbasa Gwama',
  job: 'Test Automation Engineer',
  task: 'Complete technical assessment',
  status: false
};

test('Create a record @api', async ({regresApiCrud}) => {

    const res = await regresApiCrud.createRecord(userInput);
    expect(res).toHaveProperty('id');
    createdUserId = res.id;
    console.log(res);
});

/**
 * To be noted: Regres.in mock APi. It simulates the responses but does not actually store the data we send
 * The data retrieved will be random and not the same one sent even though Id is the same.
 */
test('retrieve a record @api', async({regresApiCrud})=>{

    const res = await regresApiCrud.retrieveRecord(Number (createdUserId));
    expect(res.data[0]).toHaveProperty('name');
    console.log(res);
});

test('update record @api', async({regresApiCrud})=>{

    const updatedInput = {
        ...userInput,
        status: true
    };

    const res = await regresApiCrud.updateRecord(Number (createdUserId), updatedInput);
    console.log(res);
});
