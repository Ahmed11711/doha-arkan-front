import axiosInstance from "./axiosInstance";

class ApiClient {
  static cache = {}; // { endpoint: { data, timestamp } }
  static CACHE_DURATION = 5 * 60 * 1000; // 5 دقائق (يمكنك تعديلها)

  // ======= GET =======
  static async get(endpoint, useCache = true) {
    const url = endpoint;

    // ✅ لو الكاش مفعّل وفي بيانات حديثة
    if (useCache && this.cache[url]) {
      const { data, timestamp } = this.cache[url];
      const now = Date.now();

      // لو الكاش لسه صالح
      if (now - timestamp < this.CACHE_DURATION) {
        console.log("💾 Using cached data for:", url);
        return data;
      }

      // لو انتهت مدة الكاش نحذفه
      delete this.cache[url];
    }

    console.log("🌐 GET Fetching:", url);
    try {
      const res = await axiosInstance.get(url);

      // ✅ حفظ البيانات في الكاش مع توقيت الحفظ
      if (useCache) {
        this.cache[url] = {
          data: res.data,
          timestamp: Date.now(),
        };
      }

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

      // ❌ لو حذفنا حاجة من السيرفر نحذفها من الكاش برضو
      delete this.cache[endpoint];

      console.log("🗑 DELETE Success:", res.data);
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
          ...(auth && { Authorization: `Bearer ${auth}` }),
        },
      });

      // ✅ لو تم تحديث أو إضافة بيانات، نحدث الكاش
      if (["post", "put", "patch"].includes(method)) {
        delete this.cache[endpoint];
      }

      console.log(`📩 ${method.toUpperCase()} Success:`, res.data);
      return res.data;
    } catch (error) {
      console.error(`❌ ${method.toUpperCase()} Error:`, error.response || error);
      throw error;
    }
  }

  // ======= Clear All Cache =======
  static clearCache() {
    this.cache = {};
    console.log("🧹 Cache cleared!");
  }
}

export default ApiClient;
