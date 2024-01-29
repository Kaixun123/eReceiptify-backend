const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const app = express();

require("dotenv").config();
const EXPRESS_PORT = process.env.EXPRESS_PORT;
const { sequelize } = require("./service/database");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const cookieParser = require("cookie-parser");

app.use(
    session({
        secret: "",
        store: new SequelizeStore({
            db: sequelize,
            checkExpirationInterval: 15 * 60 * 1000,
            expiration: 1 * 60 * 60 * 1000,
        }),
        resave: false,
        saveUninitialized: false, 
        proxy: true,
        cookie: {
            secure: true,
            httpOnly: true,
            path: "/",
        },
    })
);

app.use(
    helmet({
        strictTransportSecurity: {
            maxAge: 15552000,
            includeSubDomains: false,
        },
    }),
);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

let corOptions = {};

if (process.env.NODE_ENV === "development") {
  corOptions = {
    origin: '*',
    credentials: true,
    preflightContinue: true,
  };
} else {
  corOptions = {
    origin: 'https://' + process.env.BASE_DOMAIN,
    credentials: true,
    preflightContinue: true,
  };
}

app.use(cors(corOptions));


app.use((req, res, next) => {
    return res.status(404).json({ message: "Route not found" });
  });
  
  var server = null;
  sequelize.sync().then(() => {
    server = app.listen(EXPRESS_PORT, () => {
      console.info(`server is running on port ${EXPRESS_PORT}`);
      if (process.send) {
        process.send("ready");
      }
    });
  });
  
  process.on("SIGINT", () => {
    console.info("SIGINT signal received");
    server.close(function (err) {
      if (err) {
        console.error(err);
      }
      process.exit(err ? 1 : 0);
    });
  });
  
  process.on("SIGTERM", () => {
    console.info("SIGTERM signal received");
    server.close(function (err) {
      if (err) {
        console.error(err);
      }
      process.exit(err ? 1 : 0);
    });
  });
  