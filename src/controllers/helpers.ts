import type { HttpResponse } from "./protocols.js";

export const badRequest = (message: string) => {
  return {
    statusCode: 400,
    body: message,
  };
};

export const successRequest = <T>(body: any): HttpResponse<T> => {
  return { statusCode: 200, body };
};

export const createdRequest = <T>(body: any): HttpResponse<T> => {
  return { statusCode: 201, body };
};

export const serverError = (): HttpResponse<string> => {
  return { statusCode: 500, body: "Something went wrong" };
};
