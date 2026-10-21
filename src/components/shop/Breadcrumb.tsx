import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

interface BreadcrumbProps {
  items: { label: string; href?: string }[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-4 md:py-6">
      <ol className="flex items-center space-x-2 text-xs sm:text-sm text-theme-text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center space-x-2">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="hover:text-theme-primary transition-colors font-normal"
                >
                  {item.label}
                </a>
              ) : (
                <span className={`font-semibold ${isLast ? 'text-theme-text-main' : ''}`}>
                  {item.label}
                </span>
              )}

              {!isLast && (
                <FiChevronRight size={14} className="text-theme-text-muted/60" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
