import type { User } from "../../models/user.model.js";
import type { HttpRequest, HttpResponse } from "../protocols.js";
import type {
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
} from "./protocols.js";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<User>> {
    try {
      if (!httpRequest.body) {
        return { statusCode: 400, body: "Invalid body requirements" };
      }

      const user = await this.createUserRepository.createUser(httpRequest.body);

      return { body: user, statusCode: 201 };
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
