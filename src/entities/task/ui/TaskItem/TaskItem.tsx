'use client';

import React from 'react';
import { Task } from '@/entities/task/model/types';
import styles from './TaskItem.module.scss';

interface TaskItemProps {
  formatDate: (date: string) => string;
  onComplete: (id: number, completed: boolean) => void;
  onDelete: (task: Task) => void;
  onEdit: (task: Task) => void;
  task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onEdit,
  onDelete,
  onComplete,
  formatDate,
}) => {
  return (
    <li
      className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}
    >
      <div className={styles.taskContent}>
        <span
          className={`${styles.taskTitle} ${task.completed ? styles.taskCompleted : ''}`}
          onClick={() => onComplete(task.id, !task.completed)}
        >
          {task.title}
        </span>
        <span className={styles.taskDate}>
          Дата создания: {formatDate(task.createdAt)}
        </span>
      </div>
      <div className={styles.actions}>
        <button className={styles.editButton} onClick={() => onEdit(task)}>
          Редактировать
        </button>
        <button className={styles.deleteButton} onClick={() => onDelete(task)}>
          Удалить
        </button>
      </div>
    </li>
  );
};
