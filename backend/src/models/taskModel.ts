import pool from "../db";

export interface Task {
  id?: number;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
}

export const getTasks = async (): Promise<Task[]> => {
  const result = await pool.query("SELECT * FROM tasks");
  return result.rows;
};

export const getTaskById = async (id: number): Promise<Task | null> => {
  const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
  return result.rows[0] || null;
};

export const createTask = async (task: Task): Promise<Task> => {
  const table = await pool.query(
    `
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      completed BOOLEAN NOT NULL,
      priority TEXT NOT NULL
    );
    `
  );

  const result = await pool.query(
    "INSERT INTO tasks (title, description, completed, priority) VALUES ($1, $2, $3, $4) RETURNING *",
    [task.title, task.description, task.completed, task.priority]
  );

  return result.rows[0];
};

export const updateTask = async (
  id: number,
  task: Partial<Task>
): Promise<Task | null> => {
  const result = await pool.query(
    "UPDATE tasks SET title = $1, description = $2, completed = $3, priority = $4 WHERE id = $5 RETURNING *",
    [task.title, task.description, task.completed, task.priority, id]
  );
  return result.rows[0] || null;
};

export const deleteTask = async (id: number): Promise<void> => {
  await pool.query("DELETE FROM tasks WHERE id = $1", [id]);
};
