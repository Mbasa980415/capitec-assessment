import test, {expect} from '@fixtures/baseAPI.fixture'

let createdUserId: string;
test('Create a record @API', async ({regresApiCrud}) => {

    const res = await regresApiCrud.createRecord('Alice', 'Engineer');
    expect(res).toHaveProperty('id');
    createdUserId = res.id;
    console.log(createdUserId);
});

test('retrieve a record @API', async({regresApiCrud})=>{

    const res = await regresApiCrud.retrieveRecord(Number (createdUserId));
    console.log(res);
});