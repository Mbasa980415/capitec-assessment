import { test as baseTest, request, APIRequestContext } from "@playwright/test";
import { RegresApiCrud } from "@api/page/regresApiCrud.page";

const test = baseTest.extend<{
  apiRequestContext: APIRequestContext;
  regresApiCrud: RegresApiCrud;
}>({
  apiRequestContext: async ({}, use) => {

    const authContext = await request.newContext({
      extraHTTPHeaders: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1',
      },
    });

    const registerResponse = await authContext.post(`${process.env.API_BASE_URL}/register`, {
      data: {
        email: process.env.API_USERNAME,
        password: process.env.API_PASSWORD,
      },
    });

    if (!registerResponse.ok()) {
      throw new Error(`Registration failed with status: ${registerResponse.status()}`);
    }    

    const loginResponse = await authContext.post(`${process.env.API_BASE_URL}/login`, {
      data: {
        email: process.env.API_USERNAME,
        password: process.env.API_PASSWORD,
      },
    });

    if (!loginResponse.ok()) {
      throw new Error(`Login failed with status: ${loginResponse.status()}`);
    }

    const { token } = await loginResponse.json();
    console.log("Auth token: ", token);
    await authContext.dispose();

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
