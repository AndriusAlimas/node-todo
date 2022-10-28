const Todos = require("../models/todoModel");
const bodyParser = require("body-parser");

module.exports = function (app) {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get("/api/todos/:user", function (req, res) {
    // find that person
    Todos.find({ username: req.params.user }, function (err, todos) {
      if (err) throw err;
      res.send(todos);
    });
  });
};
