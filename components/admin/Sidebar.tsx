'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutDashboard, Settings, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { id: 'home', label: 'Home', icon: Home, href: '/admin' },
  { id: 'my-page', label: 'My Page', icon: LayoutDashboard, href: '/admin/editor' },
  { id: 'pages', label: 'Pages', icon: FileText, href: '/admin/pages' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/admin/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-20 bg-gray-950 border-r border-gray-800 flex flex-col items-center py-6 space-y-6">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center w-16 h-16 rounded-lg transition-colors',
              isActive
                ? 'bg-purple-600 text-white'
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            )}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        );
      })}
    </aside>
  );
}
