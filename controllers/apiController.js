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

  // add todo inside user
  app.post("/api/todo", function (req, res) {
    // if i have this already todo
    if (req.body.id) {
      Todos.findByIdAndUpdate(
        req.body.id,
        {
          todo: req.body.todo,
          isDone: req.body.isDone,
          hasAttachment: req.body.hasAttachment,
        },
        function (err, todo) {
          if (err) throw err;
          res.send("Success");
        }
      );
    } else {
      // i don't have this todo lets create
      const newTodo = Todos({
        username: "test",
        todo: req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment,
      });
      newTodo.save(function (err) {
        if (err) throw err;
        res.send("Success");
      });
    }
  });

  // delete todo
  app.delete("/api/todo", function (req, res) {
    Todos.findByIdAndRemove(req.body.id, function (err) {
      if (err) throw err;
      res.send("Success");
    });
  });
};
