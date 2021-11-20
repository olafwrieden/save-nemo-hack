import { CosmosClient, Database } from "@azure/cosmos";

const COSMOSDB_ENDPOINT = process.env.COSMOSDB_ENDPOINT || "";
const COSMOSDB_KEY = process.env.COSMOSDB_KEY || "";

let cosmosInstance: Database;

/**
 * Instantiates or returns a database connection to CosmosDB.
 * @returns database connection to the 'save-nemo' CosmosDB
 */
export const getDatabase = () => {
  if (!cosmosInstance) {
    cosmosInstance = new CosmosClient({
      endpoint: COSMOSDB_ENDPOINT,
      key: COSMOSDB_KEY,
    }).database("save-nemo");
  }
  return cosmosInstance;
};
