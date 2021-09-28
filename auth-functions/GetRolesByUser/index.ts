import { CosmosClient } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const COSMOSDB_ENDPOINT = process.env.COSMOSDB_ENDPOINT || "";
const COSMOSDB_KEY = process.env.COSMOSDB_KEY || "";

// Create CosmosDB Client
export const client = new CosmosClient({
  endpoint: COSMOSDB_ENDPOINT,
  key: COSMOSDB_KEY,
});

const database = client.database("save-nemo");
const container = database.container("users");

// Retries the organizations and roles for a given member
const GetRolesByUser: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log(`${GetRolesByUser.name} triggered...`);

  // query to return all items
  const querySpec = {
    query: "SELECT * from c",
  };

  // read all items in the Items container
  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();

  items.forEach((item) => {
    console.log(`${item} - `);
  });

  const name = req.query.name || (req.body && req.body.name);
  const responseMessage = name
    ? "Hello, " + name + ". This HTTP triggered function executed successfully."
    : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

  context.res = {
    // status: 200, /* Defaults to 200 */
    body: responseMessage,
  };
};

export default GetRolesByUser;
