import React, { useState } from "react";
import { useTranslation } from "react-i18next";
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

const LoginRegister = ({ onLoginSuccess }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [apiErrors, setApiErrors] = useState({});

  // ✅ Validation Schemas
  const schemaLogin = yup.object().shape({
    email: yup
      .string()
      .email(t("invalid_email") || "Invalid email")
      .required(t("required") || "Required"),
    password: yup.string().required(t("required") || "Required"),
  });

  const schemaRegister = yup.object().shape({
    fullName: yup.string().required(t("required") || "Required"),
    email: yup
      .string()
      .email(t("invalid_email") || "Invalid email")
      .required(t("required") || "Required"),
    phone: yup
      .string()
      .matches(/^\+\d+$/, t("invalid_phone") || "Invalid phone format")
      .required(t("required") || "Required"),
    password: yup
      .string()
      .min(6, t("password_min") || "Minimum 6 characters")
      .required(t("required") || "Required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], t("password_match") || "Passwords must match")
      .required(t("required") || "Required"),
    affiliate: yup.string().required(t("required") || "Required"),
  });

  // ✅ React Hook Form setup
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

  // ✅ Handle Submit
  const onSubmit = async (data) => {
    console.log("🟢 Form Submitted:", data);

    try {
      if (isLogin) {
        console.log("🔐 Sending Login Request...");
        const res = await ApiClient.post("Auth/login", {
          email: data.email,
          password: data.password,
        });

        console.log("✅ Login Response:", res);

        if (res?.data?.token) {
          const { token, user } = res.data;
          localStorage.setItem("Auth_Token", token);
          localStorage.setItem("user_id", user.id);
          localStorage.setItem("email", user.email);
          localStorage.setItem("isAuthenticated", "true");

          enqueueSnackbar("تم تسجيل الدخول بنجاح ✅", { variant: "success" });
          navigate("/twofactor/uploadVerification");
        } else {
          enqueueSnackbar("فشل تسجيل الدخول ⚠️", { variant: "error" });
        }
      } else {
        console.log("📝 Sending Register Request...");
        const signupRes = await ApiClient.post("Auth/create-account", {
          name: data.fullName,
          email: data.email,
          phone: data.phone,
          password: data.password,
          affiliate: data.affiliate,
          type: "user",
        });

        console.log("✅ Register Response:", signupRes);

        localStorage.setItem("user_id", signupRes.data.id);
        localStorage.setItem("email", signupRes.data.email);

        enqueueSnackbar("تم إنشاء الحساب بنجاح ✅", { variant: "success" });
        navigate("/twofactor");
      }
    } catch (error) {
      console.error("❌ Error:", error);

      if (error?.response?.status === 422) {
        setApiErrors(error.response.data.error || {});
      }

      const errMsg =
        error?.response?.data?.message ||
        "حدث خطأ غير متوقع، حاول مرة أخرى لاحقًا.";

      enqueueSnackbar(errMsg, { variant: "error" });
    }
  };

  // ✅ UI
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-1/2 w-full flex items-center justify-center bg-white dark:bg-gray-800 p-10">
        <div className="w-full max-w-md">
          {/* Switch buttons */}
          <div className="flex justify-center mb-8 bg-gray-100 dark:bg-gray-700 rounded-full p-1">
            <button
              onClick={() => {
                setIsLogin(true);
                reset();
              }}
              className={`w-1/2 py-2 rounded-full font-semibold transition-all ${
                isLogin
                  ? "bg-[#1B1664FC] text-white"
                  : "text-gray-600 dark:text-gray-300 hover:text-[#1B1664FC]"
              }`}
            >
              {t("Sign In") || "Sign In"}
            </button>
            <button
              onClick={() => {
                setIsLogin(false);
                reset();
              }}
              className={`w-1/2 py-2 rounded-full font-semibold transition-all ${
                !isLogin
                  ? "bg-[#1B1664FC] text-white"
                  : "text-gray-600 dark:text-gray-300 hover:text-[#1B1664FC]"
              }`}
            >
              {t("Sign Up") || "Sign Up"}
            </button>
          </div>

          {/* Animate Forms */}
          <AnimatePresence mode="wait">
            {isLogin ? (
              // 🔹 Login Form
              <motion.form
                key="login-form"
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                    {t("Email") || "Email"}
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder={t("Your Email") || "Your Email"}
                    className="w-full border-b border-gray-400 bg-transparent focus:border-[#1B1664FC] outline-none py-2"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                    {t("Password") || "Password"}
                  </label>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="********"
                    className="w-full border-b border-gray-400 bg-transparent focus:border-[#1B1664FC] outline-none py-2"
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1B1664FC] hover:bg-[#372E8B] text-white py-2 rounded-lg transition-all"
                >
                  {t("Log In") || "Log In"}
                </button>
              </motion.form>
            ) : (
              // 🔹 Register Form
              <motion.form
                key="register-form" // 👈 مهم جدًا
                onSubmit={handleSubmit(onSubmit)}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm mb-1">{t("Full Name") || "Full Name"}</label>
                  <input
                    {...register("fullName")}
                    type="text"
                    placeholder={t("Your Name") || "Your Name"}
                    className="w-full border-b border-gray-400 bg-transparent focus:border-[#1B1664FC] outline-none py-2"
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-1">{t("Email") || "Email"}</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder={t("Your Email") || "Your Email"}
                    className="w-full border-b border-gray-400 bg-transparent focus:border-[#1B1664FC] outline-none py-2"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-1">{t("Phone Number") || "Phone Number"}</label>
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
                  <label className="block text-sm mb-1">{t("Password") || "Password"}</label>
                  <input
                    {...register("password")}
                    type="password"
                    placeholder="********"
                    className="w-full border-b border-gray-400 bg-transparent focus:border-[#1B1664FC] outline-none py-2"
                  />
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>

                <div>
                  <label className="block text-sm mb-1">{t("Confirm Password") || "Confirm Password"}</label>
                  <input
                    {...register("confirmPassword")}
                    type="password"
                    placeholder="********"
                    className="w-full border-b border-gray-400 bg-transparent focus:border-[#1B1664FC] outline-none py-2"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-1">{t("Affiliate") || "Affiliate"}</label>
                  <input
                    {...register("affiliate")}
                    type="text"
                    placeholder={t("Affiliate code or name") || "Affiliate code or name"}
                    className="w-full border-b border-gray-400 bg-transparent focus:border-[#1B1664FC] outline-none py-2"
                  />
                  {errors.affiliate && <p className="text-red-500 text-xs mt-1">{errors.affiliate.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#1B1664FC] hover:bg-[#372E8B] text-white py-2 rounded-lg transition-all"
                >
                  {t("Sign Up") || "Sign Up"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="text-center mt-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {isLogin
                ? t("Don't have an account?") || "Don't have an account?"
                : t("Already have an account?") || "Already have an account?"}{" "}
              <button
                onClick={() => {
                  setIsLogin(!isLogin);
                  reset();
                }}
                className="text-[#1B1664FC] hover:underline font-semibold"
              >
                {isLogin ? t("Sign Up") || "Sign Up" : t("Sign In") || "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Side Image */}
      <div className="md:w-1/2 w-full hidden md:flex items-center justify-center p-8">
        <div className="w-full h-full rounded-3xl overflow-hidden shadow-lg">
          <img src={london} alt="Login side" className="object-cover w-full h-full" />
        </div>
      </div>

      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          {isLogin
            ? t("Logged in successfully!") || "Logged in successfully!"
            : t("Registered successfully!") || "Registered successfully!"}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default LoginRegister;
