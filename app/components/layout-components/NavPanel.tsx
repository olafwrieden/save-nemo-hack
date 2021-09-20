import { SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState } from "react";

const NavPanel = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <>
      {/* <Menu mode="horizontal">
        <Menu.Item onClick={() => toggleExpanded()} key="theme-drawer">
          <SettingOutlined className="nav-icon mr-0" />
        </Menu.Item>
      </Menu>
      <Drawer
        title="Theme Config"
        placement={props.direction === DIR_RTL ? "left" : "right"}
        width={350}
        onClose={() => toggleExpanded()}
        visible={isExpanded}
      >
        <ThemeConfigurator />
      </Drawer> */}
    </>
  );
};

export default NavPanel;

// export class NavPanel extends Component<{ direction: string }> {
//   state = { visible: false };

//   showDrawer = () => {
//     this.setState({
//       visible: true,
//     });
//   };

//   onClose = () => {
//     this.setState({
//       visible: false,
//     });
//   };

//   render() {
//     return (
//       <>
//         <Menu mode="horizontal">
//           <Menu.Item onClick={this.showDrawer} key="theme-drawer">
//             <SettingOutlined className="nav-icon mr-0" />
//           </Menu.Item>
//         </Menu>
//         <Drawer
//           title="Theme Config"
//           placement={this.props.direction === DIR_RTL ? "left" : "right"}
//           width={350}
//           onClose={this.onClose}
//           visible={this.state.visible}
//         >
//           <ThemeConfigurator />
//         </Drawer>
//       </>
//     );
//   }
// }

// export default NavPanel;
