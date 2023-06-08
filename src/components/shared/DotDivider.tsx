import React, { FC } from "react";

import Icon from "./Icon";

const DotDevider: FC<{ className: string }> = ({ className }) => {
  return <Icon className={`mx-2 ${className}`} icon="dot-divider" size={24} />;
};

export default DotDevider;
