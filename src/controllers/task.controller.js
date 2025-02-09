import mongoose from "mongoose";
import Task from "../models/task.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createTask = async (req, res) => {
  const { title, description, date, priority, status, img } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      date,
      priority,
      status,
      user: req.user.id,
      img: img || "",  // Guardamos la imagen si está presente, de lo contrario lo dejamos vacío.
    });

    const savedTask = await newTask.save();

    res.status(201).json({
      success: true,
      data: savedTask,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message || "An error occurred while creating the task",
    });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    return res.status(200).json({ message: "Task eliminated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};
