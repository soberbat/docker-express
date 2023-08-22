const express = require("express");
const mongoose = require("mongoose");
const RedisStore = require("connect-redis").default;
const session = require("express-session");
const { createClient } = require("redis");

const postRouter = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");
const app = express();
const port = 3000;
const connectURl = "mongodb://berbo:myyPass@mongo:27017/?authSource=admin";

let redisClient = createClient({
  socket: {
    host: "redis",
    port: "6379",
  },
});

redisClient.connect().catch(console.error);

let redisStore = new RedisStore({
  client: redisClient,
});

app.use(
  session({
    store: redisStore,
    secret: "keyboard Key",
    saveUninitialized: false,
    resave: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 30000, // 30 minutes
    },
  })
);

app.use(express.json());
mongoose
  .connect(connectURl)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hi my name is");
});

app.use("/api/posts", postRouter);
app.use("/api/users", userRoute);

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
