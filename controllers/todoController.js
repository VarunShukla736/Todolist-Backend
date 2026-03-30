// const Todo = require('../models/Todo');
import Todo from "../models/Todo.js"

// GET all todos
const getTodos = async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
};

// GET single
const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid Todo ID" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// CREATE
const createTodo = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title required" });
  }

  const todo = await Todo.create({ title });
  res.status(201).json(todo);
};

// UPDATE
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const { title, completed } = req.body;

    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;

    const updated = await todo.save();
    res.json(updated);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid Todo ID" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await todo.deleteOne();
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: "Invalid Todo ID" });
    }
    res.status(500).json({ message: "Server error" });
  }
};

export {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};