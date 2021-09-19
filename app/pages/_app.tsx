import { ConfigProvider } from "antd";
import { createContext, useEffect, useReducer, useState } from "react";
import CookieConsent, { Cookies } from "react-cookie-consent";
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import Layout from "../components/layout";
import Loading from "../components/shared-components/Loading";
import { UserContext } from "../hooks/useUser";
import themeReducer, {
  initialThemeState,
} from "../contexts/theme/themeReducer";
import "antd/dist/antd.css";
import "../public/static/css/index.css";

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

  if (pageProps.protected && !user) {
    return <Loading cover="page" />;
  }

  if (
    pageProps.protected &&
    user &&
    pageProps.userTypes &&
    pageProps.userTypes.indexOf(user.type) === -1
  ) {
    return <Layout>Sorry, you don't have access</Layout>;
  }

  return (
    <>
      <MainContext.Provider value={[theme, dispatch]}>
        <ThemeSwitcherProvider
          themeMap={themes}
          defaultTheme={theme.currentTheme}
          insertionPoint="styles-insertion-point"
        >
          <ConfigProvider direction="ltr">
            <UserContext.Provider value={user}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </UserContext.Provider>
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
