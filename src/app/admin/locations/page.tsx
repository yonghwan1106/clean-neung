'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface BinLocation {
  id: string;
  name: string;
  address: string;
  type: 'recyclable' | 'general' | 'food' | 'mixed';
  latitude: number;
  longitude: number;
  capacity: number;
  currentFill: number;
  lastUpdated: string;
  status: 'normal' | 'warning' | 'full';
}

export default function LocationsPage() {
  const [locations] = useState<BinLocation[]>([
    {
      id: '1',
      name: '교동 주민센터 앞',
      address: '강릉시 교동 123-45',
      type: 'mixed',
      latitude: 37.7556,
      longitude: 128.8961,
      capacity: 100,
      currentFill: 35,
      lastUpdated: '2024-10-28 14:30',
      status: 'normal',
    },
    {
      id: '2',
      name: '홍제동 버스정류장',
      address: '강릉시 홍제동 67-89',
      type: 'recyclable',
      latitude: 37.7612,
      longitude: 128.9012,
      capacity: 80,
      currentFill: 65,
      lastUpdated: '2024-10-28 13:15',
      status: 'warning',
    },
    {
      id: '3',
      name: '포남동 공원',
      address: '강릉시 포남동 234-56',
      type: 'mixed',
      latitude: 37.7489,
      longitude: 128.9134,
      capacity: 120,
      currentFill: 115,
      lastUpdated: '2024-10-28 12:00',
      status: 'full',
    },
    {
      id: '4',
      name: '경포대 해변',
      address: '강릉시 경포동 산1-1',
      type: 'mixed',
      latitude: 37.8050,
      longitude: 128.9089,
      capacity: 200,
      currentFill: 80,
      lastUpdated: '2024-10-28 15:00',
      status: 'normal',
    },
  ]);

  const getTypeBadge = (type: BinLocation['type']) => {
    const labels = {
      recyclable: '재활용',
      general: '일반쓰레기',
      food: '음식물',
      mixed: '통합',
    };

    const colors = {
      recyclable: 'default',
      general: 'secondary',
      food: 'outline',
      mixed: 'default',
    } as const;

    return <Badge variant={colors[type]}>{labels[type]}</Badge>;
  };

  const getStatusBadge = (status: BinLocation['status']) => {
    const labels = {
      normal: '정상',
      warning: '주의',
      full: '만원',
    };

    const colors = {
      normal: 'secondary',
      warning: 'default',
      full: 'destructive',
    } as const;

    return <Badge variant={colors[status]}>{labels[status]}</Badge>;
  };

  const getFillColor = (status: BinLocation['status']) => {
    const colors = {
      normal: 'bg-green-600',
      warning: 'bg-yellow-600',
      full: 'bg-red-600',
    };
    return colors[status];
  };

  return (
    <div className="px-4 sm:px-0">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">쓰레기통 위치 관리</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            지도 보기
          </Button>
          <Button size="sm">
            + 새 위치 추가
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-around">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">
                  {locations.filter(l => l.status === 'normal').length}
                </div>
                <div className="text-sm text-gray-500">정상</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">
                  {locations.filter(l => l.status === 'warning').length}
                </div>
                <div className="text-sm text-gray-500">주의</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600">
                  {locations.filter(l => l.status === 'full').length}
                </div>
                <div className="text-sm text-gray-500">만원</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  {locations.length}
                </div>
                <div className="text-sm text-gray-500">총 위치</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locations.map((location) => (
          <Card key={location.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{location.name}</CardTitle>
                  <p className="text-sm text-gray-500 mt-1">{location.address}</p>
                </div>
                {getStatusBadge(location.status)}
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  {getTypeBadge(location.type)}
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>용량</span>
                    <span className="font-medium">
                      {location.currentFill} / {location.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${getFillColor(location.status)} h-2 rounded-full`}
                      style={{
                        width: `${(location.currentFill / location.capacity) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="text-xs text-gray-500">
                  마지막 업데이트: {location.lastUpdated}
                </div>

                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    위치 보기
                  </Button>
                  <Button size="sm" variant="outline">
                    수거 완료
                  </Button>
                  <Button size="sm" variant="outline">
                    수정
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
