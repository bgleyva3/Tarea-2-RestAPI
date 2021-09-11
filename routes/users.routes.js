import {Router} from "express";
import {getUsers, getUserById, createUser, updateUser, deleteUser} from "../controllers/users.controller.js";
//Middleware enrutador (Router)

const routes = Router();

//GET, POST, PUT, DELETE
routes.get("/users", getUsers);
routes.get("/users/:id", getUserById)
routes.post("/users", createUser);
routes.put("/users/:id", updateUser);
routes.delete("/users/:id", deleteUser);

export default routes;


