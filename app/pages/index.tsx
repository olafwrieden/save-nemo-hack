import { useIsAuthenticated } from "@azure/msal-react";
import { useContext } from "react";
import { Home } from "../modules/Home";
import { LandingPage } from "../modules/LandingPage";
import { MainContext } from "./_app";

const Index = () => {
  const [state, dispatch] = useContext(MainContext);
  const isAuthed = useIsAuthenticated();
  const { currentTheme: theme } = state;

  // What the user sees when they are authed
  if (isAuthed) {
    return <Home />;
  }

  // Landing Page
  return <LandingPage theme={theme} />;
};

export default Index;
