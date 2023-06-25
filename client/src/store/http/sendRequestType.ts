// export type GET = "GET"
// export type POST = "POST"
// export type PUT = "PUT"
// export type DELETE = "DELETE"
// export type PATCH = "PATCH"

export type GET = "GET";
export type POST = "POST";
export type PUT = "PUT";
export type DELETE = "DELETE";
export type PATCH = "PATCH";

export type Method = GET | POST | PUT | DELETE | PATCH;

export enum HttpMetod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}

export interface IHttpResponse {
  status: number;
  error?: string;
  data?: any;
}
