import { create } from "zustand";
import { persist } from "zustand/middleware";

const useLoginUser = create(
  persist(
    (set, get) => ({
      userName: "",
      isLogin: false,
      signInUser: (params) => {
        set((state) => ({
          userName: params.name,
          isLogin: params.isLogin,
        }));
      },
      signOutUser: () => {
        set((state) => ({
          userName: "-",
          isLogin: false,
        }));
      },
    }),
    { name: "loginUser" }
  )
);
export default useLoginUser;
