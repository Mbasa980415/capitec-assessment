import { test as baseTest, } from '@playwright/test';
import { OnlineStore } from '@online-store/page/onlineStore.page'; 

const test = baseTest.extend<{
  onlineStore: OnlineStore;
}>({

  onlineStore: async ({ page }, use) => {
    const store = new OnlineStore(page);
    await use(store);
  },

});

export default test;
export const expect = test.expect;