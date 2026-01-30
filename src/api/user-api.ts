import { HTTPTransport } from "../utils/HTTPTransport";
import { BASE_URL, BaseAPI } from "./base-api";

export interface UserProfileRequest {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  display_name: string;
  phone: string;
  avatar?: string;
}

export interface UserProfileChangeRequest {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  display_name: string;
  phone: string;
}

export interface UserProfileAvatarRequest {
  avatar: string;
}

export interface UserProfileChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export class UserProfileAPI extends BaseAPI {
  private transport = new HTTPTransport(`${BASE_URL}user`);
  private transportAuth = new HTTPTransport(`${BASE_URL}auth`);

  getUser() {
    return this.transportAuth.get("/user");
  }

  getProfile() {
    return this.transport.get("/profile");
  }

  updateProfile(data: UserProfileChangeRequest) {
    return this.transport.put("/profile", { data });
  }

  updateAvatar(formData: FormData) {
    return this.transport.put("/profile/avatar", {
      data: formData,
    });
  }

  changePassword(data: UserProfileChangePasswordRequest) {
    return this.transport.put("/password", { data });
  }
}
