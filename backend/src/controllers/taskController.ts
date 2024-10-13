import { Request, Response } from 'express';
import * as taskModel from '../models/taskModel';

export const getTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await taskModel.getTasks();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const task = await taskModel.getTaskById(id);
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  const { title, description, completed, priority } = req.body;
  try {
    const newTask = await taskModel.createTask({ title, description, completed, priority });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { title, description, completed, priority } = req.body;
  try {
    const updatedTask = await taskModel.updateTask(id, { title, description, completed, priority });
    if (!updatedTask) return res.status(404).send('Task not found');
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    await taskModel.deleteTask(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
