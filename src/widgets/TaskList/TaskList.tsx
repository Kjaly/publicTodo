'use client';

import React, { useEffect, useState } from 'react';
import {
  useCompleteTask,
  useDeleteTask,
  useTasks,
} from '@/entities/task/model/taskApi';
import { Task } from '@/entities/task/model/types';
import { TaskEditForm } from '@/features/TaskEdit/ui/TaskEditForm';
import { TaskFilters } from '@/widgets/TaskFilters/TaskFilters';
import { Modal } from '@/shared/ui/Modal';
import { toast } from 'react-toastify';
import { DeleteConfirmationModal } from '@/features/TaskDelete/ui/DeleteConfirmationModal';
import { TaskItem } from '@/entities/task/ui/TaskItem';
import styles from './TaskList.module.scss';
import { SvgSprite } from '@/shared/ui/SvgSprite';
import { Skeleton } from '@/shared/ui/Skeleton';
import { v4 as uuidv4 } from 'uuid';


export const TaskList = () => {
  const { data: tasks, isLoading, isError } = useTasks();
  const completeTask = useCompleteTask();
  const deleteTask = useDeleteTask();
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  const [filter, setFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Task[] | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    order: 'asc' | 'desc';
    type: 'date' | 'title';
  }>({
    order: 'asc',
    type: 'date',
  });

  useEffect(() => {
    if (!tasks) return;

    const fetchSearchResults = async () => {
      const currentSearchTerm = searchTerm;

      // Задержка выполнения запроса
      const randomDelay = Math.floor(Math.random() * (3000 - 500 + 1)) + 500; // Генерация случайной задержки

      await new Promise((resolve) => setTimeout(resolve, randomDelay));

      const filteredTasks = tasks.filter((task) =>
        task.title.toLowerCase().includes(currentSearchTerm.toLowerCase())
      );

      setSearchResults(filteredTasks);
    };

    fetchSearchResults();
  }, [searchTerm, tasks]);

  const filteredTasks =
    searchResults ??
    tasks?.filter((task) => {
      if (filter === 'completed') return task.completed;
      if (filter === 'not_completed') return !task.completed;
      return true;
    });

  const sortedTasks = filteredTasks?.slice().sort((a, b) => {
    const { type, order } = sortConfig;
    if (type === 'date') {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    }
    if (type === 'title') {
      return order === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    return 0;
  });

  const toggleSort = (type: 'date' | 'title') => {
    setSortConfig((prev) => ({
      order:
        prev.type === type ? (prev.order === 'asc' ? 'desc' : 'asc') : 'asc',
      type,
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Некорректная дата';
    }
    return date.toLocaleString('ru-RU', {
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleComplete = async (id: number, completed: boolean) => {
    try {
      await completeTask.mutateAsync({ completed, id });
      toast.success(completed ? 'Задача завершена' : 'Задача снова активна');
    } catch {
      toast.error('Ошибка при обновлении статуса задачи');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask.mutateAsync(taskToDelete.id);
      toast.success('Задача удалена');
      setTaskToDelete(null);
    } catch {
      toast.error('Ошибка при удалении задачи');
    }
  };

  if (isError)
    return <p className={styles.message}>Ошибка при загрузке задач</p>;

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Поиск задач..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <TaskFilters currentFilter={filter} onFilterChange={setFilter} />

      {/* Управление сортировкой */}
      <div className={styles.sortContainer}>
        <button
          className={`${styles.sortButton} ${
            sortConfig.type === 'date' ? styles.active : ''
          }`}
          onClick={() => toggleSort('date')}
        >
          Сортировка по дате
          <SvgSprite
            iconId={
              sortConfig.type === 'date' && sortConfig.order === 'asc'
                ? 'arrow-up'
                : 'arrow-down'
            }
          />
        </button>
        <button
          className={`${styles.sortButton} ${
            sortConfig.type === 'title' ? styles.active : ''
          }`}
          onClick={() => toggleSort('title')}
        >
          Сортировка по названию
          <SvgSprite
            iconId={
              sortConfig.type === 'title' && sortConfig.order === 'asc'
                ? 'arrow-up'
                : 'arrow-down'
            }
          />
        </button>
      </div>
      <ul className={styles.taskList}>
        {isLoading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div key={index} style={{ marginBottom: '0.5rem' }}>
                <Skeleton borderRadius="4px" height="69px" width="100%" />
              </div>
            ))
          : sortedTasks?.map((task) => {
              const uId = uuidv4();
              return (
                <TaskItem
                  key={uId}
                  formatDate={formatDate}
                  task={task}
                  onComplete={handleComplete}
                  onDelete={setTaskToDelete}
                  onEdit={setEditingTask}
                />
              );
            })}
      </ul>

      {/* Модальное окно для редактирования задачи */}
      {editingTask && (
        <Modal isOpen={!!editingTask} onClose={() => setEditingTask(null)}>
          <TaskEditForm
            task={editingTask}
            onClose={() => setEditingTask(null)}
          />
        </Modal>
      )}

      {/* Модальное окно для подтверждения удаления */}
      <DeleteConfirmationModal
        isOpen={!!taskToDelete}
        onClose={() => setTaskToDelete(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};
