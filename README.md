# Bookstore API - Playwright Tests

API testing framework using **Playwright Test** for the FastAPI Bookstore service.

## Prerequisites
- Node.js 18+
- The Bookstore API running locally (per the service README):
  ```bash
  uvicorn main:app --reload
  # Service should be at http://127.0.0.1:8000
  ```

## Setup
```bash
npm install
```

> Optional: override API base URL
```bash
# default: http://127.0.0.1:8000
export API_BASE_URL=http://127.0.0.1:8000
```

## Run tests
```bash
npx playwright test
```

## Show HTML report
```bash
npx playwright show-report
```

## What is covered
- **/health** – health check
- **/signup** – user sign up
- **/login** – login & JWT extraction
- **/books** – create, get, update, list, delete (secured with Bearer token)

## Project layout
```
bookstore-tests/
  fixtures/
    auth-fixture.ts      # handles signup and login, exposes `token`
  tests/
    auth.spec.ts         # auth flows
    books.spec.ts        # book CRUD
    health.spec.ts       # health endpoint
  utils/
    test-data.ts         # generators for unique usernames/books
  playwright.config.ts   # baseURL, headers, reporter
  package.json
  tsconfig.json
```

## Notes
- The tests are tolerant to minor response differences (e.g., 200/201, field names like `access_token`/`token`). Adjust assertions if your API returns different shapes.
- For CI, export `API_BASE_URL` and run `npx playwright test` in your pipeline.