import { Button, TextField, Typography, useTheme } from "@mui/material";
import { Form, Formik } from "formik";
import * as Yup from "yup";

import { toEnglishDigits } from "utils/number-helper";
import { useAuthContext } from "context/auth-context";

const LoginSection = () => {
  const { phoneNumber, setPhoneNumber, handleGetOtp } = useAuthContext();
  const theme = useTheme();

  const validatePhone = (phoneNumber: string) => {
    return Yup.string()
      .matches(/^\d+$/, "فرمت شماره موبایل صحیح نمی باشد")
      .test("len", (val) => val?.length === 11)
      .test("with zero", (val) => val?.startsWith("0"))
      .isValidSync(phoneNumber);
  };

  const AuthSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .required("پر کردن این فیلد الزامی می باشد")
      .test(
        "phoneNumber",
        "فرمت شماره موبایل صحیح نمی باشد",
        (value: string) => {
          return validatePhone(value ?? "0");
        }
      ),
  });

  return (
    <Formik
      initialValues={{
        phoneNumber,
      }}
      enableReinitialize={false}
      validationSchema={AuthSchema}
      onSubmit={handleGetOtp}
    >
      {({
        values,
        handleBlur,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
      }) => (
        <Form
          onSubmit={handleSubmit}
          className="flex flex-col rounded-md border border-primary-main p-8"
        >
          <Typography variant="h5" marginBottom={2} className="text-center">
            ورود | ثبت نام
          </Typography>
          <TextField
            variant="outlined"
            label="شماره موبایل"
            size="small"
            margin="dense"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(toEnglishDigits(e.target.value));
              setFieldValue("phoneNumber", toEnglishDigits(e.target.value));
            }}
            type="number"
            onBlur={handleBlur("phoneNumber")}
            error={!!errors.phoneNumber && touched.phoneNumber}
            helperText={
              errors.phoneNumber && touched.phoneNumber
                ? errors.phoneNumber
                : " "
            }
            sx={{
              "& label.Mui-focused": {
                color:
                  theme.palette.mode === "dark" ? "accent.main" : "accent.600",
              },
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor:
                    theme.palette.mode === "dark"
                      ? "accent.main"
                      : "accent.600",
                },
              },
            }}
            inputProps={{ className: "bg-transparent" }}
          />
          <Button
            variant="contained"
            type="submit"
            className="!z-[1] !bg-accent-700 !text-white hover:!bg-accent-800"
            sx={{ letterSpacing: "2px" }}
          >
            ورود
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginSection;
