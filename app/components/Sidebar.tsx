'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Store,
  Users,
  Settings,
  LogOut
} from 'lucide-react';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard, adminOnly: false },
  { name: 'Gestão de Estoque', href: '/dashboard/estoque', icon: Package, adminOnly: false },
  { name: 'Produtos', href: '/dashboard/produtos', icon: ShoppingBag, adminOnly: false },
  { name: 'Lojas', href: '/dashboard/lojas', icon: Store, adminOnly: false },
  { name: 'Usuários', href: '/dashboard/usuarios', icon: Users, adminOnly: false },
  { name: 'Configurações', href: '/dashboard/configuracoes', icon: Settings, adminOnly: false },
];

// Static user data
const user = {
  name: 'Ana Silva',
  role: 'admin',
  avatar: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMjAiIGZpbGw9IiM2MzY2ZjEiLz4KPHRleHQgeD0iMjAiIHk9IjI2IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BUzwvdGV4dD4KPC9zdmc+'
};

export default function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  const handleLogout = () => {
    // Simple logout - could redirect to login page
    console.log('Logout clicked');
  };

  return (
    <div 
      className={cn(
        'bg-sidebar-background text-sidebar-foreground h-screen flex flex-col transition-all duration-300 relative border-r border-sidebar-border',
        expanded ? 'w-64' : 'w-20'
      )}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        {expanded ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <span className="font-bold text-lg">CORE</span>
          </div>
        ) : (
          <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center mx-auto">
            <Package className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                !expanded && 'justify-center'
              )}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {expanded && (
                <span className="font-medium">{item.name}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="border-t border-sidebar-border p-4">
        <div className={cn(
          'flex items-center gap-3',
          !expanded && 'justify-center'
        )}>
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full flex-shrink-0"
          />
          {expanded && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {user.role === 'admin' ? 'Administrador' : 'Gerente'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 rounded-md hover:bg-sidebar-accent transition-colors"
                title="Sair"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
