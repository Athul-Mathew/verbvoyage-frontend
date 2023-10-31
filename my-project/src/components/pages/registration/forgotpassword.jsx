import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import image from "../../images/signup.png";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import Loaders from "../Loader"
import { Helmet } from "react-helmet";
import { BACKEND_BASE_URL } from "../../../utils/Config";
import { Button, Input, Spinner } from "@material-tailwind/react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleLoading = () => setIsLoading((cur) => !cur);
  const navigate = useNavigate("");

  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter valid email")
      .required("Enter your registered email"),
  });

  const onSubmit = async (values) => {
    handleLoading();
    await axios.post(BACKEND_BASE_URL + "/api/forgot-password/", values)

      .then((response) => {
        handleLoading();
        const data = response.data;
        
        localStorage.setItem("user_id", data.user_id);
        
        toast.success(response.data.message);
        navigate("/login");
      })
      .catch((error) => {
        handleLoading();
        toast.error(error.response.data.message);
      });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchema,
    validateOnBlur: true,
    onSubmit,
  });

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      toast.info("Email cannot be empty");
    } else {
      handleLoading();
      await axios
        .post(import.meta.env.VITE_BASE_USER_URL + "/api/forgot-password/", {
          email: email,
        })
        .then((response) => {
          handleLoading();
          const data = response.data;
          localStorage.setItem("user_id", data.user_id);
          toast.success(response.data.message);
          navigate("/login");
        })
        .catch((error) => {
          handleLoading();
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <div>
      <Helmet>
        <title>Forgot Password | VerbVoyage</title>
      </Helmet>

      <div className="flex flex-col md:flex-row h-screen">
        <div className="bg-white-200 md:w-1/2 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold text-gray-800">VerbVoyage</h2>

          <h4 className="text-xl  text-gray-800 mb-4 font-casual">
            "verbvoyage, Unlock Your knowledge"
          </h4>
          <img
            src='https://idc.edu/wp-content/uploads/2018/02/8-Ways-to-Learn-English-Faster.jpg'
            alt="Company Logo"
            className="w-96 h-96 object-contain mb-4"
          />
          <h2 className="text-2xl text-gray-800">Online learning Platform</h2>
        </div>
        <div className="bg-white flex flex-col justify-center items-center md:w-1/2">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Forgot Password
          </h1>
          <div className="bg-gray-200 rounded-md shadow-md p-8 w-full max-w-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Reset Password
            </h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <div className="w-full">
                  <Input
                    label="Email"
                    name="email"
                    size="md"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    className="bg-white bg-opacity-75"
                    disabled={isLoading}
                  />
                </div>
                <div className="text-red-600 font-mono text-[12px] lg:text-[12px]">
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
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
                  {isLoading ? (
                    <div className="flex flex-row gap-3 items-center justify-center capitalize font-normal">
                      <span>Sending reset mail</span>
                      <Spinner className="h-5 w-5" />
                    </div>
                  ) : (
                    "Get Reset Link"
                  )}
                </Button>
              </div>
              <div className="text-center">
                <span className="text-gray-600">Got password?</span>
                <button
                  type="button"
                  className="text-blue-500 hover:underline ml-1"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
