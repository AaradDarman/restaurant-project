import React from "react";

import { TextField, useTheme } from "@mui/material";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import moment from "moment-jalaali";

import BirthDatePicker from "./BirthDatePicker";
import { toEnglishDigits } from "utils/number-helper";
import { useAuthContext } from "context/auth-context";
import { TUser } from "types/auth.types";

const AccountInfoForm = React.forwardRef<
  FormikProps<Required<Omit<TUser, "_id" | "profileImage">>>,
  {
    onSubmit: (values: Required<Omit<TUser, "_id" | "profileImage">>) => void;
  }
>(({ onSubmit }, ref) => {
  const theme = useTheme();
  const {
    name,
    setName,
    phoneNumber,
    setPhoneNumber,
    birthDate,
    setBirthDate,
  } = useAuthContext();

  const AccountInfoSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "نام وارد شده باید بیشتر از 3 حرف باشد")
      .max(50, "نام وارد شده نباید بیشتر از 50 حرف باشد")
      .required("پر کردن این فیلد الزامی می باشد")
      .test("alphabets", "نام وارد شده نباید حاوی اعداد باشد", (value) => {
        return !/\d/g.test(value);
      }),
    phoneNumber: Yup.string()
      .required("پر کردن این فیلد الزامی می باشد")
      .matches(/^\d+$/, "فرمت شماره همراه صحیح نمی باشد")
      .test("len", "شماره همراه باید 11 رقم باشد", (val) => val.length === 11)
      .test("with zero", "شماره همراه باید با صفر شروع شود", (val) =>
        val.startsWith("0")
      ),
    birthDate: Yup.string().required("پر کردن این فیلد الزامی می باشد"),
  });

  const initialValues: Required<Omit<TUser, "_id" | "profileImage">> = {
    name,
    phoneNumber,
    birthDate,
    gender: "",
  };

  return (
    <Formik
      innerRef={ref}
      initialValues={initialValues}
      enableReinitialize={false}
      validationSchema={AccountInfoSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        handleBlur,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
      }) => (
        <Form onSubmit={handleSubmit} className="flex flex-col">
          <TextField
            required
            variant="outlined"
            sx={{
              "& ": {
                minWidth: "175px",
              },
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
            label="نام"
            size="small"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setFieldValue("name", e.target.value);
            }}
            onBlur={handleBlur("name")}
            error={!!errors.name && touched.name}
            FormHelperTextProps={{ style: { marginBottom: "4px" } }}
            helperText={errors.name && touched.name ? errors.name : " "}
          />
          <TextField
            required
            variant="outlined"
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
            label="شماره همراه"
            size="small"
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(toEnglishDigits(e.target.value));
              setFieldValue("phoneNumber", toEnglishDigits(e.target.value));
            }}
            onBlur={handleBlur("phoneNumber")}
            error={!!errors.phoneNumber && touched.phoneNumber}
            FormHelperTextProps={{ style: { marginBottom: "4px" } }}
            helperText={
              errors.phoneNumber && touched.phoneNumber
                ? errors.phoneNumber
                : " "
            }
          />
          <BirthDatePicker
            value={birthDate}
            onChange={(val) => {
              if (val === "") {
                setBirthDate("");
                setFieldValue("birthDate", "");
                return;
              }
              let convertedDate = moment(
                toEnglishDigits(val.format()),
                "jYYYY/jMM/jDD"
              ).toISOString();

              setBirthDate(convertedDate);
              setFieldValue("birthDate", convertedDate);
            }}
            onBlur={handleBlur("birthDate")}
            error={!!errors.birthDate && touched.birthDate}
            helperText={
              errors.birthDate && touched.birthDate ? errors.birthDate : " "
            }
          />
        </Form>
      )}
    </Formik>
  );
});

AccountInfoForm.displayName = "AccountInfoForm";

export default AccountInfoForm;
