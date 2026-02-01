type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

interface HTTPOptions {
  headers?: Record<string, string>;
  method?: HTTPMethod;
  data?: unknown;
  timeout?: number;
}

const METHODS: Record<HTTPMethod, HTTPMethod> = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

function queryStringify(data: Record<string, unknown>): string {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

export class HTTPTransport {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  get = (url: string, options: HTTPOptions = {}) => {
    return this.request(
      this.baseUrl + url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };

  post = (url: string, options: HTTPOptions = {}) => {
    return this.request(
      this.baseUrl + url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };

  put = (url: string, options: HTTPOptions = {}) => {
    return this.request(
      this.baseUrl + url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };

  delete = (url: string, options: HTTPOptions = {}) => {
    return this.request(
      this.baseUrl + url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };

  request = (
    url: string,
    options: HTTPOptions = {},
    timeout = 5000,
    withCredentials = true
  ) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error("No method"));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data as Record<string, unknown>)}`
          : url
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        try {
          const response = xhr.responseText;

          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(response);
          } else {
            reject(response);
          }
        } catch (error) {
          reject(error);
        }
      };

      if (!(data instanceof FormData)) {
        xhr.setRequestHeader("Content-Type", "application/json");
      }

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      xhr.withCredentials = withCredentials;

      if (isGet || !data) {
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}
