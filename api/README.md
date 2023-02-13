# BACKEND / API
# DEV-DIARY

## Basic API to include features:
- Docker environment
- User API
    - Local signup [Email / Password]
    - Social sign up [Google / Github]
    - User last login (property: `last_login`)
    - User last update (property: `updated_at`)
    - User Safe delete (property: `delated_at`)
- Postgres DB  
- DB Admin Dashboard
- NGINX reverse proxy
    - Pre-setup for SPA
        - Calls to `/api*` directed to NODE APP, 
        - Else will return the `PUBLIC` files  e.g. `/`

## About

This project uses [Feathers](http://feathersjs.com). An open source framework for building APIs and real-time applications.

## Getting Started

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/feathers-docker-api-base
    yarn install
    ```

3. Start your app

    ```
    yarn run migrate
    yarn run docker:dev
    ```

## Testing

Run `yarn run test` and all your tests in the `test/` directory will be run.

## Scaffolding

This app comes with a powerful command line interface for Feathers. Here are a few things it can do:

```
$ npx feathers help                           # Show all commands
$ npx feathers generate service               # Generate a new Service
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

### TODO
- add: https://feathers-a-m.netlify.app/overview.html  (account management)
   - will give local strategy email verify etc, dont re-invent the wheel
- add: https://feathers-pinia.pages.dev/guide/service-stores.html
   - local store that interacts with API via Vue Pinia

