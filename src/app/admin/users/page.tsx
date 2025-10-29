'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users as UsersIcon, Mail, Award, Recycle, AlertTriangle, Clock, UserCheck, UserX, FileDown, Filter, Eye, Edit } from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  classificationsCount: number;
  reportsCount: number;
  joinedAt: string;
  lastActive: string;
  status: 'active' | 'inactive' | 'suspended';
}

export default function UsersPage() {
  const [users] = useState<User[]>([
    {
      id: '1',
      name: '김강릉',
      email: 'user@example.com',
      points: 1250,
      classificationsCount: 125,
      reportsCount: 3,
      joinedAt: '2024-09-15',
      lastActive: '2024-10-28 14:30',
      status: 'active',
    },
    {
      id: '2',
      name: '이청정',
      email: 'user2@example.com',
      points: 890,
      classificationsCount: 89,
      reportsCount: 1,
      joinedAt: '2024-09-20',
      lastActive: '2024-10-28 12:15',
      status: 'active',
    },
    {
      id: '3',
      name: '박환경',
      email: 'user3@example.com',
      points: 2340,
      classificationsCount: 234,
      reportsCount: 8,
      joinedAt: '2024-08-10',
      lastActive: '2024-10-27 18:45',
      status: 'active',
    },
    {
      id: '4',
      name: '최분리',
      email: 'user4@example.com',
      points: 150,
      classificationsCount: 15,
      reportsCount: 0,
      joinedAt: '2024-10-20',
      lastActive: '2024-10-22 10:30',
      status: 'inactive',
    },
  ]);

  const getStatusBadge = (status: User['status']) => {
    const labels = {
      active: '활성',
      inactive: '비활성',
      suspended: '정지',
    };

    const colors = {
      active: 'default',
      inactive: 'secondary',
      suspended: 'destructive',
    } as const;

    return <Badge variant={colors[status]}>{labels[status]}</Badge>;
  };

  return (
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <UsersIcon className="h-8 w-8 text-blue-600" />
              사용자 관리
            </h2>
            <p className="text-gray-600">플랫폼 사용자를 관리하고 통계를 확인하세요</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-blue-600 text-blue-600">
              <FileDown className="h-4 w-4 mr-1" />
              내보내기
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-1" />
              필터
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-t-4 border-blue-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 사용자</p>
                <p className="text-3xl font-bold text-blue-600">{users.length}</p>
              </div>
              <UsersIcon className="h-10 w-10 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-green-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">활성 사용자</p>
                <p className="text-3xl font-bold text-green-600">
                  {users.filter(u => u.status === 'active').length}
                </p>
              </div>
              <UserCheck className="h-10 w-10 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-purple-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 분류 건수</p>
                <p className="text-3xl font-bold text-purple-600">
                  {users.reduce((sum, u) => sum + u.classificationsCount, 0)}
                </p>
              </div>
              <Recycle className="h-10 w-10 text-purple-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-yellow-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 포인트</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {users.reduce((sum, u) => sum + u.points, 0).toLocaleString()}
                </p>
              </div>
              <Award className="h-10 w-10 text-yellow-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="border-t-4 border-blue-600">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-xl font-bold text-gray-900">사용자 목록</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 bg-gray-50">
                    사용자
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 bg-gray-50">
                    포인트
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 bg-gray-50">
                    분류 건수
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 bg-gray-50">
                    신고 건수
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 bg-gray-50">
                    가입일
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 bg-gray-50">
                    상태
                  </th>
                  <th className="text-left py-4 px-4 text-sm font-bold text-gray-700 bg-gray-50">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <UsersIcon className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-bold text-yellow-600 flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        {user.points.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900">{user.classificationsCount}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-semibold text-gray-900">{user.reportsCount}</span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      {user.joinedAt}
                    </td>
                    <td className="py-4 px-4">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                          <Eye className="h-3 w-3 mr-1" />
                          상세
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-3 w-3 mr-1" />
                          수정
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
