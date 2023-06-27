import { HttpMetod, Method, IHttpResponse } from "./sendRequestType";
import axios, { AxiosError, AxiosResponse } from "axios";
const API_KEY = import.meta.env.VITE_API_URL;

const sendRequest = async (
  Metod: Method,
  URL: string,
  body?: any,
  token?: string
): Promise<IHttpResponse> => {
  let status: number = 0;
  let response: any;

  try {
    const headers = token ? { Authorization: `Bearer ${token}` } : {};
    switch (Metod) {
      case HttpMetod.GET:
        const responseGET: AxiosResponse = await axios.get(API_KEY + URL, {
          headers,
        });
        status = responseGET.status;
        response = responseGET.data;
        break;

      case HttpMetod.POST:
        const responsePOST: AxiosResponse = await axios.post(
          API_KEY + URL,
          body,
          {
            headers,
          }
        );
        status = responsePOST.status;
        response = responsePOST.data;
        break;

      case HttpMetod.PUT:
        const responsePUT: AxiosResponse = await axios.put(
          API_KEY + URL,
          body,
          {
            headers,
          }
        );
        status = responsePUT.status;
        response = responsePUT.data;
        break;

      case HttpMetod.DELETE:
        const responseDELETE: AxiosResponse = await axios.delete(
          API_KEY + URL,
          {
            headers,
          }
        );
        status = responseDELETE.status;
        response = responseDELETE.data;
        break;

      case HttpMetod.PATCH:
        const responsePATCH: AxiosResponse = await axios.patch(
          API_KEY + URL,
          body,
          {
            headers,
          }
        );
        status = responsePATCH.status;
        response = responsePATCH.data;
        break;

      default:
        throw Error("MetodHTTP not found");
    }

    return { status, response } as IHttpResponse;
  } catch (error: AxiosError | any) {
    status = error.response.status | 400;
    response =
      error.response.data.error || error.response.data || error.message;
    return { status, error: response } as IHttpResponse;
  }
};

export default sendRequest;
