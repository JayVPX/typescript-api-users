import type { User } from "../../models/user.model.js";
import type { HttpRequest, HttpResponse } from "../protocols.js";

export interface CreateUserParams {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  createUser(params: CreateUserParams): Promise<User>;
}

export interface ICreateUserController {
  handle(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<User>>;
}
