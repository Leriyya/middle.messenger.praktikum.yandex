import { LogoutAPI } from "../api/logout-api";
import store from "../store/store";
import { Router } from "../utils/router";

const logoutApi = new LogoutAPI();

export class UserLogoutController {
  public async logout() {
    try {
      const result = await logoutApi.request();

      if (result == "OK") {
        store.set("user", null);
        store.set("chats", []);
        store.set("messages", []);

        const router = new Router("#app");
        router.go("/signin");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }
}
