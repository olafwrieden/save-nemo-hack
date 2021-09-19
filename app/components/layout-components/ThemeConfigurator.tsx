import React, { Component, useContext } from "react";
import { Radio, Switch, Button, message } from "antd";

import { CopyOutlined } from "@ant-design/icons";
import ColorPicker from "../shared-components/ColorPicker";
// import CopyToClipboard from "react-copy-to-clipboard";
// import NavLanguage from "./NavLanguage";
import {
  SIDE_NAV_LIGHT,
  NAV_TYPE_SIDE,
  NAV_TYPE_TOP,
  SIDE_NAV_DARK,
  DIR_RTL,
  DIR_LTR,
} from "../../constants/ThemeConstants";
import { useThemeSwitcher } from "react-css-theme-switcher";
import utils from "../../utils/index";
import {
  SWITCH_THEME,
  HEADER_NAV_COLOR_CHANGE,
  DIRECTION_CHANGE,
  TOGGLE_COLLAPSED_NAV,
  SIDE_NAV_STYLE_CHANGE,
  TOP_NAV_COLOR_CHANGE,
  NAV_TYPE_CHANGE,
} from "../../contexts/theme/ThemeActionType";
import { MainContext } from "../../pages/_app";
import { string, bool } from "prop-types";

const colorOptions = ["#3e82f7", "#24a772", "#de4436", "#924aca", "#193550"];

const ListOption: React.FC<{
  name: string;
  selector: any;
  disabled?: boolean;
  vertical?: boolean;
}> = ({ name, selector, disabled, vertical }) => (
  <div
    className={`my-4 ${
      vertical ? "" : "d-flex align-items-center justify-content-between"
    }`}
  >
    <div
      className={`${disabled ? "opacity-0-3" : ""} ${vertical ? "mb-3" : ""}`}
    >
      {name}
    </div>
    <div>{selector}</div>
  </div>
);

export const ThemeConfigurator = () => {
  const [state, dispatch] = useContext(MainContext);
  const {
    navType,
    sideNavTheme,
    navCollapsed,
    topNavColor,
    headerNavColor,
    locale,
    currentTheme,
    direction,
  } = state;

  const isNavTop = navType === NAV_TYPE_TOP ? true : false;

  const { switcher, themes } = useThemeSwitcher();

  //handle darkmode/ligth mode
  const toggleTheme2 = (isChecked) => {
    dispatch({ type: HEADER_NAV_COLOR_CHANGE, payload: "" });
    const changedTheme = isChecked ? "dark" : "light";
    dispatch({ type: SWITCH_THEME, payload: changedTheme });
    switcher({ theme: themes[changedTheme] });
  };

  // change direction ltr/rtl
  const handleDirection = (e) => {
    dispatch({ type: DIRECTION_CHANGE, payload: e.target.value });
  };

  // handle Side Nav Collapse
  const handleSideNavCollapse = () => {
    dispatch({ type: TOGGLE_COLLAPSED_NAV, payload: !navCollapsed });
  };

  // handle Navigation Type (top/side)
  const onNavTypeClick2 = (value) => {
    dispatch({ type: HEADER_NAV_COLOR_CHANGE, payload: "" });
    if (value === NAV_TYPE_TOP) {
      dispatch({ type: TOP_NAV_COLOR_CHANGE, payload: colorOptions[0] });
      dispatch({ type: TOGGLE_COLLAPSED_NAV, payload: false });
    }
    dispatch({ type: NAV_TYPE_CHANGE, payload: value });
  };

  // handle onHeaderNavColorClick
  const onHeaderNavColorClick2 = (value) => {
    const { rgb } = value;
    const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    const hex = utils.rgbaToHex(rgba);
    dispatch({ type: HEADER_NAV_COLOR_CHANGE, payload: hex });
  };

  // handle onHeaderNavColorClick
  const ontopNavColorClick2 = (value) => {
    // onHeaderNavColorChange("");
    dispatch({ type: HEADER_NAV_COLOR_CHANGE, payload: "" });
    const { rgb } = value;
    const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    const hex = utils.rgbaToHex(rgba);
    // onTopNavColorChange(hex);
    dispatch({ type: TOP_NAV_COLOR_CHANGE, payload: hex });
  };

  const genCopySettingJson = (configState) =>
    JSON.stringify(configState, null, 2);

  return (
    <>
      <div className="mb-5">
        <h4 className="mb-3 font-weight-bold">Navigation</h4>
        {isNavTop ? (
          <>
            <ListOption
              name="Top Nav Color:"
              vertical
              selector={
                <ColorPicker
                  color={topNavColor}
                  colorChange={ontopNavColorClick2}
                />
              }
            />
          </>
        ) : (
          <>
            <ListOption
              name="Header Nav Color:"
              vertical
              selector={
                <ColorPicker
                  color={headerNavColor}
                  colorChange={onHeaderNavColorClick2}
                />
              }
            />
          </>
        )}

        <ListOption
          name="Navigation Type:"
          selector={
            <Radio.Group
              size="small"
              onChange={(e) => onNavTypeClick2(e.target.value)}
              value={navType}
            >
              <Radio.Button value={NAV_TYPE_SIDE}>Side</Radio.Button>
              <Radio.Button value={NAV_TYPE_TOP}>Top</Radio.Button>
            </Radio.Group>
          }
        />
        <ListOption
          name="Side Nav Color:"
          selector={
            <Radio.Group
              disabled={isNavTop}
              size="small"
              onChange={(e) =>
                dispatch({
                  type: SIDE_NAV_STYLE_CHANGE,
                  payload: e.target.value,
                })
              }
              value={sideNavTheme}
            >
              <Radio.Button value={SIDE_NAV_LIGHT}>Light</Radio.Button>
              <Radio.Button value={SIDE_NAV_DARK}>Dark</Radio.Button>
            </Radio.Group>
          }
          disabled={isNavTop}
        />
        <ListOption
          name="Side Nav Collapse:"
          selector={
            <Switch
              disabled={isNavTop}
              checked={navCollapsed}
              onChange={handleSideNavCollapse}
            />
          }
          disabled={isNavTop}
        />
        <ListOption
          name="Dark Theme:"
          selector={
            <Switch checked={currentTheme === "dark"} onChange={toggleTheme2} />
          }
        />
        <ListOption
          name="Direction:"
          selector={
            <Radio.Group
              size="small"
              onChange={handleDirection}
              value={direction}
            >
              <Radio.Button value={DIR_LTR}>LTR</Radio.Button>
              <Radio.Button value={DIR_RTL}>RTL</Radio.Button>
            </Radio.Group>
          }
        />
      </div>
      {/* <div className="mb-5">
        <h4 className="mb-3 font-weight-bold">Locale</h4>
        <ListOption name="Language:" selector={<NavLanguage configDisplay />} />
      </div> */}
      {/* <div>
        <CopyToClipboard
          text={genCopySettingJson({
            navType,
            sideNavTheme,
            navCollapsed,
            topNavColor,
            headerNavColor,
            locale,
            currentTheme,
            direction,
          })}
          onCopy={() =>
            message.success(
              "Copy Success, please paste it to src/configs/AppConfig.js THEME_CONFIG variable."
            )
          }
        >
          <Button icon={<CopyOutlined />} block>
            <span>Copy Setting</span>
          </Button>
        </CopyToClipboard>
      </div> */}
    </>
  );
};

export default ThemeConfigurator;
