import { test, expect } from '@playwright/test';
import { randomBook } from '../utils/test-data';
import { signup, login } from '../fixtures/auth-fixture';

test.describe('Book Management', () => {
  test('create, get, update, list and delete a book', async ({ request }) => {
    const email = `booktest${Date.now()}@example.com`;
    const password = 'Password123!';

    // 1. Sign up user
    await signup(request, email, password);

    // 2. Log in to get token
    const token = await login(request, email, password);

    const book = randomBook();

    // 3. Create book
    const createRes = await request.post('/books', {
      data: book,
      headers: { Authorization: `Bearer ${token}` },
    });
    expect([200, 201]).toContain(createRes.status());
    const created = await createRes.json();

    // 4. Get book
    const getRes = await request.get(`/books/${created.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(getRes.status()).toBe(200);

    // 5. Update book
    const updateRes = await request.put(`/books/${created.id}`, {
      data: { ...book, title: 'Updated Title' },
      headers: { Authorization: `Bearer ${token}` },
    });
    expect([200, 204]).toContain(updateRes.status());

    // 6. List books
    const listRes = await request.get('/books', {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect(listRes.status()).toBe(200);

    // 7. Delete book
    const deleteRes = await request.delete(`/books/${created.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    expect([200, 204]).toContain(deleteRes.status());
  });
});
