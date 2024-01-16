# BillTally

-------------

This repository contains the H&CO accounting automation web application called BillTally.



## Get Started

--------

1. Clone this repo
2. Create a .env file in the root of the project with all the correct values for the environment variables below:
   - VITE_ENVIRONMENT
   - VITE_BILLTALLY_AWS_REGION
   - VITE_BILLTALLY_USER_POOL_ID
   - VITE_BILLTALLY_IDENTITY_POOL_ID
   - VITE_BILLTALLY_USER_POOL_WEB_CLIENT_ID
   - VITE_BILLTALLY_API_ENDPOINT
   - VITE_SHARED_SERVICES_API_ENDPOINT
   - VITE_CENTRAL_PORTAL_URL
3. Run `npm i` within the project root to install all dependencies
4. Run `npm run dev` to start the vite development server
5. Navigate to `localhost:3000` to see the app

## Project Structure

--------

### App

Contains specific settings for application operation. Here inside you will
find global styles, routing, instance of global stores (like `redux`, for
example), `Modules`, `Layouts`, `Providers` etc.

> The most important rule here is: `index.ts` only exposes `App.tsx` to
> be rendered in `src/index.html`, ie no other project files import from
> the `/app` folder.


### Features

Each application functionality will be contained in its own folder
(example: `/features/bills` or `/features/vendors`) and will expose its
public API in `index.ts` (i.e. any piece of code that can be publicly
consumed by other features or pages) must necessarily be exposed in
the `index.ts` file.

Defines the boundaries between `features`. Think of them as modules that
can be extracted and become a package in NPM, that is, preferably, features
should be self-sufficient and not have dependencies on other features.

> If this is not possible, limit it to using only the public API of a given
> feature (always import files from `/features/bills` and NEVER from
> `/features/bills/components`) and try to depend as little as possible on
> others features.


### Modules

Modules are aggregates formed by one or more `components`, `data`, `types`,
`views` and everything else that is necessary for a functionality to run.

> Modules must expose their public api and should only be used externally
> something that is exposed in a module's `index.ts` file.

### Infra

Instances of external libraries that will be reused throughout the project.

> All libraries must follow a `protocol/contract` that will be understood
> by this application, what our application knows is an abstraction.

### Shared

Shared is a common resource sharing point across the app. Everything that
is shared can be shared by the application. Like `assets`, `constants`,
`modules`, `types`, `components`, `utils`, `hooks`, etc.

> It is strongly recommended to make sure that all use cases of
> available resources are working correctly after a change.


## Dependencies Documentation

--------

| Library | Documentation |
| ------ | ------ |
| Mui | https://mui.com/ |
| Vite | https://vitejs.dev/guide/ |
| Amplify | https://docs.amplify.aws/lib/q/platform/js/ |
| Ag Grid | https://www.ag-grid.com/react-data-grid/ |
| React Query | https://react-query.tanstack.com/ |

## Utils

--------

| Environment Variables  | https://hco-apps.atlassian.net/wiki/spaces/BT/pages/375521281/Environment+Variables  |
| ------ | ------ |
| Figma project | https://www.figma.com/file/OlaUaGT3BidZlEvAjHUYe1/BillTally?node-id=65%3A3476 |
| Amplify App | https://us-east-1.console.aws.amazon.com/amplify/home?region=us-east-1#/d368fz8xjmjwuh |
| User pool | https://us-east-1.console.aws.amazon.com/cognito/v2/idp/user-pools?region=us-east-1# |
| Jira Backlog | https://hco-apps.atlassian.net/jira/software/projects/BT/boards/26/backlog |
| React Router Dom v6 | https://reactrouter.com/docs/en/v6/getting-started/overview |
| Code Splitting | https://reactjs.org/docs/code-splitting.html |
