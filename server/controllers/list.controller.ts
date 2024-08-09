import { Request, Response } from "express";
import List from "../models/list";

// Create a new List
export const createList = async (req: Request, res: Response) => {
  const { name, status } = req.body;
  const updateData = {
    name,
    status,
    cAt: new Date(),
    uAt: new Date(),
  };
  try {
    const list = new List(updateData);
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get All Lists
export const getLists = async (req: Request, res: Response) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const listsPromise = List.find().sort({ cAt: -1 }).skip(skip).limit(limit);

    const totalPromise = List.countDocuments();
    const [lists, total] = await Promise.all([listsPromise, totalPromise]);

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({ totalPages, lists });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Update a List by ID
export const updateList = async (req: Request, res: Response) => {
  try {
    const updateData = {
      uAt: new Date(),
      ...req.body,
    };
    const list = await List.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    res.status(200).json({ message: "List updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Delete a List by ID
export const deleteList = async (req: Request, res: Response) => {
  try {
    const list = await List.findByIdAndDelete(req.params.id);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    res.status(200).json({ message: "List deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
