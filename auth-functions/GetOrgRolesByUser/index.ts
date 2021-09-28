import { CosmosClient } from "@azure/cosmos";
import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const COSMOSDB_ENDPOINT = process.env.COSMOSDB_ENDPOINT || "";
const COSMOSDB_KEY = process.env.COSMOSDB_KEY || "";
const API_VERSION = "1.0.0";

// Retries the organizations and roles for a given member
const GetOrgRolesByUser: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  // Parse Basic Auth username and password
  const header = req.headers.authorization || "",
    token = header.split(/\s+/).pop() || "", // and the encoded auth token
    auth = Buffer.from(token, "base64").toString(), // convert from base64
    parts = auth.split(/:/), // split on colon
    username = parts[0],
    password = parts[1];

  // Check for HTTP Basic Authentication, return HTTP 401 error if invalid credentials.
  if (
    username !== process.env.BASIC_AUTH_USERNAME ||
    password !== process.env.BASIC_AUTH_PASSWORD
  ) {
    context.log("Invalid Authentication");
    context.res = { status: 401 };
    return;
  }

  // If 'objectId' is not in the body, fail as we can't look up an undefined user.
  if (!(req.body && req.body.objectId)) {
    context.log("Invalid Request");
    context.res = {
      status: 400,
      body: { version: API_VERSION, code: "INVALID_REQUEST" },
    };
    return;
  }

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
    version: API_VERSION,
    action: "Continue",
    extension_e49403e6125b48229226fa5e78ad05a3_OrgRoles: orgRoles.join(";"), // return claim
  };

  // Return response
  context.res = {
    body: responseMessage,
  };
};

export default GetOrgRolesByUser;
