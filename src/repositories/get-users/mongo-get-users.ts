import type { IGetUserRepository } from "../../controllers/get-users/protocols.js";
import { MongoClient } from "../../database/mongo.js";
import type { User } from "../../models/user.model.js";

export class MongoGetUsersRepository implements IGetUserRepository {
  async getUsers(): Promise<User[]> {
    const users = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .find({})
      .toArray();

    return users.map(({ _id, ...rest }) => ({
      ...rest,
      id: _id.toHexString(),
    }));
  }
}
