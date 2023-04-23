import React, { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";

import { Tab, useTheme } from "@mui/material";
import { rgba } from "polished";

const TimePicker: FC<{
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  values: string[];
  className?: string;
}> = ({ value, onChange, values, className }) => {
  const theme = useTheme();
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timer = setTimeout(() => {
      if (indicatorRef.current && value) {
        let element = document.getElementById(value);
        let domRect = element?.getBoundingClientRect();

        if (domRect) {
          indicatorRef.current.style.width = `${
            domRect?.right - domRect?.left
          }px`;
          indicatorRef.current.style.top = `${element?.offsetTop}px`;
          indicatorRef.current.style.left = `${element?.offsetLeft}px`;
        }
      }
    }, 100);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const handleClick = (newValue: string) => {
    if (indicatorRef.current) {
      let element = document.getElementById(newValue);
      let domRect = element?.getBoundingClientRect();
      if (domRect) {
        indicatorRef.current.style.width = `${
          domRect?.right - domRect?.left
        }px`;
        indicatorRef.current.style.left = `${element?.offsetLeft}px`;
        indicatorRef.current.style.top = `${element?.offsetTop}px`;
        indicatorRef.current.style.visibility = `visible`;
      }
    }
    onChange(newValue);
  };

  return (
    <div
      className={`${className} relative flex flex-wrap justify-start gap-[6px]`}
    >
      {values.map((hour) => (
        <Tab
          sx={{
            "&.MuiTab-root": {
              minWidth: "unset",
              minHeight: "unset",
              zIndex: 1,
              padding: "6px",
              borderRadius: "6px",
              border: "1px solid",
              borderColor: "primary.main",
              color: rgba(theme.palette.text.primary, 0.7),
              backgroundColor: rgba(theme.palette.primary.main, 0.1),
              opacity: "unset",
            },
            "&.MuiTab-root.Mui-disabled": {
              borderColor: "primary.main",
              backgroundColor: rgba("#db3131", 0.2),
              opacity: "unset",
            },
            "&[aria-selected=true]": {
              color: theme.palette.accent.main,
              transitionDuration: "300ms",
            },
          }}
          value={hour}
          id={hour}
          key={hour}
          label={hour}
          aria-selected={value === hour}
          onClick={() => handleClick(hour)}
        />
      ))}
      <div
        ref={indicatorRef}
        className={`${
          value === "" ? "invisible" : ""
        } absolute left-[101%] z-[1] h-[31.5px] rounded-md border-[1px] border-accent-main duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]`}
      ></div>
    </div>
  );
};

export default TimePicker;
