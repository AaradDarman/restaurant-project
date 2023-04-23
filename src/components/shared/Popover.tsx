import React, {
  ComponentType,
  FC,
  PropsWithRef,
  ReactNode,
  useState,
} from "react";

import { Popover as MUIPopover, PopoverProps, useTheme } from "@mui/material";

const Popover: FC<
  Partial<PopoverProps> & {
    content: ComponentType<{ onClose: () => void }>;
    renderTarget: ComponentType<
      PropsWithRef<{ isOpen: boolean; [key: string]: any }>
    >;
  }
> = ({ renderTarget: RenderTarget, content: Content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const theme = useTheme();

  return (
    <>
      <RenderTarget
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          setIsOpen(true);
          setAnchorEl(event.currentTarget);
        }}
        isOpen={isOpen}
        className="!text-[19px]"
      />
      <MUIPopover
        open={isOpen}
        anchorEl={anchorEl}
        onClose={() => setIsOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Content onClose={() => setIsOpen(false)} />
      </MUIPopover>
    </>
  );
};

export default Popover;
