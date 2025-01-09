import { Router } from "express";
import { getAllTasks, getTask } from '../controllers/TaskController';

const router = Router();

// Get all tasks
router.get("/tasks", getAllTasks);

// Get a task by ID
router.get("/tasks/:taskId", getTask)
// router.get("/tasks/:taskId", (req: Request, res: Response) => {
//   const taskId = req.params.taskId;
//   const task = tasks.find(t => t.taskId === taskId);
//   if (task) {
//     res.json(task);
//   } else {
//     res.status(404).json({ message: "Task not found" });
//   }
// });

// Create a new task
// router.post("/tasks", (req: Request, res: Response) => {
//   const newTask: Task = {
//     taskId: req.body.taskId,
//     status: req.body.status,
//     price: req.body.price
//   };
//   tasks.push(newTask);
//   res.status(201).json(newTask);
// });

// // Update a task by ID
// router.put("/tasks/:taskId", (req: Request, res: Response) => {
//   const taskId = req.params.taskId;
//   const taskIndex = tasks.findIndex(t => t.taskId === taskId);

//   if (taskIndex !== -1) {
//     tasks[taskIndex] = { 
//       taskId: taskId,
//       status: req.body.status,
//       price: req.body.price 
//     };
//     res.json(tasks[taskIndex]);
//   } else {
//     res.status(404).json({ message: "Task not found" });
//   }
// });

export default router;