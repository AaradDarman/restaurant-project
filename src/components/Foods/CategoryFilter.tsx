import { FC } from "react";

import { Tab, Tabs } from "@mui/material";

import Icon from "components/shared/Icon";
import categories from "data/categories.json";

const CategoryFilter: FC<{
  value?: string | string[];
  onChange: (val: string) => void;
}> = ({ value, onChange }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    onChange(newValue);
  };
  return (
    <Tabs
      value={value}
      onChange={handleChange}
      variant="scrollable"
      scrollButtons={false}
      sx={{
        "& .MuiTab-root.Mui-selected": {
          color: "text.primary",
        },
        "& .MuiTab-root": {
          minWidth: "unset",
          minHeight: "unset",
          zIndex: 1,
          padding: "6px 16px",
        },
        "& .MuiTabs-indicator": {
          backgroundColor: "accent.main",
          height: "100%",
          borderRadius: "6px",
          zIndex: 0,
        },
      }}
      className="sticky top-[58px] z-10 mb-4 bg-inherit py-2"
    >
      {categories.map((cat, index) => (
        <Tab
          key={cat.label}
          label={cat.label}
          value={cat.label}
          wrapped
          icon={
            <Icon
              icon={`${cat.icon}${value === cat.label ? "-filled" : ""}`}
              size={24}
            />
          }
        />
      ))}
    </Tabs>
  );
};

export default CategoryFilter;
