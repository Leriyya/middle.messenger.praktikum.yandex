import { HTTPTransport } from "../utils/HTTPTransport";
import { BASE_URL, BaseAPI } from "./base-api";

export interface LoginRequest {
  login: string;
  password: string;
}

const authAPIInstance = new HTTPTransport(`${BASE_URL}auth`);

export class LoginAPI extends BaseAPI {
  public request(data: LoginRequest): Promise<unknown> {
    return authAPIInstance.post("/signin", { data });
  }
}
