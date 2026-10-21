import React, { useState } from 'react';
import { FiShoppingBag, FiCheck } from 'react-icons/fi';

interface AddToBagButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onAdd?: () => void;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export const AddToBagButton: React.FC<AddToBagButtonProps> = ({
  onAdd,
  onClick,
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    setIsAdded(true);
    onAdd?.();
    onClick?.(e);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const sizeClasses = {
    sm: 'h-10 px-4 text-xs font-semibold',
    md: 'h-11 sm:h-12 px-6 text-xs sm:text-sm font-semibold',
    lg: 'h-13 sm:h-14 px-8 text-sm sm:text-base font-semibold',
  };

  const iconSizes = {
    sm: 14,
    md: 16,
    lg: 18,
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className={`btn-add-to-bag ${sizeClasses[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      {...props}
    >
      <span className="btn-add-to-bag-content">
        {isAdded ? (
          <>
            <FiCheck size={iconSizes[size]} strokeWidth={3} className="text-white animate-scale-check" />
            <span>Added to bag</span>
          </>
        ) : (
          <>
            <FiShoppingBag size={iconSizes[size]} className="text-white flex-shrink-0" />
            <span>Add to bag</span>
          </>
        )}
      </span>
    </button>
  );
};
