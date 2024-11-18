export interface Task {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

// Тип для ответа API
export type TaskResponse = Task[];
export type AddTaskPayload = { title: string };
