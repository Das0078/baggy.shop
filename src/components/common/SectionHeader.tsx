import React from 'react';

interface SectionHeaderProps {
  title: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  align = 'center',
  className = '',
}) => {
  const alignmentClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  return (
    <h2
      className={`text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-theme-text-main font-display ${alignmentClass} ${className}`}
    >
      {title}
    </h2>
  );
};
