const TodoList = require("../models/TodoSchema");
const asyncHandler = require("express-async-handler");

// get al Todos
const getTodos = asyncHandler(async (req, res) => {
  const user_id = req.user._id

  try {
    const todos = await TodoList.find({user_id});
    res.status(200).json(todos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// add a new todo
const createTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  try {
    const user_id = req.user._id
    const todo = await TodoList.create({ title, description,user_id });
    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// delete a todo
const deleteTodo = asyncHandler(async (req, res) => {
  const { todoId } = req.params;
  try {
    const todo = await TodoList.findOneAndDelete(todoId);
    if (!todo) return res.status(400).json({ error: "no such a todo!" });
    res.status(200).json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// update a todo
const updateTodo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const { todoId } = req.params;
  try {
    const user_id = req.user._id

    const todo = await TodoList.findByIdAndDelete(todoId);
    todo.title = await req.body.title;
    todo.description = await req.body.description;
    const Updated = await TodoList.create({ title, description,user_id });

    if (!todo) return res.status(400).json({ error: "no such a todo!" });
    res.status(200).json(todo);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = { createTodo, getTodos, deleteTodo, updateTodo };
