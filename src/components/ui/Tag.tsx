'use client';

interface TagProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  color?: string;
  className?: string;
}

export function Tag({ label, active = false, onClick, className = '' }: TagProps) {
  return (
    <button
      onClick={onClick}
      className={`tag ${active ? 'active' : ''} ${className}`}
      type="button"
    >
      {label}
    </button>
  );
}
