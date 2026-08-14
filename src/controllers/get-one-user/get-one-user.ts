import type { User } from "../../models/user.model.js";
import { badRequest, serverError, successRequest } from "../helpers.js";
import type { HttpRequest, HttpResponse } from "../protocols.js";
import type {
  IGetOneUserController,
  IGetOneUserRepository,
} from "./protocols.js";

export class GetOneUserController implements IGetOneUserController {
  constructor(private readonly getOneUserRepository: IGetOneUserRepository) {}

  async handle(
    httpRequest: HttpRequest<any>,
  ): Promise<HttpResponse<User | string>> {
    try {
      if (!httpRequest.params) {
        badRequest("Missing user id.");
      }

      const user = await this.getOneUserRepository.getOneUser({
        id: httpRequest.params,
      });

      return successRequest<User>(user);
    } catch (error) {
      return serverError();
    }
  }
}
