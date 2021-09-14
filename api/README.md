# API

## Serving API

Get up and running locally:

At the same level as `.env.example`, create a file called `.env` and fill the values for the environment variables.

Then proceed with:

```bash
$ npm install

# in this step, node modules will be installed
```

Start dev server (hot refresh) using:

```bash
$ npm run dev

# The server is running on port 6060
```

You can now query the endpoints:

- `/me` - currently authed user profile (provide bearer in auth header)
- `/posts` - the unprotected demo endpoint
