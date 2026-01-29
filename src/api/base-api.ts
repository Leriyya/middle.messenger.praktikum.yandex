import type { LoginRequest } from "./login-api";

export const BASE_URL = "https://ya-praktikum.tech/api/v2/";
export const resourcesUrl = `${BASE_URL}resources`;

export class BaseAPI {
  create() {
    throw new Error("Not implemented");
  }

  request(props?: LoginRequest) {
    console.log(props);

    throw new Error("Not implemented");
  }

  update() {
    throw new Error("Not implemented");
  }

  delete() {
    throw new Error("Not implemented");
  }
}
