import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  AddTaskPayload,
  Task,
  TaskResponse,
} from '@/entities/task/model/types';

// Получение задач
export const useTasks = () =>
  useQuery<TaskResponse, Error>({
    queryFn: async () => {
      const response = await axios.get<TaskResponse>('/api/tasks');
      return response.data;
    },
    queryKey: ['tasks'],
  });

// Добавление задачи
export const useAddTask = () => {
  const queryClient = useQueryClient();
  return useMutation<Task, Error, AddTaskPayload>({
    mutationFn: async (newTask) => {
      const response = await axios.post<Task>('/api/tasks', {
        ...newTask,
        completed: false,
        createdAt: new Date().toISOString(), // Генерация корректной даты
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

// Обновление задачи
export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, Error, { onClose: () => void; task: Task }>({
    mutationFn: async ({ task }) => {
      const response = await axios.put<Task>('/api/tasks', task);
      return response.data;
    },

    onError: (_, __, context) => {
      const typedContext = context as { previousTasks?: TaskResponse }; // Приводим context к нужному типу
      if (typedContext?.previousTasks) {
        queryClient.setQueryData(['tasks'], typedContext.previousTasks);
      }
    },

    onMutate: async ({ task, onClose }) => {
      // Отменяем текущие запросы для задач
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      // Сохраняем текущее состояние задач
      const previousTasks = queryClient.getQueryData<TaskResponse>(['tasks']);

      // Оптимистически обновляем задачи
      queryClient.setQueryData<TaskResponse>(['tasks'], (oldTasks) =>
        oldTasks?.map((existingTask) =>
          existingTask.id === task.id
            ? { ...existingTask, ...task }
            : existingTask
        )
      );

      onClose();

      return { previousTasks }; // Сохраняем для rollback в случае ошибки
    },
    onSettled: () => {
      // Инвалидируем запросы, чтобы синхронизировать с сервером
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

// Удаление задачи
export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: async (taskId: number) => {
      await axios.delete('/api/tasks', { data: { id: taskId } });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};

//
export const useCompleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Task,
    Error,
    { completed: boolean; id: number; title?: string }
  >({
    mutationFn: async ({ id, completed, title }) => {
      const response = await axios.put<Task>('/api/tasks', {
        completed,
        id,
        title,
      }); // Передаём title
      return response.data;
    },
    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({ queryKey: ['tasks'] });

      const previousTasks = queryClient.getQueryData<TaskResponse>(['tasks']);
      queryClient.setQueryData<TaskResponse>(
        ['tasks'],
        (oldTasks) =>
          oldTasks?.map((task) =>
            task.id === id ? { ...task, completed } : task
          ) || []
      );

      return { previousTasks };
    },
    onError: (_, __, context) => {
      const typedContext = context;
      if (typedContext?.previousTasks) {
        queryClient.setQueryData(['tasks'], typedContext.previousTasks);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });
};
