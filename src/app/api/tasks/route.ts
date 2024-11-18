import { NextResponse } from 'next/server';

const getTasks = (length: number) => {
  return Array.from({ length }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - index); // Уменьшаем дату на index дней
    return {
      completed: index % 2 === 0, // Чередуем завершённые и незавершённые задачи
      createdAt: date.toISOString(),
      id: (index + 1).toString(),
      title: `Sample Task ${index + 1}`,
    };
  });
};

let tasks = getTasks(8);

// Simulated delay
const simulateDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// GET: Получение задач
export async function GET() {
  await simulateDelay(500);
  return NextResponse.json(tasks);
}

// POST: Создание новой задачи
export async function POST(req: Request) {
  await simulateDelay(500);
  const { title } = await req.json();
  const newTask = {
    completed: false,
    createdAt: new Date().toISOString(), // Добавляем дату создания
    id: `${Date.now()}`,
    title,
  };
  tasks.push(newTask);
  return NextResponse.json(newTask);
}

// PUT: Обновление задачи
export async function PUT(req: Request) {
  await simulateDelay(500);
  const { id, title, completed } = await req.json();
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed, title } : task
  );
  return NextResponse.json({ completed, id, title });
}

// DELETE: Удаление задачи
export async function DELETE(req: Request) {
  await simulateDelay(500);
  const { id } = await req.json();
  tasks = tasks.filter((task) => task.id !== id);
  return NextResponse.json({ success: true });
}
