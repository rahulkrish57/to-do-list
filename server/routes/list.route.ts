import express, { Request, Response } from "express";
import {
  createList,
  getLists,
  updateList,
  deleteList,
} from "../controllers/list.controller";
const router = express.Router();

// Create a new List
router.post("/", createList);

// Get all Lists
router.get("/", getLists);

// Update a List by ID
router.put("/:id", updateList);

// Delete a List by ID
router.delete("/:id", deleteList);

export default router;
