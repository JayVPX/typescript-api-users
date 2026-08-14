import type { User } from "../../models/user.model.js";
import { badRequest, createdRequest, successRequest } from "../helpers.js";
import type { HttpRequest, HttpResponse } from "../protocols.js";
import type {
  CreateUserParams,
  ICreateUserController,
  ICreateUserRepository,
} from "./protocols.js";
import validator from "validator";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly createUserRepository: ICreateUserRepository) {}

  async handle(
    httpRequest: HttpRequest<CreateUserParams>,
  ): Promise<HttpResponse<User>> {
    try {
      const requiredFields = ["firstName", "lastName", "email", "password"];

      for (const field of requiredFields) {
        if (!httpRequest?.body?.[field as keyof CreateUserParams]?.length) {
          return badRequest(`Field ${field} is required`);
        }
      }

      const emailIsValid = validator.isEmail(httpRequest.body!.email);

      if (!emailIsValid) {
        return badRequest("E-mail inválido");
      }

      const user = await this.createUserRepository.createUser(
        httpRequest.body!,
      );

      return createdRequest<User>(user);
    } catch (error) {
      return {
        statusCode: 500,
        body: "Something went wrong",
      };
    }
  }
}
