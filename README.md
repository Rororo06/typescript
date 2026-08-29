# Full Stack Open: TypeScript

Exercise submissions for the Full Stack Open TypeScript part.

| Directory | Contents |
| --- | --- |
| [course](./course) | React + TypeScript course contents application |
| [flightdiaries](./flightdiaries) | Flight diary backend and frontend |
| [healthapp](./healthapp) | BMI and exercise calculators behind an Express API |
| [patientor](./patientor) | Patient records application: Express backend and React frontend |
| [healthapp-tests](./healthapp-tests) | End to end tests for the health app |
| [patientor-api-tests](./patientor-api-tests) | Tests for the patientor backend |
| [patientor-tests](./patientor-tests) | End to end tests for patientor |

Node 22 or newer is expected.

## Running the applications

Each application is installed and started in its own directory:

```bash
cd patientor/backend && npm install && npm run dev     # http://localhost:3001
cd patientor/frontend && npm install && npm run dev    # http://localhost:5173
```

The other directories follow the same pattern:

```bash
cd healthapp && npm install && npm run dev
cd flightdiaries/backend && npm install && npm run dev
cd flightdiaries/frontend && npm install && npm run dev
cd course && npm install && npm run dev
```

## Linting, type checking and tests

```bash
npm run lint
npm run tsc
```

The test directories are run with `npm test` after installing their
dependencies, and the same tests run in GitHub Actions on every push.
