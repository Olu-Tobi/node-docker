const express = require("express");
const cors = require("cors");
require("dotenv").config;
const { REDIS_URL, SESSION_SECRET, REDIS_PORT } = require("./config/config");
const connectWithRetry = require("./libs/database");

const session = require("express-session");
const redis = require("redis");
const RedisStore = require("connect-redis").default;

const userRouter = require("./routes/userRoutes");
const postRouter = require("./routes/postRoutes");

const app = express();
app.use(express.json());
app.use(cors());

connectWithRetry();

const client = redis.createClient({
  url: `${REDIS_URL}://${REDIS_URL}:${REDIS_PORT}`,
});
(async () => {
  await client.connect();
})();

app.enable("trust proxy");

app.use(
  session({
    store: new RedisStore({ client: client }),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false,
      httpOnly: true,

      maxAge: 30000,
    },
  })
);

app.get("/api/v1", (req, res) => {
  res.send("<h2>Ok let's have some fun with docker!!!</h2>");
  console.log("yeah it ran");
});

app.use("/api/v1/auth", userRouter);
app.use("/api/v1/posts", postRouter);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
