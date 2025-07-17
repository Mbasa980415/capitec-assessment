import { APIRequestContext, request } from '@playwright/test';

export async function apiAuth(): Promise<string> {
  const authContext = await request.newContext({
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'x-api-key': 'reqres-free-v1',
    },
  });

  const registerResponse = await authContext.post(`${process.env.API_BASE_URL!}/register`, {
    data: {
      email: process.env.API_USERNAME!,
      password: process.env.API_PASSWORD!,
    },
  });

  if (!registerResponse.ok()) {
    throw new Error(`Registration failed: ${registerResponse.status()}`);
  }

  const loginResponse = await authContext.post(`${process.env.API_BASE_URL!}/login`, {
    data: {
      email: process.env.API_USERNAME!,
      password: process.env.API_PASSWORD!,
    },
  });

  if (!loginResponse.ok()) {
    throw new Error(`Login failed: ${loginResponse.status()}`);
  }

  const { token } = await loginResponse.json();
  await authContext.dispose();

  return token;
}
