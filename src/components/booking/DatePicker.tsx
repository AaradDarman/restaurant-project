import { Dispatch, FC, SetStateAction } from "react";

import { Tab, Tabs, useTheme } from "@mui/material";
import moment from "moment-jalaali";
import { rgba } from "polished";

const DatePicker: FC<{
  value: Date | undefined;
  onChange: Dispatch<SetStateAction<Date | undefined>>;
  values: moment.Moment[];
  className?: string;
}> = ({ value, onChange, values, className }) => {
  const theme = useTheme();

  const handleChange = (event: React.SyntheticEvent, newValue: Date) => {
    onChange(new Date(newValue));
  };

  return (
    <Tabs
      value={value ? value?.toISOString() : false}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons={false}
      sx={{
        "& .MuiTab-root.Mui-selected": {
          color: "accent.main",
          backgroundColor: "transparent",
          transitionDuration: "300ms",
        },
        "& .MuiTab-root.Mui-disabled": {
          borderColor: "primary.main",
          backgroundColor: rgba("#db3131", 0.2),
        },
        "& .MuiTab-root": {
          minWidth: "unset",
          minHeight: "unset",
          zIndex: 1,
          padding: 0,
          marginLeft: "6px",
          borderRadius: "6px",
          border: "1px solid",
          borderColor: "primary.main",
          backgroundColor: rgba(theme.palette.primary.main, 0.1),
        },
        "& .MuiTabs-indicator": {
          backgroundColor: "transparent",
          border: value && "1px solid",
          borderColor: theme.palette.accent.main,
          height: "100%",
          borderRadius: "6px",
          zIndex: 1,
        },
      }}
      className={`${className} z-[1] bg-inherit py-2`}
    >
      {values.map((day) => (
        <Tab
          key={day.toISOString()}
          value={day.toISOString()}
          disabled={day.format("dddd") === "جمعه"}
          label={
            <div className="flex h-[55px] flex-col justify-between p-2">
              <span>{day.format("dddd")}</span>
              <span className="text-[20px]">{day.jDate()}</span>
            </div>
          }
          wrapped
        />
      ))}
    </Tabs>
  );
};

export default DatePicker;
