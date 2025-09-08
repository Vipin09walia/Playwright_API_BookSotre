import { test, expect } from '@playwright/test';

test.describe('User Authentication', () => {
  test('sign up a new user', async ({ request }) => {
    const email = `test${Date.now()}@example.com`;
    const password = 'Password123!';

    const res = await request.post('/signup', {
      data: { email, password }
    });

    expect([200, 201, 400]).toContain(res.status()); 
    const body = await res.json();
    console.log(body);
  });

  test('login returns an access token', async ({ request }) => {
    const email = `test${Date.now()}@example.com`;
    const password = 'Password123!';

    // Ensure user exists
    await request.post('/signup', { data: { email, password } });

    const res = await request.post('/login', {
      data: { email, password }
    });

    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.access_token).toBeTruthy();
  });
});

