import { LoginAPI, type LoginRequest } from "../api/login-api";
import { Router } from "../utils/router";

const loginApi = new LoginAPI();

export class UserLoginController {
  public async login(data: LoginRequest) {
    try {
      const result = await loginApi.request(data);

      if (result == "OK") {
        const router = new Router("#app");
        router.go("/messenger");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
}
