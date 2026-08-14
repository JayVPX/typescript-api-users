import { ObjectId } from "mongodb";
import type {
  GetOneParams,
  IGetOneUserRepository,
} from "../../controllers/get-one-user/protocols.js";
import { MongoClient } from "../../database/mongo.js";
import type { User } from "../../models/user.model.js";

export class MongoGetOneUserRepository implements IGetOneUserRepository {
  async getOneUser(params: GetOneParams): Promise<User> {
    console.log(params);

    const user = await MongoClient.db
      .collection<User>("users")
      .findOne({ _id: new ObjectId(params.id) });

    if (!user) {
      throw new Error("User not found!");
    }

    return { ...user, id: user?._id.toHexString() };
  }
}
