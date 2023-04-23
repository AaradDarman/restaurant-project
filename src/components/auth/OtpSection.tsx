import { useEffect, useRef } from "react";

import { Button, FormHelperText, IconButton, Typography } from "@mui/material";
import { Form, Formik, FormikProps } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";

import OtpInput from "./OtpInput";
import CountDownTimer from "./CountDownTimer";
import { useAuthContext } from "context/auth-context";
import Icon from "components/shared/Icon";
import { IRootState } from "interfaces/redux-states.interfaces";

const OtpSection = () => {
  const { phoneNumber, otp, setOtp, setAuthState, handleLogin, handleGetOtp } =
    useAuthContext();
  const otpFormikRef = useRef<FormikProps<{ otp: string }>>(null);
  const { user } = useSelector((state: IRootState) => state);

  useEffect(() => {
    if (otp.length === 6) {
      otpFormikRef?.current?.handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  const OtpSchema = Yup.object().shape({
    otp: Yup.string()
      .min(6, "کد وارد شده باید 6 رقم باشد")
      .max(6, "کد وارد شده باید 6 رقم باشد")
      .required("پر کردن این فیلد الزامی می باشد"),
  });

  return (
    <Formik
      innerRef={otpFormikRef}
      initialValues={{
        otp,
      }}
      enableReinitialize={false}
      validationSchema={OtpSchema}
      onSubmit={handleLogin}
    >
      {({ values, errors, touched, setFieldValue, handleSubmit }) => {
        return (
          <Form
            onSubmit={handleSubmit}
            className="relative flex flex-col rounded-md border border-primary-main p-8"
          >
            <IconButton
              sx={{
                position: "absolute",
                top: "4px",
                left: "4px",
                backgroundColor: "transparent",
                fontSize: "24px",
                "&:hover": {
                  backgroundColor: "transparent",
                },
                padding: "4px",
              }}
              onClick={() => setAuthState("login")}
            >
              <Icon icon="arrow-right" size={24} />
            </IconButton>
            <Typography
              variant="body2"
              className="my-8"
            >{`کد تایید برای شماره موبایل ${phoneNumber} ارسال گردید`}</Typography>
            <Typography variant="body1" className="text-[16px]">
              کد تایید را وارد کنید
            </Typography>
            <OtpInput
              value={values.otp}
              onChange={(val: any) => {
                setOtp(val);
                setFieldValue("otp", val);
              }}
              hasErrored={!!errors.otp && touched.otp}
            />
            <FormHelperText
              error={!!errors.otp && touched.otp}
              className="!ml-[14px] !mr-[14px] lg:!mr-[276px]"
            >
              {errors.otp && touched.otp ? errors.otp : " "}
            </FormHelperText>
            <CountDownTimer
              startDate={new Date(user?.otpCreateDate)}
              duration={1000 * 60 * 3}
              onRestartClick={handleGetOtp}
            />
            <Button
              variant="contained"
              type="submit"
              className="!z-[1] !mt-2 !bg-accent-700 !text-white hover:!bg-accent-800"
              sx={{ letterSpacing: "2px" }}
            >
              تایید و ادامه
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default OtpSection;
