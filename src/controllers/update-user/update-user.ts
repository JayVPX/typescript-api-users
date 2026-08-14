import type { User } from "../../models/user.model.js";
import { badRequest, successRequest } from "../helpers.js";
import type { HttpRequest, HttpResponse } from "../protocols.js";
import type {
  IUpdateUserController,
  IUpdateUserRepository,
  UpdateUserParams,
} from "./protocols.js";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly updateUserRepository: IUpdateUserRepository) {}
  async handle(
    httpRequest: HttpRequest<UpdateUserParams>,
  ): Promise<HttpResponse<User>> {
    try {
      const { body, params } = httpRequest;

      if (!params.id) {
        return badRequest("Missing user id.");
      }

      if (!body) {
        return badRequest("Fill the fields.");
      }
      const user = await this.updateUserRepository.updateUser(params.id, body);

      return successRequest<User>(user);
    } catch (error) {
      return {
        body: "Something went wrong.",
        statusCode: 500,
      };
    }
  }
}
