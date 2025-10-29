'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, MapPin, Clock, User, CheckCircle, XCircle, PlayCircle } from 'lucide-react';

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
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
          <AlertTriangle className="h-8 w-8 text-red-600" />
          불법투기 신고 관리
        </h2>
        <p className="text-gray-600">시민 신고 내역을 확인하고 처리하세요</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="border-t-4 border-red-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">대기중</p>
                <p className="text-3xl font-bold text-red-600">
                  {reports.filter(r => r.status === 'pending').length}
                </p>
              </div>
              <XCircle className="h-10 w-10 text-red-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-yellow-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">처리중</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {reports.filter(r => r.status === 'in_progress').length}
                </p>
              </div>
              <PlayCircle className="h-10 w-10 text-yellow-600 opacity-20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-green-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">완료</p>
                <p className="text-3xl font-bold text-green-600">
                  {reports.filter(r => r.status === 'resolved').length}
                </p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports List */}
      <div className="grid grid-cols-1 gap-6">
        {reports.map((report) => (
          <Card key={report.id} className="border-t-4 border-blue-600 hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    {report.location}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {report.reporter}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {report.createdAt}
                    </span>
                  </div>
                </div>
                {getStatusBadge(report.status)}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p className="text-gray-800 leading-relaxed">{report.description}</p>
              </div>

              {report.imageUrl && (
                <div className="mb-4">
                  <img
                    src={report.imageUrl}
                    alt="신고 이미지"
                    className="rounded-lg max-w-md border-2 border-gray-200"
                  />
                </div>
              )}

              <div className="flex gap-2 flex-wrap">
                {report.status === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => handleStatusChange(report.id, 'in_progress')}
                    >
                      <PlayCircle className="h-4 w-4 mr-1" />
                      처리 시작
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-600 text-green-600 hover:bg-green-50"
                      onClick={() => handleStatusChange(report.id, 'resolved')}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      즉시 완료
                    </Button>
                  </>
                )}
                {report.status === 'in_progress' && (
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleStatusChange(report.id, 'resolved')}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
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
                <Button size="sm" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  <MapPin className="h-4 w-4 mr-1" />
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
