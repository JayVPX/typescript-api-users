import type { User } from "../../models/user.model.js";
import type { HttpRequest, HttpResponse } from "../protocols.js";

export interface GetOneParams {
  id: string;
}

export interface IGetOneUserController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User | string>>;
}

export interface IGetOneUserRepository {
  getOneUser(params: GetOneParams): Promise<User>;
}
