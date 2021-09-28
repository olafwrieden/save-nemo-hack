# Auth Functions

As part of the Nemo Pi authentication / authorization, we are implementing various functions for the purpose of enriching tokens and validating user permissions.

This folder contains the function project for Azure Functions under the app _savenemogetauth_

## Getting started

1. Assuming you are at the root directory of this repo, change your working directory into this folder (/auth-functions):

   ```bash
   $ cd /auth-functions
   ```

2. Install the NPM packages by running:

   ```bash
   $ npm install
   ```

3. Add your database connection string by creating a file called _local.settings.json_ to the folder. Inside, add:

   ```javascript
   {
     "IsEncrypted": false,
     "Values": {
       "AzureWebJobsStorage": "",
       "FUNCTIONS_WORKER_RUNTIME": "node",
       "COSMOSDB_ENDPOINT": "[YOUR_COSMOS_DB_ENDPOINT]",
       "COSMOSDB_KEY": "[YOUR_COSMOS_DB_KEY]",
       "BASIC_AUTH_USERNAME": "[BASIC_AUTH_USERNAME]",
       "BASIC_AUTH_PASSWORD": "[BASIC_AUTH_PASSWORD]"
     }
   }
   ```

4. Start the function by using VS debugger.
