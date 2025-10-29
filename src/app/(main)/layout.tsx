import { ReactNode } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { PageFooter } from '@/components/layout/PageFooter';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <PageHeader />
      <main className="flex-1">
        {children}
      </main>
      <PageFooter />
    </div>
  );
}
