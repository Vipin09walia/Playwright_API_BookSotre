import { test, expect } from '@playwright/test';

test('API health check', async ({ request }) => {
  const res = await request.get('/health');
  expect([200, 204]).toContain(res.status());
  let body: any = {};
  try {
    body = await res.json();
  } catch {}
  // If health returns JSON, assert common shapes
  if (body && typeof body === 'object') {
    // Accept either {status:'ok'} or any object containing 'status'
    if ('status' in body) {
  const status = String(body.status).toLowerCase();
  expect(['ok', 'up']).toContain(status);
}
  }
});