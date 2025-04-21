
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}

export const NavLink: React.FC<NavLinkProps> = ({
  to,
  children,
  icon,
  isActive,
  className,
  onClick,
}) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "flex items-center space-x-1 text-sm font-medium transition-colors duration-200",
        isActive
          ? "text-primary"
          : "text-foreground hover:text-primary",
        className
      )}
    >
      {icon}
      <span>{children}</span>
    </Link>
  );
};
