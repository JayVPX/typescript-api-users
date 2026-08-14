import type { User } from "../../models/user.model.js";
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

      if (!body) {
        throw new Error("Please insert a field to update.");
      }
      const user = await this.updateUserRepository.updateUser(params.id, body);

      return { body: user, statusCode: 200 };
    } catch (error) {
      return {
        body: "Something went wrong.",
        statusCode: 500,
      };
    }
  }
}
