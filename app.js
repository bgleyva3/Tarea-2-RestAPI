import express from "express";
import userRoutes from "./routes/users.routes.js";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import {handleError} from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

const accessLogStream = fs.createWriteStream(path.resolve("access.log"), {flags: 'a'});
app.use(morgan('combined', {stream: accessLogStream}));

app.use("/api/v1", userRoutes);

app.use(handleError);

export default app;

//middleware 'use' can containe infinite callback and they wont execute one 
//another if next() is not passed continusly

/* app.use("/api/v1", function(req, res, next) {
    console.log("uuuu");
    next()
}, function (req, res, next) {
    console.log("oooo");
    next();
}, function (req, res, next) {
    console.log("eee")
    next()
}
); */