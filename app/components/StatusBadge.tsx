import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'available' | 'display' | 'in_transit' | 'reserved' | 'sold';
  className?: string;
}

const statusConfig = {
  available: {
    label: 'Disponível',
    className: 'bg-green-100 text-green-800 border-green-200'
  },
  display: {
    label: 'Mostruário',
    className: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  in_transit: {
    label: 'Em Trânsito',
    className: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  },
  reserved: {
    label: 'Reservado',
    className: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  sold: {
    label: 'Vendido',
    className: 'bg-gray-100 text-gray-800 border-gray-200'
  }
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={cn(
      'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
      config.className,
      className
    )}>
      {config.label}
    </span>
  );
}
