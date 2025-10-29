import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import Link from 'next/link';
import { Shield, LayoutDashboard, AlertTriangle, MapPin, Users, Home, Leaf } from 'lucide-react';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Check if user is authenticated and is an admin
  if (!session?.user) {
    redirect('/auth/login');
  }

  // TODO: Add admin role check
  // if (!session.user.isAdmin) {
  //   redirect('/');
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header - Government Style */}
      <div className="bg-blue-900 text-white py-2 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="font-bold">관리자 모드</span>
            </div>
            <Link href="/" className="hover:text-blue-200 flex items-center gap-1">
              <Home className="h-3 w-3" />
              사용자 페이지로
            </Link>
          </div>
        </div>
      </div>

      {/* Main Admin Header */}
      <header className="bg-white border-b-2 border-blue-600 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2 rounded-lg shadow-lg">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">클린릉 관리자</h1>
              <p className="text-sm text-gray-600">강릉시 스마트 분리수거 관리 시스템</p>
            </div>
          </div>
        </div>

        {/* Admin Navigation */}
        <nav className="bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="flex">
              <Link
                href="/admin"
                className="px-6 py-4 hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
              >
                <LayoutDashboard className="h-4 w-4" />
                대시보드
              </Link>
              <Link
                href="/admin/reports"
                className="px-6 py-4 hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
              >
                <AlertTriangle className="h-4 w-4" />
                불법투기 신고
              </Link>
              <Link
                href="/admin/locations"
                className="px-6 py-4 hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
              >
                <MapPin className="h-4 w-4" />
                쓰레기통 위치
              </Link>
              <Link
                href="/admin/users"
                className="px-6 py-4 hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium"
              >
                <Users className="h-4 w-4" />
                사용자 관리
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {children}
      </main>
    </div>
  );
}
