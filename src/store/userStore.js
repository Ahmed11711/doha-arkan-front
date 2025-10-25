// src/store/userStore.js
import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  token: null,
  balance: 0,
  subscriptions: [],
  isAuthenticated: false,

  login: (userData, token) =>
    set(() => ({
      user: userData,
      token,
      balance: userData?.balance ?? 0,
      subscriptions: userData?.subscriptions ?? [],
      isAuthenticated: true,
    })),

  updateUser: (newData) =>
    set((state) => ({
      user: { ...state.user, ...newData },
      balance: newData.balance ?? state.balance,
      subscriptions: newData.subscriptions ?? state.subscriptions,
    })),

  updateBalance: (newBalance) =>
    set((state) => ({
      balance: newBalance,
      user: { ...state.user, balance: newBalance },
    })),

  updateSubscriptions: (newSubscriptions) =>
    set((state) => ({
      subscriptions: newSubscriptions,
      user: { ...state.user, subscriptions: newSubscriptions },
    })),

  logout: () =>
    set(() => ({
      user: null,
      token: null,
      balance: 0,
      subscriptions: [],
      isAuthenticated: false,
    })),
}));

// helper: can be imported in plain modules (not React)
export const getUserStore = () => useUserStore.getState();
export const getToken = () => useUserStore.getState().token;
