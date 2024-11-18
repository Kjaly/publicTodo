import React from 'react';

interface SvgSpriteProps {
  iconId: string; // ID иконки в SVG-спрайте
  className?: string;
  // Высота иконки
  fill?: string; // Ширина иконки
  height?: string | number;
  // Дополнительные стили
  width?: string | number; // Цвет иконки
}

export const SvgSprite: React.FC<SvgSpriteProps> = ({
  iconId,
  className,
  width = 16,
  height = 16,
  fill = 'currentColor',
}) => {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill={fill}
      height={height}
      width={width}
    >
      <use xlinkHref={`/icons/sprite.svg#${iconId}`} />
    </svg>
  );
};
