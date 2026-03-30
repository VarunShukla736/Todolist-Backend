import express from "express";
import {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
} from '../controllers/todoController.js';
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65f1a2b3c4d5e6f789abcd12
 *         title:
 *           type: string
 *           example: Learn Node.js
 *         completed:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           example: 2026-03-30T10:00:00.000Z
 *         updatedAt:
 *           type: string
 *           example: 2026-03-30T10:00:00.000Z
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
router.get('/', protect, getTodos);

/**
 * @swagger
 * /api/todos/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     tags: [Todos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: MongoDB ObjectId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
router.get('/:id', protect, getTodoById);

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 example: Learn backend deeply
 *     responses:
 *       201:
 *         description: Todo created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad request
 */
router.post('/', protect, createTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo
 *     tags: [Todos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: MongoDB ObjectId
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated title
 *               completed:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Todo updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
router.put('/:id', protect, updateTodo);

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: MongoDB ObjectId
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               example:
 *                 message: Deleted successfully
 *       404:
 *         description: Todo not found
 */
router.delete('/:id', protect, deleteTodo);

export default router;