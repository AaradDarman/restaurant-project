import  { FC } from "react";

import {  useTheme } from "@mui/material";
import ROtpInput from "react18-input-otp";


const OtpInput: FC<{
  value?: string;
  onChange?: Function;
  hasErrored?: boolean;
}> = ({ value, onChange, hasErrored }) => {
  const theme = useTheme();

  return (
    <ROtpInput
      value={value}
      onChange={onChange}
      numInputs={6}
      separator={<span className="w-1"></span>}
      containerStyle="flex justify-between py-3 ltr text-[30px]"
      inputStyle="selection:bg-accent-700 caret-transparent flex-1 bg-transparent border-t-0 border-l-0 border-r-0 border-b-[2px] border-b-slate-200"
      focusStyle="!border-b-accent-700"
      isInputNum
      shouldAutoFocus
      errorStyle={{
        borderBottom: "2px solid",
        borderBottomColor: theme.palette.error.dark,
      }}
      hasErrored={hasErrored}
    />
  );
};

export default OtpInput;
