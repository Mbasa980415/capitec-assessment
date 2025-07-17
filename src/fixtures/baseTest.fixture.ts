import { test as baseTest, } from '@playwright/test';
import { OnlineStore } from '@online-store/page/onlineStore.page'; 
import { DatabaseHelper } from '@database/page/databaseHelper.page';
import client, { dbConnection } from '@utils/dbConnection.util';

const test = baseTest.extend<{
  onlineStore: OnlineStore;
  databaseHelper: DatabaseHelper;
}>({

  onlineStore: async ({ page }, use) => {
    const store = new OnlineStore(page);
    await use(store);
  },

  databaseHelper: async ({}, use) =>{

    await dbConnection();
    const helper = new DatabaseHelper(client);

    await use(helper);
    await client.end();
  }

});

export default test;
export const expect = test.expect;