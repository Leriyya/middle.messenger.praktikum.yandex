import { HTTPTransport } from "../utils/HTTPTransport";
import { BASE_URL, BaseAPI } from "./base-api";

export interface SignupRequest {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

const authAPIInstance = new HTTPTransport(`${BASE_URL}auth`);

export class SignupAPI extends BaseAPI {
  public request(data: SignupRequest) {
    return authAPIInstance.post("/signup", { data });
  }
}
