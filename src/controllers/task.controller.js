import Task from "../models/task.model.js";
import Priority from '../models/priority.model.js';
import Status from '../models/status.model.js'

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
      .populate("user")
      .populate("status")
      .populate("priority");
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
    const { title, description, date, priorityId, statusId } = req.body;

try {
    const priority = await Priority.findOne({ id: priorityId });
    const status = await Status.findOne({ id: statusId });

    if (!priority || !status) {
        return res.status(400).json({ success: false, message: 'Priority or Status not found' });
    }

    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id,
      priority: priority._id, 
      status: status._id,     
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
      message: error.message || 'An error occurred while creating the task',
  });
}
};


export const deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  return res.status(204).json({ message: "Task eliminated succesfuly" });
};

export const updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

