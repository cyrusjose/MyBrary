// make sure that mongodb is running by using brew services start mongodb-community@4.4
// To stop mongodb use brew services stop mongodb-community@4.4

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();

const expressLayouts = require("express-ejs-layouts");

// This allows us to find the index route
const indexRouter = require("./routes/index");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.set("layout", "layouts/layout");

app.use(expressLayouts);
app.use(express.static("public"));

const mongoose = require("mongoose");


mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", error => console.error(error));
db.once("open", () => console.log("connected to mongoose"));

// the first parameter is the root of our app and the second is the router that is handling that route.
app.use("/", indexRouter);

app.listen(process.env.PORT || 3000);
