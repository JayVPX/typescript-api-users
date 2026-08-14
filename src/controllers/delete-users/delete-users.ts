import type { User } from "../../models/user.model.js";
import { successRequest } from "../helpers.js";
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

      const user = await this.deleteUserRepository.deleteUser({
        id: paramsId,
      });

      return successRequest(user);
    } catch (error) {
      return {
        body: "Something went wrong",
        statusCode: 500,
      };
    }
  }
}
