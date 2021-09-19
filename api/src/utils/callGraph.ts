import axios, { AxiosRequestConfig } from "axios";

type Methods = "GET" | "POST" | "PATCH";

/**
 * Calls the endpoint with authorization bearer token.
 * @param {string} endpoint
 * @param {string} accessToken
 */
export async function callApi(endpoint: string, accessToken: string) {
  const opts: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  };

  console.log("request made to web API at: " + new Date().toString());

  return axios(endpoint, opts)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

export async function patchAPI(
  endpoint: string,
  accessToken: string,
  data: any
) {
  const opts: AxiosRequestConfig = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    data,
  };

  console.log("request made to web API at: " + new Date().toString());

  return axios(endpoint, opts)
    .then((response) => response.data)
    .catch((error) => console.log(error));
}
