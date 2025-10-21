import React, { useState } from "react";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ApiClient from "../services/API";
import * as yup from "yup";
import london from "../assets/images/london.jpg";
import { useSnackbar } from "notistack";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import { Snackbar, Alert } from "@mui/material";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const LoginRegister = ({ onLoginSuccess }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [apiErrors, setApiErrors] = useState({});

  const schemaLogin = yup.object().shape({
    email: yup.string().email(t("invalid_email")).required(t("required")),
    password: yup.string().required(t("required")),
  });

  const schemaRegister = yup.object().shape({
    fullName: yup.string().required(t("required")),
    email: yup.string().email(t("invalid_email")).required(t("required")),
    phone: yup
      .string()
      .matches(/^\+\d+$/, t("invalid_phone"))
      .required(t("required")),
    password: yup.string().min(6, t("password_min")).required(t("required")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], t("password_match"))
      .required(t("required")),
    affiliate: yup.string().required(t("required")),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    resolver: yupResolver(isLogin ? schemaLogin : schemaRegister),
  });

  const onSubmit = async (data) => {
    try {
      if (isLogin) {
        const res = await ApiClient.post("Auth/login", {
          email: data.email,
          password: data.password,
        });

        if (res?.data?.token && res?.data?.user) {
          const { token, user } = res.data;

          localStorage.setItem("Auth_Token", token);
          localStorage.setItem("user_id", user.id);
          localStorage.setItem("email", user.email);
          localStorage.setItem("name", user.name || "User");
          localStorage.setItem("isAuthenticated", "true");

          enqueueSnackbar("تم تسجيل الدخول بنجاح ✅", { variant: "success" });

          if (user.verified_kyc === false) {
            if (onLoginSuccess) onLoginSuccess();
            navigate("/twofactor/uploadVerification");
          } else {
            if (onLoginSuccess) onLoginSuccess();
            navigate("/home");
          }
        } else {
          enqueueSnackbar("فشل تسجيل الدخول ⚠️", { variant: "error" });
        }
      } else {
        // ✅ تسجيل جديد
        const signupRes = await ApiClient.post("Auth/create-account", {
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          password: data.password,
          affiliate: data.affiliate,
          type: "user",
        });

        if (signupRes?.data?.id) {
          localStorage.setItem("user_id", signupRes.data.id);
          localStorage.setItem("email", signupRes.data.email);
          localStorage.setItem("name", signupRes.data.name || data.fullName);
          localStorage.setItem("isAuthenticated", "true");

          enqueueSnackbar("تم إنشاء الحساب بنجاح ✅", { variant: "success" });
          navigate("/twofactor");
        } else {
          enqueueSnackbar("فشل إنشاء الحساب ⚠️", { variant: "error" });
        }
      }
    } catch (error) {
      console.error("❌ Error:", error);
      setApiErrors(error?.response?.data?.error || {});
      enqueueSnackbar(
        error?.response?.data?.message || "حدث خطأ غير متوقع ⚠️",
        { variant: "error" }
      );
    }
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col md:flex-row items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="md:w-1/2 w-full flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-10 transition-all duration-300">
          <div className="flex justify-between bg-gray-100 dark:bg-gray-700 rounded-full p-1 mb-8">
            <button
              onClick={() => {
                setIsLogin(true);
                reset();
              }}
              className={`w-1/2 py-2 rounded-full font-semibold transition-all ${
                isLogin
                  ? "bg-[#1B1664FC] text-white"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {t("Sign In")}
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                reset();
              }}
              className={`w-1/2 py-2 rounded-full font-semibold transition-all ${
                !isLogin
                  ? "bg-[#1B1664FC] text-white"
                  : "text-gray-600 dark:text-gray-300"
              }`}
            >
              {t("Sign Up")}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.form
                key="login"
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                    {t("Email")}
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder={t("Your Email")}
                    className="w-full border-b border-gray-400 bg-transparent focus:border-[#1B1664FC] outline-none py-2"
                  />
                  {(errors.email || apiErrors.email) && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email?.message || apiErrors.email?.[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                    {t("Password")}
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="********"
                    className="w-full border-b border-gray-400 bg-transparent focus:border-[#1B1664FC] outline-none py-2"
                  />
                  {(errors.password || apiErrors.password) && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password?.message || apiErrors.password?.[0]}
                    </p>
                  )}
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm text-[#1B1664FC] hover:underline"
                  >
                    {t("Forgot Password?")}
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1B1664FC] hover:bg-[#372E8B] text-white py-2 rounded-lg transition-all"
                >
                  {t("Log In")}
                </button>

                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                      try {
                        const decoded = jwtDecode(
                          credentialResponse.credential
                        );
                        const res = await ApiClient.post("Auth/google-login", {
                          email: decoded.email,
                          name: decoded.name,
                          googleId: decoded.sub,
                        });

                        localStorage.setItem("Auth_Token", res.data.token);
                        localStorage.setItem("user_id", res.data.user.id);
                        localStorage.setItem("email", res.data.user.email);

                        enqueueSnackbar("تم تسجيل الدخول بواسطة Google ✅", {
                          variant: "success",
                        });
                        navigate("/twofactor/uploadVerification");
                      } catch {
                        enqueueSnackbar("فشل تسجيل الدخول عبر Google ⚠️", {
                          variant: "error",
                        });
                      }
                    }}
                  />
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="register"
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div>
                  <label className="block text-sm mb-1">{t("Full Name")}</label>
                  <input
                    {...register("fullName")}
                    type="text"
                    placeholder={t("Your Name")}
                    className="w-full border-b border-gray-400 bg-transparent focus:border-[#1B1664FC] outline-none py-2"
                  />
                  {(errors.fullName || apiErrors.fullName) && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.fullName?.message || apiErrors.fullName?.[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">{t("Email")}</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder={t("Your Email")}
                    className="w-full border-b border-gray-400 bg-transparent focus:border-[#1B1664FC] outline-none py-2"
                  />
                  {(errors.email || apiErrors.email) && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email?.message || apiErrors.email?.[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    {t("Phone Number")}
                  </label>
                  <PhoneInput
                    country={"eg"}
                    value={watch("phone")}
                    onChange={(phone) => setValue("phone", `+${phone}`)}
                    inputProps={{ name: "phone", required: true }}
                    inputStyle={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      borderBottom: "1px solid #9ca3af",
                      borderRadius: 0,
                      fontSize: "16px",
                      paddingLeft: "48px",
                      height: "42px",
                    }}
                  />
                  {(errors.phone || apiErrors.phone) && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone?.message || apiErrors.phone?.[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">{t("Password")}</label>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="********"
                    className="w-full border-b border-gray-400 bg-transparent focus:border-[#1B1664FC] outline-none py-2"
                  />
                  {(errors.password || apiErrors.password) && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password?.message || apiErrors.password?.[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">
                    {t("Confirm Password")}
                  </label>
                  <input
                    {...register("confirmPassword")}
                    type="password"
                    placeholder="********"
                    className="w-full border-b border-gray-400 bg-transparent focus:border-[#1B1664FC] outline-none py-2"
                  />
                  {(errors.confirmPassword || apiErrors.confirmPassword) && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.confirmPassword?.message ||
                        apiErrors.confirmPassword?.[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">{t("Affiliate")}</label>
                  <input
                    {...register("affiliate")}
                    type="text"
                    placeholder={t("Affiliate code or name")}
                    className="w-full border-b border-gray-400 bg-transparent focus:border-[#1B1664FC] outline-none py-2"
                  />
                  {(errors.affiliate || apiErrors.affiliate) && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.affiliate?.message || apiErrors.affiliate?.[0]}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1B1664FC] hover:bg-[#372E8B] text-white py-2 rounded-lg transition-all"
                >
                  {t("Sign Up")}
                </button>

                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={() => {}}
                    onError={() =>
                      enqueueSnackbar("حدث خطأ أثناء تسجيل الدخول ⚠️", {
                        variant: "error",
                      })
                    }
                  />
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {isLogin
                ? `${t("Don't have an account?")} `
                : `${t("Already have an account?")} `}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  reset();
                }}
                className="text-[#1B1664FC] hover:underline font-semibold"
              >
                {isLogin ? t("Sign Up") : t("Sign In")}
              </button>
            </p>
          </div>
        </div>
      </div>

      <div className="md:w-1/2 hidden md:flex items-center justify-center p-8">
        <img
          src={london}
          alt="Login"
          className="rounded-3xl shadow-2xl object-cover w-full h-full"
        />
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          {isLogin
            ? t("Logged in successfully!")
            : t("Registered successfully!")}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginRegister;
