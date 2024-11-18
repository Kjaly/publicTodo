'use client';

import { TaskList } from '@/widgets/TaskList/TaskList';
import { TaskAddForm } from '@/features/TaskAdd/ui/TaskAddForm';

const TodoPage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ margin: '0 auto', width: 'max-content' }}>TODO List</h1>
      <TaskAddForm />
      <TaskList />
    </div>
  );
};

export default TodoPage;
