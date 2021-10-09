import * as msal from "@azure/msal-browser";

const b2cPolicies = {
  names: {
    signUpSignIn: "B2C_1_susi",
    editProfile: "B2C_1_edit_profile",
  },
  authorities: {
    signUpSignIn: {
      authority:
        "https://nemopi.b2clogin.com/nemopi.onmicrosoft.com/B2C_1_susi",
    },
    editProfile: {
      authority:
        "https://nemopi.b2clogin.com/nemopi.onmicrosoft.com/B2C_1_edit_profile",
    },
  },
  authorityDomain: "nemopi.b2clogin.com",
};

const msalConfig: msal.Configuration = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
    authority: b2cPolicies.authorities.signUpSignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: "/",
    postLogoutRedirectUri: "/",
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

export const editAuthority = b2cPolicies.authorities.editProfile;
export { msalInstance };
