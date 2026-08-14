import { successRequest } from "../helpers.js";
import type { IGetUserRepository, IGetUsersController } from "./protocols.js";

export class GetUsersController implements IGetUsersController {
  constructor(private readonly getUsersRepository: IGetUserRepository) {}

  async handle() {
    try {
      const users = await this.getUsersRepository.getUsers();

      return successRequest(users);
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
