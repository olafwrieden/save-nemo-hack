// @ts-nocheck
import { Grid, Layout } from "antd";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import navigationConfig from "../../constants/NavigationConfig";
import {
  DIR_LTR,
  DIR_RTL,
  NAV_TYPE_SIDE,
  NAV_TYPE_TOP,
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_WIDTH,
} from "../../constants/ThemeConstants";
import { MainContext } from "../../pages/_app";
import utils from "../../utils";
import Footer from "../layout-components/Footer";
import { HeaderNav } from "../layout-components/HeaderNav";
import MobileNav from "../layout-components/MobileNav";
import PageHeader from "../layout-components/PageHeader";
import SideNav from "../layout-components/SideNav";
// import TopNav from "../layout-components/TopNav";
import Loading from "../shared-components/Loading";

const { Content } = Layout;
const { useBreakpoint } = Grid;

export const AppLayout = ({ children }) => {
  const [state] = useContext(MainContext);
  const { navCollapsed, navType, direction } = state;
  const router = useRouter();

  const currentRouteInfo = utils.getRouteInfo(
    navigationConfig,
    router.pathname
  );
  state.routeInfo = currentRouteInfo;
  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = !screens.includes("lg");
  const isNavSide = navType === NAV_TYPE_SIDE;
  const isNavTop = navType === NAV_TYPE_TOP;
  const getLayoutGutter = () => {
    if (isNavTop || isMobile) {
      return 0;
    }
    return navCollapsed ? SIDE_NAV_COLLAPSED_WIDTH : SIDE_NAV_WIDTH;
  };

  const { status } = useThemeSwitcher();

  if (status === "loading") {
    return <Loading cover="page" />;
  }

  const getLayoutDirectionGutter = () => {
    if (direction === DIR_LTR) {
      return { paddingLeft: getLayoutGutter() };
    }
    if (direction === DIR_RTL) {
      return { paddingRight: getLayoutGutter() };
    }
    return { paddingLeft: getLayoutGutter() };
  };

  return (
    <Layout>
      <HeaderNav isMobile={isMobile} />
      {/* {isNavTop && !isMobile ? <TopNav routeInfo={currentRouteInfo} /> : null} */}
      <Layout className="app-container">
        {isNavSide && !isMobile ? (
          <SideNav routeInfo={currentRouteInfo} />
        ) : null}
        <Layout className="app-layout" style={getLayoutDirectionGutter()}>
          <div className={`app-content ${isNavTop ? "layout-top-nav" : ""}`}>
            <PageHeader
              display={currentRouteInfo?.breadcrumb}
              title={currentRouteInfo?.title}
            />
            <Content>{children}</Content>
          </div>
          <Footer />
        </Layout>
      </Layout>
      {isMobile && <MobileNav />}
    </Layout>
  );
};

export default React.memo(AppLayout);
