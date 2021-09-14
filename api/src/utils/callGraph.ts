import axios from "axios";

/**
 * Calls the endpoint with authorization bearer token.
 * @param {string} endpoint
 * @param {string} accessToken
 */
export async function callApi(endpoint: string, accessToken: string) {
  const opts = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  console.log("request made to web API at: " + new Date().toString());

  return axios(endpoint, opts)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
