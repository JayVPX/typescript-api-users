import type { User } from "../../models/user.model.js";
import { badRequest, successRequest } from "../helpers.js";
import type { HttpRequest, HttpResponse } from "../protocols.js";
import type {
  DeleteUserParams,
  IDeleteUserController,
  IDeleteUserRepository,
} from "./protocols.js";

export class DeleteUserController implements IDeleteUserController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const paramsId = httpRequest.params;

      if (!paramsId) {
        badRequest("Missing user id.");
      }

      const user = await this.deleteUserRepository.deleteUser({
        id: paramsId,
      });

      return successRequest<User>(user);
    } catch (error) {
      return {
        body: "Something went wrong",
        statusCode: 500,
      };
    }
  }
}
