import { Layout } from "antd";
import React, { useContext } from "react";
import {
  NAV_TYPE_SIDE,
  SIDE_NAV_DARK,
  SIDE_NAV_WIDTH,
} from "../../constants/ThemeConstants";
import { MainContext } from "../../pages/_app";
// import { Scrollbars } from "react-custom-scrollbars";
import MenuContent from "./MenuContent";

const { Sider } = Layout;

export const SideNav = () => {
  const [state] = useContext(MainContext);
  state.localization = true;
  state.hideGroupTitle = "";
  return (
    <Sider
      className={`side-nav ${
        state.sideNavTheme === SIDE_NAV_DARK ? "side-nav-dark" : ""
      }`}
      width={SIDE_NAV_WIDTH}
      collapsed={state.navCollapsed}
    >
      {/* <Scrollbars autoHide> */}
        <MenuContent type={NAV_TYPE_SIDE} {...state} />
      {/* </Scrollbars> */}
    </Sider>
  );
};

export default SideNav;
