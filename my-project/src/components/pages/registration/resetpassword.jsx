import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Input, Spinner } from "@material-tailwind/react";
import { BACKEND_BASE_URL } from "../../../utils/Config";

const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const user_id = localStorage.getItem("user_id");

  const passwordRegex =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

  const validationSchema = yup.object({
    password: yup
      .string()
      .min(6, "Password should be min 6 characters long")
      .max(16, "Password should be atmost 16 characters long")
      .matches(
        passwordRegex,
        "Password must contain an upper case, a lower case, a number and a special character"
      )
      .required("Enter your password"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    axios
      .post(BACKEND_BASE_URL + "/api/reset-password/", values)
      .then((response) => {
        setIsLoading(false);
        localStorage.removeItem("user_id");
        toast.success(response.data.message);
        navigate("/login");
      })
      .catch((err) => {
        setIsLoading(false);
        toast.error("Oops! Some error occured.Please try again!");
      });
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_password: "",
      user_id: user_id,
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    onSubmit,
  });

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="bg-white-200 md:w-1/2 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-800">MindEase</h2>

        <h4 className="text-xl  text-gray-800 mb-4 font-casual">
          "Find Ease, Unlock Your Peace"
        </h4>
        <img
          src="https://www.samvednacare.com/blog/wp-content/uploads/2022/02/Samvedhna_Feb_Blog-01-1.png"
          alt="Company Logo"
          className="w-96 h-96 object-contain mb-4"
        />
      </div>
      <div className="bg-white flex flex-col justify-center items-center md:w-1/2">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Reset Password
        </h1>
        <div className="bg-gray-200 rounded-md shadow-md p-8 w-full max-w-md">
          <h2 className="text-xl text-gray-800 mb-4">Reset your password</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <div className="w-full">
                <Input
                  label="Password"
                  name="password"
                  size="md"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  className="bg-white bg-opacity-75"
                />
              </div>
              <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ""}
              </div>
            </div>

            <div className="mb-4">
              <div className="w-full">
                <Input
                  label="Confirm Password"
                  name="confirm_password"
                  size="md"
                  type="password"
                  value={formik.values.confirm_password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.confirm_password &&
                    Boolean(formik.errors.confirm_password)
                  }
                  className="bg-white bg-opacity-75"
                />
              </div>
              <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
                {formik.touched.confirm_password &&
                formik.errors.confirm_password
                  ? formik.errors.confirm_password
                  : ""}
              </div>
            </div>

            <div className="mb-4">
              <Button
                size="md"
                type="submit"
                className="py-2.5 px-4 rounded-md hover:bg-blue-600 w-full"
                disabled={isLoading}
              >
                {isLoading ? <Spinner className="h-5 w-5" /> : "Reset"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
