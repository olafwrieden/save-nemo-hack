import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import {
  EditOutlined,
  SettingOutlined,
  ShopOutlined,
  QuestionCircleOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import Icon from "../util-components/Icon";

const menuItem = [
  {
    title: "FAQ",
    icon: QuestionCircleOutlined,
    path: "/faq",
  },
];

export const NavProfile = () => {
  const profileImg =
    "https://ui-avatars.com/api/?background=ddd&color=999&name=CH&format=svg";
  const profileMenu = (
    <div className="nav-profile nav-dropdown">
      <div className="nav-profile-header">
        <div className="d-flex">
          <Avatar size={45} src={profileImg} />
          <div className="pl-3">
            <h4 className="mb-0">Charlie Howard</h4>
            <span className="text-muted">Frontend Developer</span>
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
            onClick={(e) => console.log("user wants to sign out")}
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
