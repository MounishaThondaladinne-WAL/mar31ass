var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session");
const mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productsRouter = require("./routes/products");
var todosRouter = require("./routes/todos");
var productApp = require("./routes/productapp");
var Forum = require("./routes/forummar21");
var Hobbies = require("./routes/hobbies");
var TwitterApp = require("./routes/tweets");
var Author = require("./routes/authors");
var ForumApi = require("./routes/forums");
var Book = require("./routes/book");
var Mysql = require("./routes/mysql");
var cookieRouter = require("./routes/cookie");
var sessionRouter = require("./routes/session");
var userLoginRouter = require("./routes/userloginmysql");
var detailCookie = require("./routes/detailcookie");
var fileRouter = require("./routes/file");
var fileManagement = require("./routes/filemanage");
var userRegistration = require("./routes/userregistration");
var app = express();
//configure the sesssion.
app.use(
  session({
    secret: "session_secret_key",
    resave: true,
    saveUnitialized: true,
    cookie: {
      secure: false,
    },
  })
);
let mongoConnUrl = "mongodb://localhost/westsidenode";
mongoose.connect(mongoConnUrl, { useNewUrlParser: true });
let db = mongoose.connection;
db.on("error", function (error) {
  console.log("unable to connect to mongoDB");
  console.log(error);
});
db.on("open", function () {
  console.log("we are connected to mongodb server via mongoose");
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/todos", todosRouter);
app.use("/productapp", productApp);
app.use("/forummar21", Forum);
app.use("/hobbies", Hobbies);
app.use("/tweets", TwitterApp);
app.use("/authors", Author);
app.use("/forums", ForumApi);
app.use("/books", Book);
app.use("/mysql", Mysql);
app.use("/cookie", cookieRouter);
app.use("/userlogin", userLoginRouter);
app.use("/session", sessionRouter);
app.use("/detailcookie", detailCookie);
app.use("/file", fileRouter);
app.use("/files", fileManagement);
app.use("/user", userRegistration);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
