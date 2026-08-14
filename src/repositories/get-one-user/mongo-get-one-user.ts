import { ObjectId } from "mongodb";
import type {
  GetOneParams,
  IGetOneUserRepository,
} from "../../controllers/get-one-user/protocols.js";
import { MongoClient } from "../../database/mongo.js";
import type { User } from "../../models/user.model.js";

export class MongoGetOneUserRepository implements IGetOneUserRepository {
  async getOneUser(params: GetOneParams): Promise<User> {
    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOne({ _id: new ObjectId(params.id) });

    if (!user) {
      throw new Error("User not found!");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
