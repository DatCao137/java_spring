import React, { ReactNode, CSSProperties } from 'react';

interface props {
  title: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const BoxType2: React.FC<props> = ({ title, children, className, style }) => {
  return (
    <div className={`${className || ''}`} style={style}>
      <div className="w-full text-left border-b border-gray-400 px-2 py-1">
        {title}
      </div>
      <div className="w-full grid grid-cols-12 px-2 py-1">
        {children}
      </div>
    </div>
  );
};
