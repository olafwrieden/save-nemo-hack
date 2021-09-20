import { AntdIconProps } from "@ant-design/icons/lib/components/AntdIcon";
import React, { Component, ForwardRefExoticComponent } from "react";

export class Icon extends Component<{
  type?: string;
  className?: string;
}> {
  render() {
    const { type, className } = this.props;
    return <>{React.createElement(type, { className: className })}</>;
  }
}

// export const Icon = (type?: AntdIconProps, classname?: string) => {
//   return React.createElement(type.type, { className: classname });
// };

export default Icon;
