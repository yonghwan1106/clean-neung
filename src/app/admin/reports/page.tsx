'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Report {
  id: string;
  reporter: string;
  location: string;
  description: string;
  status: 'pending' | 'in_progress' | 'resolved';
  createdAt: string;
  imageUrl?: string;
}

export default function ReportsPage() {
  const [reports] = useState<Report[]>([
    {
      id: '1',
      reporter: 'user@example.com',
      location: '강릉시 교동 123-45',
      description: '길가에 대형 폐기물이 무단 투기되어 있습니다.',
      status: 'pending',
      createdAt: '2024-10-28 14:30',
    },
    {
      id: '2',
      reporter: 'user2@example.com',
      location: '강릉시 홍제동 67-89',
      description: '음식물 쓰레기가 재활용 수거함에 버려져 있습니다.',
      status: 'in_progress',
      createdAt: '2024-10-28 12:15',
    },
    {
      id: '3',
      reporter: 'user3@example.com',
      location: '강릉시 포남동 234-56',
      description: '쓰레기 종량제 봉투가 배출일이 아닌 날에 버려져 있습니다.',
      status: 'resolved',
      createdAt: '2024-10-27 16:45',
    },
  ]);

  const getStatusBadge = (status: Report['status']) => {
    const variants = {
      pending: 'destructive',
      in_progress: 'default',
      resolved: 'secondary',
    } as const;

    const labels = {
      pending: '대기중',
      in_progress: '처리중',
      resolved: '완료',
    };

    return (
      <Badge variant={variants[status]}>
        {labels[status]}
      </Badge>
    );
  };

  const handleStatusChange = (id: string, newStatus: Report['status']) => {
    console.log(`Changing status of report ${id} to ${newStatus}`);
    // TODO: Implement API call to update status
  };

  return (
    <div className="px-4 sm:px-0">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">불법투기 신고 관리</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            대기중 ({reports.filter(r => r.status === 'pending').length})
          </Button>
          <Button variant="outline" size="sm">
            처리중 ({reports.filter(r => r.status === 'in_progress').length})
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{report.location}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">
                    신고자: {report.reporter}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {report.createdAt}
                  </p>
                </div>
                {getStatusBadge(report.status)}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">{report.description}</p>

              {report.imageUrl && (
                <div className="mb-4">
                  <img
                    src={report.imageUrl}
                    alt="신고 이미지"
                    className="rounded-lg max-w-md"
                  />
                </div>
              )}

              <div className="flex gap-2">
                {report.status === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => handleStatusChange(report.id, 'in_progress')}
                    >
                      처리 시작
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusChange(report.id, 'resolved')}
                    >
                      즉시 완료
                    </Button>
                  </>
                )}
                {report.status === 'in_progress' && (
                  <Button
                    size="sm"
                    onClick={() => handleStatusChange(report.id, 'resolved')}
                  >
                    완료 처리
                  </Button>
                )}
                {report.status === 'resolved' && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusChange(report.id, 'pending')}
                  >
                    재개
                  </Button>
                )}
                <Button size="sm" variant="outline">
                  위치 보기
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
