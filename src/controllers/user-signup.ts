import { SignupAPI, type SignupRequest } from "../api/signup-api";
import { Router } from "../utils/router";

const signupApi = new SignupAPI();

export class UserSignupController {
  public async login(data: SignupRequest) {
    try {
      await signupApi.request(data);

      const router = new Router("#app");
      router.go("/messenger");
    } catch (error) {
      console.error("Signup error:", error);
    }
  }
}
