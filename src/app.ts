import express from "express";
import globahandlers from "./middleware/globahandlers";
import userRouter from "./User/userRouter";
import bookRouter from "./book/bookRoutes";

const app = express();
app.use(express.json());

// Home page route.
app.get("/", (req, res, next) => {
  res.json("Welcome To The Project Menu");
});

// globa error handlers
app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);
app.use(globahandlers);

export default app;

/////////
