// @ts-nocheck
import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { Col, Empty, Grid, Card, Layout, Row, Table, Tag } from "antd";
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

export const AppLayout = () => {
  const [state] = useContext(MainContext);
  const { navCollapsed, navType, direction } = state;
  const router = useRouter();

  const { accounts } = useMsal();
  const { name, idTokenClaims } = accounts[0];
  const roles = idTokenClaims["extension_OrgRoles"];
  const isAuthed = useIsAuthenticated();

  const formatOrgRoles = (rolesClaim) => {
    const orgsAndRoles = rolesClaim.split(";");
    const orgRoles = orgsAndRoles.map((attr, idx) => {
      const parts = attr.split(":");
      return { key: idx, name: parts[0], role: parts[1] };
    });

    const columns = [
      {
        title: "Organization ID",
        dataIndex: "name",
        key: "name",
      },
      {
        title: "My Role",
        dataIndex: "role",
        key: "role",
        render: (role) => (
          <Tag color="green" key={role}>
            {role.toUpperCase()}
          </Tag>
        ),
      },
    ];

    return (
      <Table
        dataSource={orgRoles}
        columns={columns}
        tableLayout="fixed"
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description="You are not a member of any organization."
            />
          ),
        }}
      />
    );
  };

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
            <Content>
              <p>Welcome, {name}</p>
              <p>You are {isAuthed ? "" : "not "} authenticated.</p>
              <Row>
                <Col span={12}>
                  <Card title="My Organizations &amp; Roles">{formatOrgRoles(roles)}</Card>
                </Col>
              </Row>
            </Content>
          </div>
          <Footer />
        </Layout>
      </Layout>
      {isMobile && <MobileNav />}
    </Layout>
  );
};

export default React.memo(AppLayout);
