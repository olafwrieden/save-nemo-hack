import Nav from "./nav";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import { useContext } from "react";
import { MainContext } from "../pages/_app";

const Layout = ({ children }) => {
  const [state, dispatch] = useContext(MainContext);
  const { navCollapsed, navType, direction } = state;

  const isAuthed = true;

  if (isAuthed) {
    return (
      <AppLayout
        navCollapsed={navCollapsed}
        navType={navType}
        direction={direction}
        location="/"
      />
    );
  }
  return <AuthLayout>{children}</AuthLayout>;
};

export default Layout;
