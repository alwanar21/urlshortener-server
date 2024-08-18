import express from "express";
import dotenv from "dotenv";
import { publicRouter } from "./routes/public-route.js";
import { errorMiddleware } from "./middleware/error-middleware.js";
import { userRouter } from "./routes/user-route.js";
import { notFoundMiddleware } from "./middleware/notFound-middleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(publicRouter);
app.use(userRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
