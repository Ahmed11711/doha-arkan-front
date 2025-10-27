import React, { useEffect, useState } from "react";
import { FaIdCard, FaUserCircle } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import ApiClient from "../../services/API";
import { useAuth } from "../../context/AuthContext";
import { useSnackbar } from "notistack";

export default function KYCDashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const [kycData, setKycData] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({
    front_id: null,
    back_id: null,
    face: null,
  });
  const [message, setUploadMessage] = useState({ text: "", type: "" });
  const [loading, setIsUploading] = useState(false);
  const [verifiedKYC, setVerifiedKYC] = useState(false);

  // ✅ دالة مستقلة لجلب الداتا
  const fetchKycData = async () => {
    try {
      const res = await ApiClient.get("/kyc");
      if (res.data.length > 0) {
        setKycData(res.data[0]);
        setVerifiedKYC(true);
      } else {
        setKycData(null);
        setVerifiedKYC(false);
      }
    } catch (err) {
      console.error("❌ Failed to fetch KYC:", err);
    }
  };

  useEffect(() => {
    fetchKycData();
  }, []);

  const handleFileChange = (name, file) => {
    setSelectedFiles((prev) => ({
      ...prev,
      [name]: file,
    }));
  };

  const handleUpload = async () => {
    if (
      !selectedFiles.front_id ||
      !selectedFiles.back_id ||
      !selectedFiles.face
    ) {
      enqueueSnackbar("Please select all 3 images before submitting.", {
        variant: "warning",
      });
      return;
    }

    try {
      setIsUploading(true);
      setUploadMessage({ text: "Uploading KYC data...", type: "info" });

      const formData = new FormData();
      formData.append("user_id", user?._id || localStorage.getItem("user_id"));
      formData.append("front_id", selectedFiles.front_id);
      formData.append("back_id", selectedFiles.back_id);
      formData.append("face", selectedFiles.face);

      await ApiClient.post("/kyc", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUploadMessage({
        text: "✅ KYC uploaded successfully!",
        type: "success",
      });
      enqueueSnackbar("✅ KYC uploaded successfully!", { variant: "success" });

      await fetchKycData();
      setSelectedFiles({ front_id: null, back_id: null, face: null });
    } catch (error) {
      console.error("❌ Upload Error:", error.response?.data || error.message);
      setUploadMessage({
        text: "❌ Failed to upload KYC. Please try again.",
        type: "error",
      });
      enqueueSnackbar("❌ Failed to upload KYC. Please try again.", {
        variant: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  if (!user)
    return <div className="p-6 text-gray-600">{t("User not found")}</div>;

  const fields = [
    { label: t("Front of ID"), name: "front_id", icon: <FaIdCard /> },
    { label: t("Back of ID"), name: "back_id", icon: <FaIdCard /> },
    { label: t("Selfie"), name: "face", icon: <FaUserCircle /> },
  ];

  return (
    <div className="w-full space-y-6 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-semibold text-[#1B1664] flex items-center gap-2">
          <FaIdCard className="text-[#1B1664]" />
          {t("KYC Verification")}
        </h2>
        {verifiedKYC && (
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700 border border-green-300">
            {t("Verified")}
          </span>
        )}
      </div>

      {message.text && (
        <div
          className={`px-4 py-3 rounded-xl font-medium text-sm shadow-md border ${
            message.type === "error"
              ? "bg-red-100 text-red-700 border-red-300"
              : message.type === "success"
              ? "bg-green-100 text-green-700 border-green-300"
              : "bg-blue-100 text-blue-700 border-blue-300"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {fields.map((field) => {
          const existingImage = kycData?.[field.name];

          return (
            <div
              key={field.name}
              className="bg-white/80 backdrop-blur-md border border-gray-200 rounded-2xl shadow-lg p-6 flex flex-col items-center transition hover:shadow-xl"
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-[#1B1664]">
                {field.icon} {field.label}
              </h3>

              <div className="w-full h-52 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden mb-4">
                {verifiedKYC ? (
                  existingImage ? (
                    <img
                      src={existingImage}
                      alt={field.label}
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">
                      {t("No image uploaded")}
                    </span>
                  )
                ) : selectedFiles[field.name] ? (
                  <img
                    src={URL.createObjectURL(selectedFiles[field.name])}
                    alt={field.label}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">
                    {t("No image uploaded")}
                  </span>
                )}
              </div>

              {!verifiedKYC && (
                <label className="w-full">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFileChange(field.name, e.target.files[0])
                    }
                  />
                  <div className="w-full py-2 px-3 text-center bg-[#1B1664] hover:bg-[#2d258f] text-white font-medium rounded-lg cursor-pointer transition">
                    {t("Upload Image")}
                  </div>
                </label>
              )}
            </div>
          );
        })}
      </div>

      {!verifiedKYC && (
        <div className="flex justify-end">
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`px-6 py-3 bg-[#1B1664FC] hover:bg-[#372E8B] text-white font-semibold rounded-lg shadow-md transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? t("Uploading...") : t("Submit KYC")}
          </button>
        </div>
      )}
    </div>
  );
}
