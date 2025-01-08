import { Request, Response, Router } from "express";

const router = Router();

interface Task {
  taskId: string;
  status:string;
  price: number;
}

const tasks: Task[] = [
  {
    "taskId": "65d4a54b89c5e342b2c2c5f6",
    "status": "pending",
    "price": 13.5
  },
  {
    "taskId": "4352323434aeaeae23445678",
    "status": "completed",
    "price": 33
  }
];

// Get all tasks
router.get("/tasks", (req: Request, res: Response) => {
  res.json(tasks);
});

// Get a task by ID
router.get("/tasks/:taskId", (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const task = tasks.find(t => t.taskId === taskId);
  if (task) {
    res.json(task);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

// Create a new task
router.post("/tasks", (req: Request, res: Response) => {
  const newTask: Task = {
    taskId: req.body.taskId,
    status: req.body.status,
    price: req.body.price
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task by ID
router.put("/tasks/:taskId", (req: Request, res: Response) => {
  const taskId = req.params.taskId;
  const taskIndex = tasks.findIndex(t => t.taskId === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex] = { 
      taskId: taskId,
      status: req.body.status,
      price: req.body.price 
    };
    res.json(tasks[taskIndex]);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});

export default router;