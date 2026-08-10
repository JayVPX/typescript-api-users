import type { IGetUserRepository } from "../../controllers/get-users/protocols.js";
import type { User } from "../../models/user.model.js";

export class MongoGetUsersRepository implements IGetUserRepository {
  async getUsers(): Promise<User[]> {
    return [
      {
        email: "joao@gmail.com",
        firstName: "João",
        lastName: "Praxedes",
        password: "123456",
      },
    ];
  }
}
