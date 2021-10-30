import {
  CreditCardOutlined,
  EnvironmentOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Tabs } from "antd";

const { TabPane } = Tabs;

const SettingsTabs = [
  {
    name: "General",
    key: "general",
    icon: <SettingOutlined />,
    content: <></>,
  },
  {
    name: "Buoys",
    key: "buoys",
    icon: <EnvironmentOutlined />,
    content: <></>,
  },
  {
    name: "Members",
    key: "members",
    icon: <TeamOutlined />,
    content: <></>,
  },
  {
    name: "Billing",
    key: "billing",
    icon: <CreditCardOutlined />,
    content: <></>,
  },
];

// const preselectTab = (name: string) => {
//   const tab = SettingsTabs.find((tab) => tab.key === name) || undefined;
//   console.log("Tab in URL: " + tab.key);

//   if (tab) return tab.key;
//   return SettingsTabs[0].key;
// };

const OrgSettingsTabs = () => {
  // const { query } = useRouter();
  // const { tab } = query;
  // const params = new URLSearchParams(tab.join(","));
  // console.log(tab);
  // const preselectedTab = preselectTab(tab);

  return (
    <Tabs defaultActiveKey={SettingsTabs[0].key} tabPosition="top">
      {SettingsTabs.map((tab) => (
        <TabPane
          tab={
            <span>
              {tab.icon}
              {tab.name}
            </span>
          }
          key={tab.name}
        >
          {tab.content}
        </TabPane>
      ))}
    </Tabs>
  );
};

export default OrgSettingsTabs;
