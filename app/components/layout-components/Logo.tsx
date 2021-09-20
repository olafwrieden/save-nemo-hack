import {
  SIDE_NAV_WIDTH,
  SIDE_NAV_COLLAPSED_WIDTH,
  NAV_TYPE_TOP,
} from "../../constants/ThemeConstants";
import { Grid } from "antd";
import utils from "../../utils";
import themeReducer from "../../contexts/theme/themeReducer";
import { APP_NAME } from "../../constants/AppConfig";

const { useBreakpoint } = Grid;

const getLogoWidthGutter = (props, isMobile) => {
  const { navCollapsed, navType } = props;
  const isNavTop = navType === NAV_TYPE_TOP ? true : false;
  if (isMobile && !props.mobileLogo) {
    return 0;
  }
  if (isNavTop) {
    return "auto";
  }
  if (navCollapsed) {
    return `${SIDE_NAV_COLLAPSED_WIDTH}px`;
  } else {
    return `${SIDE_NAV_WIDTH}px`;
  }
};

const getLogo = (props) => {
  const { navCollapsed, logoType } = props;

  if (logoType === "light") {
    if (navCollapsed) {
      return "/static/img/logo.png";
    }
    return "/static/img/logo.png";
  }

  if (navCollapsed) {
    return "/static/img/logo.png";
  }
  return "/static/img/logo.png";
};

const getLogoDisplay = (isMobile, mobileLogo) => {
  if (isMobile && !mobileLogo) {
    return "d-none";
  } else {
    return "logo";
  }
};

export const Logo = (props) => {
  const isMobile = !utils.getBreakPoint(useBreakpoint()).includes("lg");
  return (
    <div
      className={getLogoDisplay(isMobile, props.mobileLogo)}
      style={{ width: `${getLogoWidthGutter(props, isMobile)}` }}
    >
      <img
        src={getLogo(props)}
        height="30px"
        className="m-2"
        alt={`${APP_NAME} logo`}
      />
    </div>
  );
};

export default Logo;
