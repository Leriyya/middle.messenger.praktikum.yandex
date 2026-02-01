import { HTTPTransport } from "../utils/HTTPTransport";
import { BASE_URL } from "./base-api";

const authAPIInstance = new HTTPTransport(`${BASE_URL}auth`);

export class AuthAPI {
  public async isAuth(): Promise<boolean> {
    try {
      const res = await authAPIInstance.get("/user"); // возвращает данные юзера, если авторизован
      return !!res;
    } catch {
      return false;
    }
  }
}

export const authAPI = new AuthAPI();
