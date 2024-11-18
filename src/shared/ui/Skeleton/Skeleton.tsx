import React from 'react';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
  borderRadius?: string | number;
  className?: string;
  height?: string | number;
  width?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  borderRadius = '4px',
  className,
}) => {
  return (
    <div
      className={`${styles.skeleton} ${className || ''}`}
      style={{
        borderRadius,
        height,
        width,
      }}
    ></div>
  );
};
