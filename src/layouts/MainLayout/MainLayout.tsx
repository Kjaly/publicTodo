import React, { PropsWithChildren } from 'react';
import cn from './MainLayout.module.scss'; // Учитываем, что вы используете `cn` для SCSS

export const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={cn.wrapper}>
      <header className={cn.header}>
        <h1>TODO List</h1>
      </header>
      <main className={cn.content}>{children}</main>
      <footer className={cn.footer}>
        <span>© 2024 TODO App</span>
      </footer>
    </div>
  );
};
