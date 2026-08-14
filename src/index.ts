import express from "express";
import { config } from "dotenv";
import { GetUsersController } from "./controllers/get-users/get-users.js";
import { MongoGetUsersRepository } from "./repositories/get-users/mongo-get-users.js";
import { MongoClient } from "./database/mongo.js";
import { MongoCreateUserRepository } from "./repositories/create-users/mongo-create-users.js";
import { CreateUserController } from "./controllers/create-users/create-users.js";
import { MongoDeleteUserRepository } from "./repositories/delete-users/mongo-delete-users.js";
import { DeleteUserController } from "./controllers/delete-users/delete-users.js";

const main = async () => {
  config();
  const app = express();

  app.use(express.json());

  const port = process.env.PORT;

  await MongoClient.connect();

  // GetUsers
  app.get("/users", async (req, res) => {
    const mongoGetUsersRepository = new MongoGetUsersRepository();
    const getUsersController = new GetUsersController(mongoGetUsersRepository);

    const response = await getUsersController.handle();

    res.send(response.body).status(response.statusCode);
  });

  // PostUsers
  app.post("/users", async (req, res) => {
    const mongoCreateUserRepository = new MongoCreateUserRepository();
    const createUserController = new CreateUserController(
      mongoCreateUserRepository,
    );

    const response = await createUserController.handle({ body: req.body });

    res.send(response.body).status(response.statusCode);
  });

  // DeleteUsers

  app.delete("/users/:id", async (req, res) => {
    const mongoDeleteUserRepository = new MongoDeleteUserRepository();
    const deleteUserController = new DeleteUserController(
      mongoDeleteUserRepository,
    );

    const response = await deleteUserController.handle({
      params: req.params.id,
    });

    res.send(response.body).status(response.statusCode);
  });

  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
};

main();
