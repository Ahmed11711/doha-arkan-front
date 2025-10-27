import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import idFrontImg from "../../assets/images/id-front.png";
import idBackImg from "../../assets/images/id-back.png";
import selfieImg from "../../assets/images/selfie.png";
import ApiClient from "../../services/API";

export default function UploadVerification() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [files, setFiles] = useState({
    front_id: null,
    back_id: null,
    face: null,
  });

  const user_id = localStorage.getItem("user_id");

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles.length > 0) {
      setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
      setMessage({ text: "", type: "" });
    }
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    const currentStepName =
      step === 1 ? "front_id" : step === 2 ? "back_id" : "face";

    if (!files[currentStepName]) {
      setMessage({
        text: "Please upload the required image before continuing.",
        type: "error",
      });
      return;
    }

    if (step < 3) {
      setStep(step + 1);
    } else {
      await handleSubmitKYC();
    }
  };

  const handleBack = () => {
    setMessage({ text: "", type: "" });
    if (step > 1) setStep(step - 1);
  };

  const handleSkip = () => {
    navigate("/"); // 👈 يوديه على الصفحة الرئيسية
  };

  const handleSubmitKYC = async () => {
    if (!user_id) {
      setMessage({
        text: "User ID not found. Please log in again.",
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      setMessage({ text: "Uploading verification data...", type: "info" });

      const formData = new FormData();
      formData.append("user_id", user_id);
      formData.append("front_id", files.front_id);
      formData.append("back_id", files.back_id);
      formData.append("face", files.face);

      const response = await ApiClient.post("kyc", formData);

      setMessage({
        text: "Verification uploaded successfully!",
        type: "success",
      });

      setTimeout(() => navigate("/twofactor/done-to-home"), 1000);
    } catch (error) {
      console.error("❌ KYC Upload Error:", error);
      setMessage({
        text: "Failed to upload verification. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const Stepper = () => (
    <div className="flex items-center justify-center my-10 sm:mb-12 flex-wrap gap-3 sm:gap-5 text-center">
      {[1, 2, 3].map((num) => (
        <React.Fragment key={num}>
          <span
            className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full font-semibold text-lg sm:text-xl ${
              step === num
                ? "bg-[#1B1664FC] text-white shadow-lg scale-105"
                : step > num
                ? "bg-green-600 text-white"
                : "bg-gray-300 text-gray-700"
            } transition-all duration-300`}
          >
            {num}
          </span>

          {num !== 3 && (
            <div
              className={`hidden sm:block w-12 sm:w-20 h-[3px] sm:h-[4px] rounded-full ${
                step > num ? "bg-green-600" : "bg-gray-300"
              } transition-colors duration-300`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const renderStepContent = () => {
    let title, desc, name, file, imageExample;

    switch (step) {
      case 1:
        title = "Upload Front of ID";
        desc = "Please upload a clear image of the front side of your ID card.";
        name = "front_id";
        file = files.front_id;
        imageExample = idFrontImg;
        break;
      case 2:
        title = "Upload Back of ID";
        desc = "Now upload the back side of your ID card.";
        name = "back_id";
        file = files.back_id;
        imageExample = idBackImg;
        break;
      case 3:
        title = "Upload Selfie";
        desc = "Finally, please upload a selfie to confirm your identity.";
        name = "face";
        file = files.face;
        imageExample = selfieImg;
        break;
      default:
        return null;
    }

    return (
      <>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 text-center">
          {title}
        </h2>
        <p className="text-gray-600 text-center mb-6 sm:mb-8 text-base sm:text-lg">
          {desc}
        </p>

        <img
          src={imageExample}
          alt="Example"
          className="w-48 sm:w-64 md:w-72 h-auto mb-6 sm:mb-8 rounded-2xl border object-contain mx-auto"
        />

        <div className="w-full border-2 border-dashed border-gray-400 rounded-2xl p-6 sm:p-10 text-center">
          {file ? (
            <div className="flex flex-col items-center">
              <img
                src={URL.createObjectURL(file)}
                alt={`${name} Preview`}
                className="w-full max-w-sm h-auto rounded-2xl mb-4 object-cover"
              />
              <label className="cursor-pointer text-[#1B1664FC] font-semibold underline hover:text-[#372E8B] transition-all text-sm sm:text-base">
                <input
                  type="file"
                  name={name}
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                Change Photo
              </label>
            </div>
          ) : (
            <label className="cursor-pointer text-gray-600 font-medium text-sm sm:text-base">
              <input
                type="file"
                name={name}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="block text-lg sm:text-xl">Click to upload</span>
            </label>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4  sm:p-8">
      <div className="w-full max-w-md sm:max-w-2xl md:max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-10 md:p-12 mt-24 flex flex-col items-center transition-all">
        {/* 👇 زرار Skip فوق */}
        <div className="w-full flex justify-end mb-4">
          <button
            onClick={handleSkip}
            className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 px-5 py-2 rounded-xl font-semibold transition-all text-sm sm:text-base shadow-sm"
          >
            Skip for now
          </button>
        </div>

        <Stepper />
        {renderStepContent()}

        {message.text && (
          <div
            className={`mt-6 sm:mt-8 px-4 sm:px-6 py-3 rounded-xl text-center font-medium text-sm sm:text-base ${
              message.type === "error"
                ? "bg-red-100 text-red-700"
                : message.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-3 w-full mt-8 sm:mt-10">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-8 py-3 rounded-xl font-semibold transition-all text-base sm:text-lg w-full sm:w-auto"
            >
              Back
            </button>
          ) : (
            <div></div>
          )}

          <button
            onClick={handleNext}
            disabled={loading}
            className={`${
              loading ? "bg-gray-400" : "bg-[#1B1664FC] hover:bg-[#372E8B]"
            } text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold transition-all text-base sm:text-lg w-full sm:w-auto`}
          >
            {loading ? "Uploading..." : step === 3 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
