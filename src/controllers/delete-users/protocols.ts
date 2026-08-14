import type { User } from "../../models/user.model.js";
import type { HttpRequest, HttpResponse } from "../protocols.js";

export interface DeleteUserParams {
  id: string;
}

export interface IDeleteUserController {
  handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>>;
}

export interface IDeleteUserRepository {
  deleteUser(params: DeleteUserParams): Promise<User>;
}
