import { decodeToken } from "@/utils/jwtDecode";
import { getFormLocalStorage, setToLocalStorage } from "@/utils/localStorage";

export const setUserInfo = ({ token }: { token: string }) => {
  setToLocalStorage("token", token);
};

export const getUserInfo = () => {
  const token = getFormLocalStorage("token");

  if (token) {
    const decodedToken = decodeToken(token);
    return {
      ...decodedToken,
    };
  }
};
