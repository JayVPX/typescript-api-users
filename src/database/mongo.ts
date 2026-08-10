import { MongoClient as Mongo, Db } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongo,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    try {
      const mongoUsername = process.env.MONGODB_USER ?? "root";
      const mongoPassword = process.env.MONGODB_PASS ?? "password";
      const mongoUrl = process.env.MONGODB_URL || "";

      const client = new Mongo(mongoUrl, {
        auth: { username: mongoUsername, password: mongoPassword },
      });

      const db = client.db("users-db");

      this.client = client;
      this.db = db;

      console.log("Connected to MongoDB");
    } catch {}
  },
};
