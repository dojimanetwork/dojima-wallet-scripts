// const fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response> =
//   (() => {
//     if (process.env.BUILD_ENV === "node") {
//       return require("node-fetch").default;
//     }
//     return window.fetch;
//   })();

import axios from "axios";

export class HttpRequest {
  baseUrl = "";

  constructor(option: { baseUrl: string } | string = {} as any) {
    option =
      typeof option === "string"
        ? {
            baseUrl: option,
          }
        : option;

    if (option.baseUrl) {
      this.baseUrl = option.baseUrl;
    }
  }

  get<T>(url = "", query = {}): Promise<T> {
    // @ts-ignore
    url = this.baseUrl + url + Object.keys(query).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`).join("&");

    // return fetch(url, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    // }).then((res) => {
    //   return res.json();
    // });
    return axios.get(url).then((res) => {
        return res.data;
      })
  }

  post(url = "", body: any) {
    url = this.baseUrl + url;

    // return fetch(url, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: body ? JSON.stringify(body) : null,
    // }).then((res) => {
    //   return res.json();
    // });
    return axios.post(url, JSON.stringify(body)).then((res) => {
      return res.data
    })
  }
}
