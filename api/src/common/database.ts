import { CosmosClient } from "@azure/cosmos";

const COSMOSDB_ENDPOINT = process.env.COSMOSDB_ENDPOINT || "";
const COSMOSDB_KEY = process.env.COSMOSDB_KEY || "";

let cosmosInstance: object;

const getDatabase = () => {
  if (!cosmosInstance) {
    cosmosInstance = new CosmosClient({
      endpoint: COSMOSDB_ENDPOINT,
      key: COSMOSDB_KEY,
    }).database("save-nemo");
  }
  return cosmosInstance;
};

export default getDatabase;
