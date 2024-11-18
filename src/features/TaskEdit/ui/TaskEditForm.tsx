'use client';

import React, { useState } from 'react';
import styles from './TaskEditForm.module.scss';
import { Task } from '@/entities/task/model/types';
import { useUpdateTask } from '@/entities/task/model/taskApi';
import { toast } from 'react-toastify';

interface TaskEditFormProps {
  onClose: () => void;
  task: Task;
}

export const TaskEditForm: React.FC<TaskEditFormProps> = ({
  task,
  onClose,
}) => {
  const [title, setTitle] = useState(task.title);
  const updateTask = useUpdateTask();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Название задачи не может быть пустым');
      return;
    }

    updateTask.mutate({
      onClose,
      task: { ...task, title },
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder="Введите новое название задачи"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className={styles.actions}>
        <button
          className={styles.saveButton}
          disabled={updateTask.isPending}
          type="submit"
        >
          {updateTask.isPending ? 'Сохранение...' : 'Сохранить'}
        </button>
        <button className={styles.cancelButton} type="button" onClick={onClose}>
          Отмена
        </button>
      </div>
    </form>
  );
};
