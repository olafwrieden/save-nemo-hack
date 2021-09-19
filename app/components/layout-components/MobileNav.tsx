import React, { useContext } from "react";
import { Drawer } from "antd";
import { NAV_TYPE_SIDE } from "../../constants/ThemeConstants";
// import { Scrollbars } from "react-custom-scrollbars";
import MenuContent from "./MenuContent";
import Logo from "./Logo";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { TOGGLE_MOBILE_NAV } from "../../contexts/theme/ThemeActionType";
import { MainContext } from "../../pages/_app";
import Flex from "../shared-components/Flex";

export const MobileNav = () => {
  const [state, dispatch] = useContext(MainContext);
  const { mobileNav } = state;
  const onClose = () => {
    dispatch({ type: TOGGLE_MOBILE_NAV, payload: false });
  };

  return (
    <Drawer
      placement="left"
      closable={false}
      onClose={onClose}
      visible={mobileNav}
      bodyStyle={{ padding: 5 }}
    >
      <Flex flexDirection="column" className="h-100">
        <Flex justifyContent="between" alignItems="center">
          <Logo mobileLogo={true} />
          <div className="nav-close" onClick={() => onClose()}>
            <ArrowLeftOutlined />
          </div>
        </Flex>
        <div className="mobile-nav-menu">
          {/* <Scrollbars autoHide> */}
            <MenuContent type={NAV_TYPE_SIDE} {...state} />
          {/* </Scrollbars> */}
        </div>
      </Flex>
    </Drawer>
  );
};


export default MobileNav
