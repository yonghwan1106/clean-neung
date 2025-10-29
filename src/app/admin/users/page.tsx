'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
    <div className="px-4 sm:px-0">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">사용자 관리</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            내보내기
          </Button>
          <Button variant="outline" size="sm">
            필터
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-around">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {users.length}
                </div>
                <div className="text-sm text-gray-500">총 사용자</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {users.filter(u => u.status === 'active').length}
                </div>
                <div className="text-sm text-gray-500">활성 사용자</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {users.reduce((sum, u) => sum + u.classificationsCount, 0)}
                </div>
                <div className="text-sm text-gray-500">총 분류 건수</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">
                  {users.reduce((sum, u) => sum + u.points, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">총 포인트</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>사용자 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    사용자
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    포인트
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    분류 건수
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    신고 건수
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    가입일
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    상태
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">
                    작업
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium">{user.points.toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4">
                      {user.classificationsCount}
                    </td>
                    <td className="py-3 px-4">
                      {user.reportsCount}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {user.joinedAt}
                    </td>
                    <td className="py-3 px-4">
                      {getStatusBadge(user.status)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          상세
                        </Button>
                        <Button size="sm" variant="outline">
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
