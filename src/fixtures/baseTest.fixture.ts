import { test as baseTest, } from '@playwright/test';
import { OnlineStore } from '@online-store/page/onlineStore.page'; 
import { DatabaseHelper } from '@database/page/databaseHelper.page';

const test = baseTest.extend<{
  onlineStore: OnlineStore;
  databaseHelper: DatabaseHelper;
}>({

  onlineStore: async ({ page }, use) => {
    const store = new OnlineStore(page);
    await use(store);
  },

  databaseHelper: async ({}, use) =>{
    const helper = new DatabaseHelper();
    await use(helper);

  }

});

export default test;
export const expect = test.expect;