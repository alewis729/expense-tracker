# Expense tracker

This is an expense tracker app. It allows to log expenses and filter them.

### To execute a dev environment locally

1. Install dependencies

```bash
yarn install
```

2. Copy & update the environment variables:

```bash
cp ./apps/api/.env.example ./apps/api/.env
cp ./apps/www/.env.example ./apps/www/.env
```

3. Run a dev environment

- For the api:

```bash
yarn run dev:api
```

- For www:

```bash
yarn run dev:www
```

### To install a new library

Use `yarn workspace <app> add <library@version>`. The following example shows how to install react v16.13.1 for apps/www:

```bash
yarn workspace @expense-tracker/www add react@16.13.1
```
