import React, { useEffect, useState } from "react";
import { FaIdCard, FaUserCircle, FaUpload } from "react-icons/fa";
import ApiClient from "../../services/API";
import { useAuth } from "../../context/AuthContext";

export default function KYCDashboard() {
  const { user } = useAuth();

  const [kycData, setKycData] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({
    front_id: null,
    back_id: null,
    face: null,
  });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const verifiedKYC = user?.verified_kyc;

  useEffect(() => {
    const fetchKYC = async () => {
      try {
        const res = await ApiClient.get("/kyc");
        if (res.data.length > 0) setKycData(res.data[0]);
      } catch (err) {
        console.error("❌ Failed to fetch KYC:", err);
      }
    };
    fetchKYC();
  }, []);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setSelectedFiles((prev) => ({ ...prev, [name]: files[0] }));
      setMessage({ text: "", type: "" });
    }
  };

  const handleUpload = async () => {
    if (!user?._id) return;

    const formData = new FormData();
    formData.append("user_id", user._id);
    if (selectedFiles.front_id) formData.append("front_id", selectedFiles.front_id);
    if (selectedFiles.back_id) formData.append("back_id", selectedFiles.back_id);
    if (selectedFiles.face) formData.append("face", selectedFiles.face);

    try {
      setLoading(true);
      setMessage({ text: "Uploading KYC data...", type: "info" });
      await ApiClient.post("/kyc", formData);
      setMessage({ text: "KYC data saved successfully!", type: "success" });

      // تحديث الصور بعد الرفع
      const res = await ApiClient.get("/kyc");
      if (res.data.length > 0) setKycData(res.data[0]);
      setSelectedFiles({ front_id: null, back_id: null, face: null });
    } catch (err) {
      console.error("❌ Upload error:", err);
      setMessage({ text: "Failed to upload KYC data.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div className="p-6 text-gray-600">User not found</div>;

  const fields = [
    { label: "Front of ID", name: "front_id", icon: <FaIdCard /> },
    { label: "Back of ID", name: "back_id", icon: <FaIdCard /> },
    { label: "Selfie", name: "face", icon: <FaUserCircle /> },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">KYC Verification</h2>

      {message.text && (
        <div
          className={`px-4 py-3 rounded-xl font-medium text-sm ${
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {fields.map((field) => {
          const existingImage = kycData?.[field.name];

          return (
            <div
              key={field.name}
              className="border rounded-xl p-4 flex flex-col items-center justify-center"
            >
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-gray-700">
                {field.icon} {field.label}
              </h3>

              <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-3">
                {selectedFiles[field.name] ? (
                  <img
                    src={URL.createObjectURL(selectedFiles[field.name])}
                    alt={field.label}
                    className="object-contain w-full h-full"
                  />
                ) : existingImage ? (
                  <img
                    src={existingImage}
                    alt={field.label}
                    className="object-contain w-full h-full"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">
                    No image uploaded
                  </span>
                )}
              </div>

              {/* لو مش verified و الصورة مش موجودة → زر رفع */}
              {!verifiedKYC && !existingImage && (
                <label className="cursor-pointer bg-[#1B1664FC] hover:bg-[#372E8B] text-white px-4 py-2 rounded-lg flex items-center gap-2 transition">
                  <FaUpload /> Upload
                  <input
                    type="file"
                    name={field.name}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              )}
            </div>
          );
        })}
      </div>

      {/* زر Upload عام للصور الجديدة */}
      {!verifiedKYC && (
        <div className="flex justify-end">
          <button
            onClick={handleUpload}
            disabled={loading}
            className={`px-6 py-3 bg-[#1B1664FC] hover:bg-[#372E8B] text-white font-semibold rounded-lg transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Uploading..." : "Upload KYC"}
          </button>
        </div>
      )}
    </div>
  );
}
