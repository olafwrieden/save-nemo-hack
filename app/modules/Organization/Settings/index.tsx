import {
  CreditCardOutlined,
  EnvironmentOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Empty, Tabs } from "antd";

const { TabPane } = Tabs;

const SettingsTabs = [
  {
    name: "General",
    key: "general",
    icon: <SettingOutlined />,
    content: (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<span>Nothing to see here</span>}
      />
    ),
  },
  {
    name: "Buoys",
    key: "buoys",
    icon: <EnvironmentOutlined />,
    content: (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<span>Nothing to see here</span>}
      />
    ),
  },
  {
    name: "Members",
    key: "members",
    icon: <TeamOutlined />,
    content: (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<span>Nothing to see here</span>}
      />
    ),
  },
  {
    name: "Billing",
    key: "billing",
    icon: <CreditCardOutlined />,
    content: (
      <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        description={<span>Nothing to see here</span>}
      />
    ),
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
