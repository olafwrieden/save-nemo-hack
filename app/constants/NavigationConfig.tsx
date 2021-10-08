import { DashboardOutlined } from "@ant-design/icons";
import { APP_PREFIX_PATH } from "./AppConfig";

const dashBoardNavTree = [
  {
    key: "home",
    path: `${APP_PREFIX_PATH}/`,
    title: "Home",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [],
  },
];

const navigationConfig = [...dashBoardNavTree];

export default navigationConfig;
