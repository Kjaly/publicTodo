'use client';

import React from 'react';
import { Modal } from '@/shared/ui/Modal';
import styles from './DeleteConfirmationModal.module.scss';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({ isOpen, onConfirm, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={styles.content}>
        <h3 className={styles.title}>
          Вы уверены, что хотите удалить эту задачу?
        </h3>
        <div className={styles.actions}>
          <button className={styles.deleteButton} onClick={onConfirm}>
            Удалить
          </button>
          <button className={styles.cancelButton} onClick={onClose}>
            Отмена
          </button>
        </div>
      </div>
    </Modal>
  );
};
