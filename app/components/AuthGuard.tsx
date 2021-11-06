import { InteractionStatus } from "@azure/msal-browser";
import { AuthError, InteractionRequiredAuthError } from "@azure/msal-common";
import { useAccount, useMsal } from "@azure/msal-react";
import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import Error404 from "../pages/404";
import Loading from "./shared-components/Loading";

/**
 * Protects the endpoints by requiring authentication to access child routes.
 * @param param0 child component
 * @returns children if authed, else redirect to auth flow
 * @see https://github.com/ivandotv/nextjs-client-signin-logic
 */
export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const user = useUser();

  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});

  useEffect(() => {
    if (inProgress === InteractionStatus.None) {
      if (!user) {
        instance
          .acquireTokenSilent({
            scopes: [],
            account: account,
          })
          .then((response) => console.log(response))
          .catch((error) => {
            // in case if silent token acquisition fails, fallback to an interactive method
            if (
              error instanceof InteractionRequiredAuthError ||
              error instanceof AuthError
            ) {
              if (inProgress === InteractionStatus.None) {
                instance
                  .acquireTokenRedirect({
                    scopes: [],
                  })
                  // .then((response) => setData(formatResponse(response)))
                  .catch((error) => console.log(error));
              }
            }
          });
      }
    }
  }, [account, inProgress, instance]);

  /* show loading indicator while the auth provider is still initializing */
  if (inProgress !== InteractionStatus.None) {
    return <Loading cover="page" />;
  }

  // if auth initialized with a valid user show protected page
  if (user) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return <Error404 />;
};
