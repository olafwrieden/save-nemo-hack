import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import { useContext, useState } from "react";
import {
  NAV_TYPE_TOP,
  SIDE_NAV_COLLAPSED_WIDTH,
  SIDE_NAV_WIDTH,
} from "../../constants/ThemeConstants";
import {
  TOGGLE_COLLAPSED_NAV,
  TOGGLE_MOBILE_NAV,
} from "../../contexts/theme/ThemeActionType";
import { MainContext } from "../../pages/_app";
import utils from "../../utils";
import { Logo } from "./Logo";
import NavPanel from "./NavPanel";
import NavProfile from "./NavProfile";

const { Header } = Layout;

export const HeaderNav = () => {
  const [state, dispatch] = useContext(MainContext);
  const { direction, currentTheme, headerNavColor } = state;
  const [searchActive, setSearchActive] = useState(false);
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");
  const onSearchClose = () => {
    setSearchActive(false);
  };
  const onToggle = () => {
    if (!isMobile) {
      dispatch({ type: TOGGLE_COLLAPSED_NAV, payload: !state.navCollapsed });
    } else {
      dispatch({ type: TOGGLE_MOBILE_NAV, payload: !state.mobileNav });
    }
  };

  const isNavTop = state.navType === NAV_TYPE_TOP ? true : false;
  const mode = () => {
    if (!headerNavColor) {
      return utils.getColorContrast(
        currentTheme === "dark" ? "#00000" : "#ffffff"
      );
    }
    return utils.getColorContrast(headerNavColor);
  };

  const navMode = mode();

  const getNavWidth = () => {
    if (isNavTop || isMobile) {
      return "0px";
    }
    if (state.navCollapsed) {
      return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
    } else {
      return `${SIDE_NAV_WIDTH}px`;
    }
  };

  return (
    <Header
      className={`app-header ${navMode}`}
      style={{ backgroundColor: headerNavColor }}
    >
      <div className={`app-header-wrapper ${isNavTop ? "layout-top-nav" : ""}`}>
        <Logo logoType={navMode} />
        <div className="nav" style={{ width: `calc(100% - ${getNavWidth()})` }}>
          <div className="nav-left">
            <ul className="ant-menu ant-menu-root ant-menu-horizontal">
              {isNavTop && !isMobile ? null : (
                <li
                  className="ant-menu-item ant-menu-item-only-child"
                  onClick={() => {
                    onToggle();
                  }}
                >
                  {state.navCollapsed || isMobile ? (
                    <MenuUnfoldOutlined className="nav-icon" />
                  ) : (
                    <MenuFoldOutlined className="nav-icon" />
                  )}
                </li>
              )}
            </ul>
          </div>
          <div className="nav-right">
            <NavProfile />
            <NavPanel direction={direction} />
          </div>
          {/* <NavSearch active={searchActive} close={onSearchClose} /> */}
        </div>
      </div>
    </Header>
  );
};

export default HeaderNav;
