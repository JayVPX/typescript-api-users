import type { User } from "../../models/user.model.js";
import type { HttpResponse } from "../protocols.js";

export interface IGetUsersController {
  handle(): Promise<HttpResponse<User[]>>;
}

export interface IGetUserRepository {
  getUsers(): Promise<User[]>;
}
