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
    front: null,
    back: null,
    selfie: null,
  });

  const user_id = localStorage.getItem("user_id");

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
    setMessage({ text: "", type: "" });
  };

  const handleNext = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    const currentStepName =
      step === 1 ? "front" : step === 2 ? "back" : "selfie";

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
      formData.append("front_id", files.front);
      formData.append("back_id", files.back);
      formData.append("face", files.selfie);

      const response = await ApiClient.post("/kyc", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ KYC Response:", response.data);
      setMessage({
        text: "Verification uploaded successfully!",
        type: "success",
      });

      setTimeout(() => navigate("/twofactor/done"), 1000);
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
    <div className="flex items-center justify-center space-x-5 mb-12">
      {[1, 2, 3].map((num) => (
        <React.Fragment key={num}>
          <span
            className={`flex items-center justify-center w-14 h-14 rounded-full font-semibold text-xl ${
              step === num
                ? "bg-[#1B1664FC] text-white shadow-lg scale-105"
                : step > num
                ? "bg-green-600 text-white"
                : "bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300"
            } transition-all duration-300`}
          >
            {num}
          </span>
          {num !== 3 && (
            <div
              className={`w-20 h-[4px] rounded-full ${
                step > num ? "bg-green-600" : "bg-gray-300 dark:bg-gray-600"
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
        name = "front";
        file = files.front;
        imageExample = idFrontImg;
        break;
      case 2:
        title = "Upload Back of ID";
        desc = "Now upload the back side of your ID card.";
        name = "back";
        file = files.back;
        imageExample = idBackImg;
        break;
      case 3:
        title = "Upload Selfie";
        desc = "Finally, please upload a selfie to confirm your identity.";
        name = "selfie";
        file = files.selfie;
        imageExample = selfieImg;
        break;
      default:
        return null;
    }

    return (
      <>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 text-center">
          {title}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8 text-lg">
          {desc}
        </p>

        <img
          src={imageExample}
          alt="Example"
          className="w-72 h-44 object-contain mb-8 rounded-2xl border dark:border-gray-700"
        />

        <div className="w-full border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-2xl p-10 text-center">
          {file ? (
            <div className="flex flex-col items-center">
              <img
                src={URL.createObjectURL(file)}
                alt={`${name} Preview`}
                className="w-full h-72 object-cover rounded-2xl mb-4"
              />
              <label className="cursor-pointer text-[#1B1664FC] font-semibold underline hover:text-[#372E8B] transition-all">
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
            <label className="cursor-pointer text-gray-600 dark:text-gray-300 font-medium">
              <input
                type="file"
                name={name}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
              <span className="block text-lg">Click to upload</span>
            </label>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-8">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 flex flex-col items-center transition-all scale-[1.05]">
        <Stepper />
        {renderStepContent()}

        {message.text && (
          <div
            className={`mt-8 px-6 py-3 rounded-xl text-center font-medium ${
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

        <div className="flex justify-between w-full mt-10">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-gray-800 dark:text-white px-8 py-4 rounded-xl font-semibold transition-all text-lg"
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
            } text-white px-10 py-4 rounded-xl font-semibold transition-all text-lg`}
          >
            {loading ? "Uploading..." : step === 3 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
