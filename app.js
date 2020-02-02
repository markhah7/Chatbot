const express = require("express");
const db = require("./db/db"); // Set up the express app
const fs = require("fs");
const bodyParser = require("body-parser");
const app = express(); // get all todos

app.use(bodyParser.json());

app.get("/api/v1/todos", (req, res) => {
  res.status(200).send({
    success: "true",
    message: "todos retrieved successfully",
    todos: db
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
