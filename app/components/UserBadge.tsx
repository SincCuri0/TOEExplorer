import { Shield, ShieldCheck, ShieldAlert } from 'lucide-react';

type UserRole = 'USER' | 'MODERATOR' | 'ADMIN';

interface UserBadgeProps {
  role: UserRole;
  showLabel?: boolean;
  className?: string;
}

const roleConfig = {
  USER: {
    icon: Shield,
    color: 'text-gray-500',
    bgColor: 'bg-gray-100',
    label: 'User'
  },
  MODERATOR: {
    icon: ShieldCheck,
    color: 'text-blue-500',
    bgColor: 'bg-blue-100',
    label: 'Moderator'
  },
  ADMIN: {
    icon: ShieldAlert,
    color: 'text-red-500',
    bgColor: 'bg-red-100',
    label: 'Admin'
  }
};

export default function UserBadge({ role, showLabel = false, className = '' }: UserBadgeProps) {
  const config = roleConfig[role];
  const Icon = config.icon;

  return (
    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${config.bgColor} ${className}`}>
      <Icon className={`h-4 w-4 ${config.color}`} />
      {showLabel && (
        <span className={`text-sm font-medium ${config.color}`}>
          {config.label}
        </span>
      )}
    </div>
  );
} 