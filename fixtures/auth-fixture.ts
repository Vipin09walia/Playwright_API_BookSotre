import { APIRequestContext, expect } from '@playwright/test';

export async function signup(request: APIRequestContext, email: string, password: string) {
  const res = await request.post('/signup', {
    data: { email, password }
  });
  expect([200, 201, 400]).toContain(res.status()); // 400 if already registered
  return res;
}

export async function login(request: APIRequestContext, email: string, password: string) {
  const res = await request.post('/login', {
    data: { email, password }
  });
  expect(res.status()).toBe(200);
  const body = await res.json();
  return body.access_token;
}
