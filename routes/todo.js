const express = require("express");
const {
  createTodo,
  getTodos,
  deleteTodo,
  updateTodo,
} = require("../controller/todoListController");
const requireAuth = require("../middleware/verfiyAuth");

const todoRouter = express.Router();

// require auth for all workout routes
todoRouter.use(requireAuth);

// GET all Todos
todoRouter.get("/", getTodos);

// POST a new Todo
todoRouter.post("/", createTodo);

// DELETE a Todo
todoRouter.delete("/:todoId", deleteTodo);

// UPDATE a Todo
todoRouter.patch("/:todoId", updateTodo);

module.exports = todoRouter;
