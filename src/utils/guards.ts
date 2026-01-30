import { authAPI } from "../api/auth-api";

export const onlyGuest = async (): Promise<boolean> => {
  const auth = await authAPI.isAuth();
  console.log("auth", auth);

  return !auth;
};

export const onlyAuth = async (): Promise<boolean> => {
  const auth = await authAPI.isAuth();
  return auth;
};
