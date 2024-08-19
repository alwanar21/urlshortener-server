import express from "express";
import { authMiddleware } from "../middleware/auth-middleware.js";
import userController from "../controller/user-controller.js";
import urlController from "../controller/url-controller.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);

//User API
userRouter.get("/api/profile", userController.get);

//url API
userRouter.get("/api/urls", urlController.getAll);
userRouter.get("/api/url/:id", urlController.get);
userRouter.post("/api/url", urlController.create);
userRouter.patch("/api/url/:id", urlController.update);
userRouter.patch("/api/url/:id/status", urlController.updateStatus);
userRouter.delete("/api/url/:id", urlController.remove);

export { userRouter };
