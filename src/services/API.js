import axiosInstance from "./axiosInstance";

class ApiClient {
  static cache = {}; // { endpoint: { data, timestamp } }
  static CACHE_DURATION = 5 * 60 * 1000; // 5 دقائق

  // ======= GET =======
  static async get(endpoint, useCache = true) {
    const url = endpoint;

    if (useCache && this.cache[url]) {
      const { data, timestamp } = this.cache[url];
      const now = Date.now();

      if (now - timestamp < this.CACHE_DURATION) {
        console.log(`📦 GET from cache: ${url}`);
        return this.cache[url].data;
      }

      delete this.cache[url];
    }

    try {
      const auth = localStorage.getItem("Auth_Token");
      const res = await axiosInstance.get(url, {
        headers: auth ? { Authorization: `Bearer ${auth}` } : {},
      });

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

  // ======= POST / PUT / PATCH =======
  static async post(endpoint, data) {
    return this._sendData("post", endpoint, data);
  }

  static async put(endpoint, data) {
    return this._sendData("put", endpoint, data);
  }

  static async patch(endpoint, data) {
    return this._sendData("patch", endpoint, data);
  }

  // ======= DELETE =======
  static async delete(endpoint) {
    try {
      const auth = localStorage.getItem("Auth_Token");
      const res = await axiosInstance.delete(endpoint, {
        headers: auth ? { Authorization: `Bearer ${auth}` } : {},
      });

      delete this.cache[endpoint];
      console.log(`🗑 Cache cleared for: ${endpoint}`);

      return res.data;
    } catch (error) {
      console.error("❌ DELETE Error:", error.response || error);
      throw error;
    }
  }

  // ======= Shared function for sending data =======
  static async _sendData(method, endpoint, data) {
    try {
      const auth = localStorage.getItem("Auth_Token");
      const res = await axiosInstance[method](endpoint, data, {
        headers: auth ? { Authorization: `Bearer ${auth}` } : {},
      });

      // Clear cache for relevant GET endpoint
      const parts = endpoint.split(/[-_\/]/);
      const lastPart = parts[parts.length - 1];
      const keyToDelete = `/${lastPart}`;
      if (this.cache[keyToDelete]) {
        delete this.cache[keyToDelete];
        console.log(`🗑 Cache cleared for: ${keyToDelete}`);
      }

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

  // ======= Print Cache =======
  static printCache() {
    console.log("🗂 Current Cache:");
    if (Object.keys(this.cache).length === 0) {
      console.log("Cache is empty!");
      return;
    }
    Object.entries(this.cache).forEach(([endpoint, { data, timestamp }]) => {
      console.log(`- Endpoint: ${endpoint}`);
      console.log(`  Timestamp: ${new Date(timestamp).toLocaleString()}`);
      console.log("  Data:", data);
    });
  }
}

export default ApiClient;
