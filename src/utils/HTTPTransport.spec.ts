import { expect } from "chai";
import { HTTPTransport } from "./HTTPTransport";

describe("HTTPTransport", () => {
  let requests: any[] = [];

  beforeEach(() => {
    requests = [];

    class MockXHR {
      method: string = "";
      url: string = "";
      headers: Record<string, string> = {};
      responseText: string = "";
      status: number = 200;
      timeout: number = 0;
      withCredentials: boolean = false;

      onload: () => void = () => {};
      onerror: () => void = () => {};
      onabort: () => void = () => {};
      ontimeout: () => void = () => {};

      open(method: string, url: string) {
        this.method = method;
        this.url = url;
      }

      setRequestHeader(key: string, value: string) {
        this.headers[key] = value;
      }

      send(data?: any) {
        this.data = data;
        requests.push(this);
      }

      data?: any;
    }

    // @ts-expect-error: mock XHR
    global.XMLHttpRequest = MockXHR;
  });

  it("GET добавляет query параметры в URL", async () => {
    const api = new HTTPTransport("https://test");

    api.get("/users", { data: { id: 1 } });

    const request = requests[0];

    expect(request.method).to.equal("GET");
    expect(request.url).to.equal("https://test/users?id=1");
  });

  it("POST отправляет JSON строку", async () => {
    const api = new HTTPTransport("https://test");

    api.post("/users", { data: { name: "Lera" } });

    const request = requests[0];

    expect(request.method).to.equal("POST");
    expect(request.data).to.equal(JSON.stringify({ name: "Lera" }));
  });

  it("resolve при статусе 200", async () => {
    const api = new HTTPTransport("https://test");

    const promise = api.get("/test");

    const request = requests[0];
    request.status = 200;
    request.responseText = "OK";
    request.onload();

    const result = await promise;
    expect(result).to.equal("OK");
  });

  it("reject при статусе 400", async () => {
    const api = new HTTPTransport("https://test");

    const promise = api.get("/test");

    const request = requests[0];
    request.status = 400;
    request.responseText = "Bad Request";
    request.onload();

    try {
      await promise;
    } catch (error) {
      expect(error).to.equal("Bad Request");
    }
  });

  it("reject если method не передан", async () => {
    const api = new HTTPTransport("https://test");

    try {
      await api.request("/test", {});
    } catch (error: any) {
      expect(error.message).to.equal("No method");
    }
  });
});
