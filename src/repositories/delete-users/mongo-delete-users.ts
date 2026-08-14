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
      .collection<Omit<User, "id">>("users")
      .findOneAndDelete({ _id: new ObjectId(id) });

    if (!user) {
      throw new Error("User were not found.");
    }

    const { _id, ...rest } = user;

    return { id: _id.toHexString(), ...rest };
  }
}
