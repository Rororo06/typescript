# Health app tests

Playwright tests for the health app API in [../healthapp](../healthapp). The server has to be
running on `http://localhost:3000` before the tests are started.

```bash
npm install
npx playwright install
npm test
```

`npm run test:ui`, `npm run test:headed` and `npm run report` are also available.

The tests cover `GET /hello`, `GET /bmi` and `POST /exercises`, both the happy paths and the
error responses for missing and non-numeric parameters. The workflow in
[../.github/workflows/healthapp-e2e-tests.yml](../.github/workflows/healthapp-e2e-tests.yml)
builds the server, runs the tests and uploads the report.
