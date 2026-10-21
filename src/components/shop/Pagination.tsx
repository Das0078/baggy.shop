import React from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 10,
  onPageChange,
}) => {
  return (
    <div className="pt-8 border-t border-theme-border flex items-center justify-between gap-4 select-none">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 border border-theme-border rounded-lg text-xs sm:text-sm font-semibold text-theme-text-main hover:bg-theme-bg-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <FiArrowLeft size={16} />
        <span>Previous</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center transition-colors cursor-pointer ${
              currentPage === page
                ? 'bg-theme-bg-light text-theme-primary font-bold border border-theme-border'
                : 'text-theme-text-muted hover:text-theme-primary hover:bg-theme-bg-light/60'
            }`}
          >
            {page}
          </button>
        ))}

        <span className="px-1 text-theme-text-muted text-xs sm:text-sm font-medium">...</span>

        {[8, 9, 10].map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-lg text-xs sm:text-sm font-medium flex items-center justify-center transition-colors cursor-pointer ${
              currentPage === page
                ? 'bg-theme-bg-light text-theme-primary font-bold border border-theme-border'
                : 'text-theme-text-muted hover:text-theme-primary hover:bg-theme-bg-light/60'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 border border-theme-border rounded-lg text-xs sm:text-sm font-semibold text-theme-text-main hover:bg-theme-bg-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
      >
        <span>Next</span>
        <FiArrowRight size={16} />
      </button>
    </div>
  );
};
