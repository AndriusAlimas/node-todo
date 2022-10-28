const Todos = require("../models/todoModel");

module.exports = function (app) {
  app.get("/api/setupTodos", function (req, res) {
    // seed database
    const starterTodos = [
      {
        username: "test",
        todo: "testing app",
        isDone: false,
        hasAttachment: false,
      },
      {
        username: "test",
        todo: "build app",
        isDone: false,
        hasAttachment: false,
      },
      {
        username: "test",
        todo: "learn Node",
        isDone: false,
        hasAttachment: false,
      },
    ];
    // seed data only if we not have already data
    Todos.find(
      {},
      (err, result) =>
        result.length === 0 &&
        Todos.create(starterTodos, function (err, results) {
          if (err) {
            console.log(err);
          }

          res.send(results);
        })
    );
  });
};
