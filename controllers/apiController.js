const Todos = require("../models/todoModel");
const bodyParser = require("body-parser");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // find the todos using username
  app.get("/api/todos/:user", function (req, res) {
    Todos.find({ username: req.params.user }, function (err, todos) {
      if (err) throw err;
      res.send(todos);
    });
  });

  // find the todo using id
  app.get("/api/todo/:id", function (req, res) {
    Todos.findById({ _id: req.params.id }, function (err, todo) {
      if (err) throw err;
      res.send(todo);
    });
  });
};
