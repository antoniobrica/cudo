# Cudo

This project was generated using [Nx](https://nx.dev).

<p align="center"><img src="https://gl-m.globallinker.net/logo/unsaved/d9f/d9f5f948e846ab1e41bfaec4bf1f21ee_t.jpg?1438618435" width="450"></p>

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are sharable across libraries and applications. They can be imported from `@cudo/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://192.168.1.5:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.

## storybook

### Intall nx globally

npm install -g nx

### To Generate react shared component

nx generate @nrwl/react:library shared-components

### To install dev storybook

npm install --dev @nrwl/storybook

### To Integrate storybook with shared-component lib

nx g @nrwl/react:storybook-configuration shared-components

### To create leftmenu component in shared-component lib

nx g component leftmenu --project=shared-components --directory=lib/components

### To run shared-component storybook

nx run shared-components:storybook

### To run shared-component storybook

nx run mf-project-app:storybook

### To run test case shared-component storybook

nx run shared-components-e2e:e2e

### To run ui-design

npm run start ui-design

## Database migration using typeorm migration CLI

In Every Project ormconfig.json is only used for database migration
Migration custom CLI created in workspace for every backend project

### Change tsconfig.base.json compiler module

from "exnext" to "None"

### To Generate Migration file

nx run {projectName}:migration-generate --name={fileName} --mode={mode}
ex. nx run ms-project:migration-generate --name=test --mode=development

### To run Migration file

nx run {projectName}:migration-run --mode={mode}
ex. nx run ms-project:migration-run --mode=development

### To revert Migration file

nx run {projectName}:migration-revert --mode={mode}
ex. nx run ms-project:migration-revert --mode=development


## To Run Ory Kratos
Change 192.168.1.5 to 'your-local-ip' in following files 1: apps\mf-container-app\src\app\config\kratos.tsx
2: deploy\docker-compose-ory\.kratos-config\kratos.yml
3: deploy\docker-compose-ory\.nginx\nginx.conf


 docker-compose -f .\deploy\docker-compose-ory\quickstart.yml -f .\deploy\docker-compose-ory\docker-compose-nginx.yml up --build

### To Run Container
nx run mf-container-app:serve --host 0.0.0.0


## Build Process
 nx run-many --target=build --projects='ms-account,ms-document,ms-project,ms-task' --with-deps --generatePackageJson=true --configuration=production

### Install Dependancy
npm i apollo-server-express @nestjs/platform-express mssql
### Run production build dist/apps/ms-{domain_name}
set "NODE_ENV=production" && set "PORT={port_number}" && node main.js


# Developing Microservices - Node and Docker


### Build and Run the App

## Build the images:


docker-compose build


# Run all the services frontend and Api:


docker-compose up -d


# Run the individual micro-services:

docker-compose up service-name
docker-compose up ms-task

### Run the front-end:

docker-compose -f docker-compose-frontend.yaml up -d
