import { EventMessage, EventType } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { ConfigProvider } from "antd";
import "antd/dist/antd.css";
import { createContext, useEffect, useReducer, useState } from "react";
import CookieConsent from "react-cookie-consent";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import Head from "../components/head";
import Layout from "../components/layout";
import themeReducer, {
  initialThemeState,
} from "../contexts/theme/themeReducer";
import { IUser, UserContext } from "../hooks/useUser";
import "../public/static/css/index.css";
import { msalInstance } from "../services/msal";
import { parseRoleClaim } from "../utils";

// import "../modules/style.css";
import { NextPage } from "next";
import { AppProps } from "next/app";

export const MainContext = createContext(null);

export type NextApplicationPage<P = any, IP = P> = NextPage<P, IP> & {
  requireAuth?: boolean;
};

const App = (props: AppProps) => {
  const {
    Component,
    pageProps,
  }: { Component: NextApplicationPage; pageProps: any } = props;

  const [user, setUser] = useState<IUser>(null);
  const [theme, dispatch] = useReducer(themeReducer, initialThemeState);

  msalInstance.addEventCallback((message: EventMessage) => {
    if (message.eventType === EventType.LOGIN_SUCCESS) {
      const payload = message.payload;
      // console.log(payload)
      if (!payload["idTokenClaims"]) return;
      const claims = payload["idTokenClaims"];
      const rolesClaim: string = claims ? claims["extension_OrgRoles"] : "";
      const roles = parseRoleClaim(rolesClaim);

      if (!user && claims) {
        setUser({
          id: claims["oid"] || "",
          first_name: claims["given_name"] || "",
          last_name: claims["family_name"] || "",
          full_name: claims["name"] || "",
          isVolunteer: !!claims["extension_Volunteer"] || false,
          roles: roles || [],
        });
      }
    }
  });

  let accounts = msalInstance.getAllAccounts();
  const claims = accounts[0]?.idTokenClaims;
  const rolesClaim: string = claims ? claims["extension_OrgRoles"] : "";

  useEffect(() => {
    const roles = parseRoleClaim(rolesClaim);

    if (!user && claims) {
      setUser({
        id: claims["oid"] || "",
        first_name: claims["given_name"] || "",
        last_name: claims["family_name"] || "",
        full_name: claims["name"] || "",
        isVolunteer: !!claims["extension_Volunteer"] || false,
        roles: roles || [],
      });
    }
  }, []);

  const themes = {
    dark: `/static/css/dark-theme.css`,
    light: `/static/css/light-theme.css`,
  };

  // if (claims && !user) {
  //   return (
  //     <Loading cover="page" />
  //     // <>
  //     //   <p>Please log in to continue..</p>
  //     //   <Button onClick={() => msalInstance.loginRedirect()}>Log in</Button>
  //     // </>
  //   );
  // }

  if (
    pageProps.protected &&
    user &&
    pageProps.userTypes &&
    pageProps.userTypes.indexOf(user.roles) === -1
  ) {
    return <p>Sorry, you don't have access</p>;
  }

  return (
    <>
      <Head />
      <MainContext.Provider value={[theme, dispatch]}>
        <ThemeSwitcherProvider
          themeMap={themes}
          defaultTheme={theme.currentTheme}
          insertionPoint="styles-insertion-point"
        >
          <ConfigProvider direction="ltr">
            <MsalProvider instance={msalInstance}>
              <UserContext.Provider value={user}>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </UserContext.Provider>
            </MsalProvider>
          </ConfigProvider>
        </ThemeSwitcherProvider>
      </MainContext.Provider>
      <CookieConsent
        overlay
        location="bottom"
        buttonText="Accept Cookies"
        style={{ background: "#2B373B" }}
        buttonStyle={{ borderRadius: "2px" }}
        buttonClasses="outline"
        expires={150}
      >
        This website uses cookies to enhance the user experience. By using this
        website you consent to all cookies in accordance with our Cookie Policy.
      </CookieConsent>
    </>
  );
};

export default App;
