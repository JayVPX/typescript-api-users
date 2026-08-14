import type { User } from "../../models/user.model.js";
import { serverError, successRequest } from "../helpers.js";
import type { IGetUserRepository, IGetUsersController } from "./protocols.js";

export class GetUsersController implements IGetUsersController {
  constructor(private readonly getUsersRepository: IGetUserRepository) {}

  async handle() {
    try {
      const users = await this.getUsersRepository.getUsers();

      return successRequest<User[]>(users);
    } catch (error) {
      return serverError();
    }
  }
}
