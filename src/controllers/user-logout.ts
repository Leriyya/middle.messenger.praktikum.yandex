import { LogoutAPI } from "../api/logout-api";
import { Router } from "../utils/router";

const logoutApi = new LogoutAPI();

export class UserLogoutController {
  public async logout() {
    try {
      const result = await logoutApi.request();

      if (result == "OK") {
        const router = new Router("#app");
        router.go("/signup");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
}
