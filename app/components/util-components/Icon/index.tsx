import React, { Component } from "react";
import { string } from "prop-types";

export class Icon extends Component<{
  type?: string;
  className?: string;
}> {
  render() {
    const { type, className } = this.props;
    return <>{React.createElement(type, { className: className })}</>;
  }
}

export default Icon;
