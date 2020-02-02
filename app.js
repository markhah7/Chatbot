const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());
var db = [];

app.get("/api/v1/todos", (req, res) => {
  fs.readFile("./db/db.json", "UTF-8", (err, text) => {
    if (err) {
      console.log(`An error has occured:${err.message}`);
      process.exit();
    }
    console.log(text);
    db = JSON.parse(text);
    res.status(200).send({
      success: "true",
      message: "todos retrieved successfully",
      todos: db
    });
  });
});

app.post("/api/v1/addtodo", (req, res) => {
  let arrayStr = [];
  db.forEach(element => {
    arrayStr.push(element);
  });
  arrayStr.push(req.body);
  fs.writeFile("./db/db_1.json", `${JSON.stringify(arrayStr)}`, err => {
    if (err) {
      throw err;
    }
  });
  fs.readFile("./db/db.json", "UTF-8", (err, text) => {
    if (err) {
      console.log(`An error has occured:${err.message}`);
      process.exit();
    }
    console.log(text);
    db = JSON.parse(text);
    res.status(200).send({
      success: "true",
      message: "todos retrieved successfully",
      todos: db
    });
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
