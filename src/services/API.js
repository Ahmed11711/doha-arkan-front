import axiosInstance from "./axiosInstance";

class ApiClient {
  static cache = {};

  static async get(endpoint, useCache = true) {
    const url = endpoint;

    if (useCache && this.cache[url]) {
      return this.cache[url];
    }

    console.log("🌐 GET Fetching:", url);
    try {
      const res = await axiosInstance.get(url);
      if (useCache) this.cache[url] = res.data;
      console.log("✅ GET Success:", res.data);
      return res.data;
    } catch (error) {
      console.error("❌ GET Error:", error.response || error);
      throw error;
    }
  }

  // ======= POST =======
  static async post(endpoint, data) {
    return this._sendData("post", endpoint, data);
  }

  // ======= PUT =======
  static async put(endpoint, data) {
    return this._sendData("put", endpoint, data);
  }

  // ======= PATCH =======
  static async patch(endpoint, data) {
    return this._sendData("patch", endpoint, data);
  }

  // ======= DELETE =======
  static async delete(endpoint) {
    try {
      const auth = localStorage.getItem("Auth_Token");
      const res = await axiosInstance.delete(endpoint, {
        headers: {
          ...(auth && { Authorization: `Bearer ${auth}` }),
        },
      });
      // console.log("🗑 DELETE Success:", res.data);
      return res.data;
    } catch (error) {
      console.error("❌ DELETE Error:", error.response || error);
      throw error;
    }
  }

  // ======= Helper for POST/PUT/PATCH =======
  static async _sendData(method, endpoint, data) {
    const auth = localStorage.getItem("Auth_Token");
    try {
      const res = await axiosInstance[method](endpoint, data, {
        headers: {
          "Content-Type": "application/json",
          ...(auth && { Authorization: `Bearer ${auth}` }),
        },
      });
      // console.log(`📩 ${method.toUpperCase()} Success:`, res.data);
      return res.data;
    } catch (error) {
      console.error(`❌ ${method.toUpperCase()} Error:`, error.response || error);
      throw error;
    }
  }
}

export default ApiClient;
