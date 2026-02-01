import {
  UserProfileAPI,
  type UserProfileChangePasswordRequest,
  type UserProfileChangeRequest,
} from "../api/user-api";
import store from "../store/store";
import { Router } from "../utils/router";

const userApi = new UserProfileAPI();

export class UserController {
  async fetchUser() {
    const result = await userApi.getUser();
    store.set("user", JSON.parse(result as string));
  }

  async updateProfile(data: UserProfileChangeRequest) {
    const result = await userApi.updateProfile(data);
    store.set("user", JSON.parse(result as string));
    new Router("#app").go("/profile");
  }

  async updateAvatar(data: FormData) {
    const result = await userApi.updateAvatar(data);
    store.set("user", JSON.parse(result as string));
    new Router("#app").go("/profile");
  }

  async changePassword(data: UserProfileChangePasswordRequest) {
    const result = await userApi.changePassword(data);
    if (result === "OK") {
      new Router("#app").go("/profile");
    }
  }
}
