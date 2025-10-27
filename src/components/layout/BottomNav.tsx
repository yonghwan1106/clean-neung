'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Camera, Calendar, Gift, User } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/',
      label: '홈',
      icon: Home,
    },
    {
      href: '/classify',
      label: '분류',
      icon: Camera,
    },
    {
      href: '/schedule',
      label: '일정',
      icon: Calendar,
    },
    {
      href: '/points',
      label: '포인트',
      icon: Gift,
    },
    {
      href: '/mypage',
      label: 'MY',
      icon: User,
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive
                  ? 'text-green-600'
                  : 'text-gray-600 hover:text-green-500'
              }`}
            >
              <Icon className={`h-6 w-6 ${isActive ? 'stroke-[2.5]' : ''}`} />
              <span className={`text-xs mt-1 ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
