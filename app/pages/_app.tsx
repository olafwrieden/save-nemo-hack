import { MsalProvider } from "@azure/msal-react";
import { ConfigProvider } from "antd";
import "antd/dist/antd.css";
import { createContext, useEffect, useReducer, useState } from "react";
import CookieConsent from "react-cookie-consent";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import Layout from "../components/layout";
import themeReducer, {
  initialThemeState,
} from "../contexts/theme/themeReducer";
import "../public/static/css/index.css";
import { msalInstance } from "../services/msal";

export const MainContext = createContext(null);

const App = ({ Component, pageProps }) => {
  const [user, setUser] = useState(null);
  const [theme, dispatch] = useReducer(themeReducer, initialThemeState);

  useEffect(() => {
    setTimeout(() => {
      setUser({
        name: "Alex",
        type: "admin",
      });
    }, 2000);
  }, []);

  const themes = {
    dark: `${process.env.NEXT_PUBLIC_URL}/static/css/dark-theme.css`,
    light: `${process.env.NEXT_PUBLIC_URL}/static/css/light-theme.css`,
  };

  return (
    <>
      <MainContext.Provider value={[theme, dispatch]}>
        <ThemeSwitcherProvider
          themeMap={themes}
          defaultTheme={theme.currentTheme}
          insertionPoint="styles-insertion-point"
        >
          <ConfigProvider direction="ltr">
            {/* <UserContext.Provider value={user}> */}
            <MsalProvider instance={msalInstance}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </MsalProvider>
            {/* </UserContext.Provider> */}
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
