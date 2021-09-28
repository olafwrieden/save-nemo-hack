import { CosmosClient } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const COSMOSDB_ENDPOINT = process.env.COSMOSDB_ENDPOINT || "";
const COSMOSDB_KEY = process.env.COSMOSDB_KEY || "";

// Retries the organizations and roles for a given member
const GetRolesByUser: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  // Create CosmosDB Client
  const client = new CosmosClient({
    endpoint: COSMOSDB_ENDPOINT,
    key: COSMOSDB_KEY,
  });

  const database = client.database("save-nemo"); // Database where org info is stored
  const container = database.container("organizations"); // Container of organizations

  // Get User's ID from request body
  const objectId = req.body.objectId;
  console.log(`API called with oid: '${objectId}'`);

  // Construct query: User ID and their role for each organization
  const querySpec = {
    query: `SELECT o.id, users.role FROM orgs o JOIN users IN o.members WHERE users.user = '${objectId}'`,
  };

  // Run Query to get user's roles
  const { resources: items } = await container.items
    .query(querySpec)
    .fetchAll();

  // Print roles to console for testing
  items.forEach((item) => console.log(`${item.id} - ${item.role}`));

  // Stringify user's roles
  const orgRoles = items.map((val) => `${val.id}:${val.role}`);

  // Construct response message
  const responseMessage = {
    version: "1.0.0",
    action: "Continue",
    extension_e49403e6125b48229226fa5e78ad05a3_OrgRoles: orgRoles.join(";"), // return claim
  };

  context.res = {
    body: responseMessage,
  };
};

export default GetRolesByUser;
