'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import { useAddTask } from '@/entities/task/model/taskApi';
import styles from './TaskAddForm.module.scss';

export const TaskAddForm = () => {
  const [title, setTitle] = useState('');
  const { mutateAsync, isPending } = useAddTask();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Введите название задачи');
      return;
    }
    try {
      await mutateAsync({ title });
      toast.success('Задача добавлена');
      setTitle('');
    } catch {
      toast.error('Ошибка при добавлении задачи');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        placeholder="Добавить задачу"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button className={styles.addButton} disabled={isPending} type="submit">
        {isPending ? 'Добавление...' : 'Добавить'}
      </button>
    </form>
  );
};
