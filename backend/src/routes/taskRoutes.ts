import { Router } from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController";

const router = Router();

router.get("/tasks", getTasks);
// @ts-ignore
router.get("/tasks/:id", getTaskById);
router.post("/tasks", createTask);
// @ts-ignore
router.put("/tasks/:id", updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
