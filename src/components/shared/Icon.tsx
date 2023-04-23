import React from "react";

import IcoMoon, { IconProps } from "react-icomoon";
import iconSet from "assets/selection.json";

const Icon = (props: IconProps) => {
  return <IcoMoon iconSet={iconSet} {...props} />;
};

export default Icon;
