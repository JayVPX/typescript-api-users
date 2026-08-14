import { ObjectId } from "mongodb";
import type {
  IUpdateUserRepository,
  UpdateUserParams,
} from "../../controllers/update-user/protocols.js";
import { MongoClient } from "../../database/mongo.js";
import type { User } from "../../models/user.model.js";

export class MongoUpdateUserRepository implements IUpdateUserRepository {
  async updateUser(
    id: string,
    updateUserParams: UpdateUserParams,
  ): Promise<User> {
    console.log(id);
    console.log(updateUserParams);

    const user = await MongoClient.db
      .collection<Omit<User, "id">>("users")
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: updateUserParams },
        {
          returnDocument: "after",
        },
      );

    if (!user) {
      throw new Error("User not found.");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
