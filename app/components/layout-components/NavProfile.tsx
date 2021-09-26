// @ts-nocheck
import {
  EditOutlined,
  HeartTwoTone,
  LogoutOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { RedirectRequest } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { Avatar, Dropdown, Menu } from "antd";
import React from "react";
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
  const { accounts, instance } = useMsal();
  const { name, username, idTokenClaims } = accounts[0];
  const isVolunteer = !!idTokenClaims["extension_Volunteer"];

  const editProfile: RedirectRequest = {
    ...editAuthority,
    scopes: [],
    loginHint: username,
  };

  const profileImg = `https://ui-avatars.com/api/?background=ddd&color=999&name=${name}&format=svg`;
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar
            size={45}
            src={profileImg}
            style={{ marginInlineEnd: "10px" }}
          />
          <div className="pl-2">
            <h4 className="mb-0">{name}</h4>
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
