import React, { FC, PropsWithChildren, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  SxProps,
  Theme,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type IAccordionPorps = {
  className?: string;
  sx?: SxProps<Theme>;
  iconClassName?: string;
  buttonClassName?: string;
  btnTitle: React.ReactElement<any, any>;
};

const MyAccordion: FC<AccordionProps & PropsWithChildren<IAccordionPorps>> = ({
  className,
  sx,
  btnTitle,
  children,
  iconClassName,
  buttonClassName,
  ...otherProps
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = () => {
    setIsOpen(isOpen ? false : true);
  };

  return (
    <Accordion
      expanded={isOpen}
      onChange={handleChange}
      className={`${className} relative block w-full !bg-transparent !bg-none !shadow-none transition-all`}
      {...otherProps}
      sx={[...(Array.isArray(sx) ? sx : [sx])]}
    >
      <AccordionSummary
        expandIcon={
          <FontAwesomeIcon
            icon={faChevronDown}
            width={12}
            className={iconClassName}
          />
        }
        className={`${buttonClassName} flex w-full select-none items-center justify-between !px-2 text-lg leading-snug`}
      >
        {btnTitle}
      </AccordionSummary>
      <AccordionDetails className="!px-4 !py-0">{children}</AccordionDetails>
    </Accordion>
  );
};

export default MyAccordion;
