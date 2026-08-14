import { ObjectId } from "mongodb";
import type {
  DeleteUserParams,
  IDeleteUserRepository,
} from "../../controllers/delete-users/protocols.js";
import type { HttpResponse } from "../../controllers/protocols.js";
import { MongoClient } from "../../database/mongo.js";
import type { User } from "../../models/user.model.js";

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUser(params: DeleteUserParams): Promise<User> {
    const { id } = params;

    const user = await MongoClient.db
      .collection<User>("users")
      .findOne({ _id: new ObjectId(id) });
    //   const response = await MongoClient.db.collection("users").findOneAndDelete()

    if (!user) {
      throw new Error("User were not found.");
    }

    return { ...user, id: user?._id.toHexString() };
  }
}
