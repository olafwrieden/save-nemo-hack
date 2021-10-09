// @ts-nocheck
import {
  BulbOutlined,
  EditOutlined,
  HeartTwoTone,
  LogoutOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { RedirectRequest } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { Avatar, Dropdown, Menu, Switch } from "antd";
import React, { useContext } from "react";
import { useThemeSwitcher } from "react-css-theme-switcher";
import {
  HEADER_NAV_COLOR_CHANGE,
  SWITCH_THEME,
} from "../../contexts/theme/ThemeActionType";
import { useUser } from "../../hooks/useUser";
import { MainContext } from "../../pages/_app";
import { editAuthority } from "../../services/msal";
import Icon from "../util-components/Icon";

const menuItem = [
  {
    title: "FAQ",
    icon: QuestionCircleOutlined,
    path: "/faq",
  },
];

export const NavProfile = () => {
  const { instance } = useMsal();
  const { full_name, isVolunteer } = useUser() ?? {};

  const editProfile: RedirectRequest = {
    ...editAuthority,
    scopes: [],
  };

  const { switcher, themes } = useThemeSwitcher();
  const [state, dispatch] = useContext(MainContext);
  const { currentTheme } = state;

  // Handle Light / Dark Mode
  const toggleTheme = (isChecked) => {
    dispatch({ type: HEADER_NAV_COLOR_CHANGE, payload: "" });
    const changedTheme = isChecked ? "dark" : "light";
    dispatch({ type: SWITCH_THEME, payload: changedTheme });
    switcher({ theme: themes[changedTheme] });
  };

  const profileImg = `https://ui-avatars.com/api/?background=ddd&color=999&name=${full_name}&format=svg`;
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar
            size={45}
            src={profileImg}
            style={{ marginInlineEnd: "10px" }}
            alt="User Avatar"
          />
          <div className="pl-2">
            <h4 className="mb-0">{full_name}</h4>
            <span className="text-muted">
              {isVolunteer ? (
                <>
                  <HeartTwoTone twoToneColor="#eb2f96" /> {"Volunteer"}
                </>
              ) : (
                "Welcome!"
              )}
            </span>
          </div>
        </div>
      </div>
      <div className="nav-profile-body">
        <Menu>
          {menuItem.map((el, i) => {
            return (
              <Menu.Item key={i}>
                <a href={el.path}>
                  <Icon className="mr-3" type={el.icon} />
                  <span className="font-weight-normal">{el.title}</span>
                </a>
              </Menu.Item>
            );
          })}
          <Menu.Item
            key={menuItem.length + 1}
            onClick={() => instance.loginRedirect(editProfile)}
          >
            <span>
              <EditOutlined className="mr-3" />
              <span className="font-weight-normal">Edit Profile</span>
            </span>
          </Menu.Item>
          <Menu.Item
            key={menuItem.length + 2}
            onClick={() => instance.logoutRedirect()}
          >
            <span>
              <LogoutOutlined className="mr-3" />
              <span className="font-weight-normal">Sign Out</span>
            </span>
          </Menu.Item>
          <Menu.Item key={menuItem.length + 3}>
            <BulbOutlined className="mr-3" />
            <span className="font-weight-normal">
              <Switch
                checkedChildren="Dark"
                unCheckedChildren="Light"
                checked={currentTheme === "dark"}
                onChange={toggleTheme}
              />
            </span>
          </Menu.Item>
        </Menu>
      </div>
    </div>
  );
  return (
    <Dropdown placement="bottomRight" overlay={profileMenu} trigger={["click"]}>
      <Menu className="d-flex align-item-center" mode="horizontal">
        <Menu.Item key="profilepic">
          <Avatar src={profileImg} />
        </Menu.Item>
      </Menu>
    </Dropdown>
  );
};

export default NavProfile;
