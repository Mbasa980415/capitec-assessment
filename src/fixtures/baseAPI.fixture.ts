import { test as baseTest, request, APIRequestContext } from "@playwright/test";
import { RegresApiCrud } from "@api/page/regresApiCrud.page";
import {apiAuth} from '@utils/apiAuth.util';

const test = baseTest.extend<{
  apiRequestContext: APIRequestContext;
  regresApiCrud: RegresApiCrud;
}>({
  apiRequestContext: async ({}, use) => {

    const token = await apiAuth();
    
    const context = await request.newContext({
      extraHTTPHeaders: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1',
      },
    });

    await use(context);
    await context.dispose();
  },

  regresApiCrud: async ({ apiRequestContext }, use) => {
    const crud = new RegresApiCrud(apiRequestContext);
    await use(crud);
  },
});

export default test;
export const expect = test.expect;
