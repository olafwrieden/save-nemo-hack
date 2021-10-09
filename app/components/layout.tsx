// @ts-nocheck
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import { useContext } from "react";
import { MainContext } from "../pages/_app";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

const Layout = ({ children }) => {
  const [state, dispatch] = useContext(MainContext);
  const { navCollapsed, navType, direction } = state;

  return (
    <>
      <AuthenticatedTemplate>
        <AppLayout
          navCollapsed={navCollapsed}
          navType={navType}
          direction={direction}
          location="/"
        >
          {children}
        </AppLayout>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <AuthLayout>{children}</AuthLayout>
      </UnauthenticatedTemplate>
    </>
  );
};

export default Layout;
