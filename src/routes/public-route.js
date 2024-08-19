import express from "express";
import userController from "../controller/user-controller.js";
import urlController from "../controller/url-controller.js";

const publicRouter = new express.Router();

//auth API
publicRouter.post("/api/register", userController.register);
publicRouter.post("/api/login", userController.login);

// url API
publicRouter.get("/url/:id", urlController.getUrl);

export { publicRouter };
