import { HTTPTransport } from "../utils/HTTPTransport";
import { BASE_URL, BaseAPI } from "./base-api";

const authAPIInstance = new HTTPTransport(`${BASE_URL}auth`);

export class LogoutAPI extends BaseAPI {
  public request(): Promise<unknown> {
    return authAPIInstance.post("/logout");
  }
}
