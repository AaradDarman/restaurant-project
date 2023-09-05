import React, { FC } from "react";

import PulseLoader from "react-spinners/PulseLoader";
import { Backdrop, Modal, useTheme } from "@mui/material";

const LoadingComponent: FC<{ show: boolean }> = ({ show }) => {
  const theme = useTheme();

  return (
    <Modal
      open={show}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <PulseLoader
        size={6}
        color={theme.palette.accent.main}
        loading={true}
        className="absolute left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]"
      />
    </Modal>
  );
};

export default LoadingComponent;
