import type { User } from "../../models/user.model.js";
import type { HttpRequest, HttpResponse } from "../protocols.js";
import type {
  IGetOneUserController,
  IGetOneUserRepository,
} from "./protocols.js";

export class GetOneUserController implements IGetOneUserController {
  constructor(private readonly getOneUserRepository: IGetOneUserRepository) {}

  async handle(httpRequest: HttpRequest<any>): Promise<HttpResponse<User>> {
    try {
      const user = await this.getOneUserRepository.getOneUser({
        id: httpRequest.params,
      });

      return {
        body: user,
        statusCode: 200,
      };
    } catch (error) {
      return {
        body: "Something went wrong",
        statusCode: 500,
      };
    }
  }
}
