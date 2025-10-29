'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Trash2, Map, Plus, CheckCircle, AlertCircle, XCircle, Edit } from 'lucide-react';

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
    <div>
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <MapPin className="h-8 w-8 text-blue-600" />
              쓰레기통 위치 관리
            </h2>
            <p className="text-gray-600">쓰레기통 위치 및 용량 현황을 모니터링하세요</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-blue-600 text-blue-600">
              <Map className="h-4 w-4 mr-1" />
              지도 보기
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-1" />
              새 위치 추가
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-t-4 border-green-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">정상</p>
                <p className="text-3xl font-bold text-green-600">
                  {locations.filter(l => l.status === 'normal').length}
                </p>
              </div>
              <CheckCircle className="h-10 w-10 text-green-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-t-4 border-yellow-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">주의</p>
                <p className="text-3xl font-bold text-yellow-600">
                  {locations.filter(l => l.status === 'warning').length}
                </p>
              </div>
              <AlertCircle className="h-10 w-10 text-yellow-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-t-4 border-red-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">만원</p>
                <p className="text-3xl font-bold text-red-600">
                  {locations.filter(l => l.status === 'full').length}
                </p>
              </div>
              <XCircle className="h-10 w-10 text-red-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
        <Card className="border-t-4 border-blue-600">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 위치</p>
                <p className="text-3xl font-bold text-blue-600">
                  {locations.length}
                </p>
              </div>
              <MapPin className="h-10 w-10 text-blue-600 opacity-20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Locations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {locations.map((location) => (
          <Card key={location.id} className="border-t-4 border-blue-600 hover:shadow-lg transition-shadow">
            <CardHeader className="bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Trash2 className="h-5 w-5 text-blue-600" />
                    {location.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {location.address}
                  </p>
                </div>
                {getStatusBadge(location.status)}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  {getTypeBadge(location.type)}
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2 font-semibold">
                    <span className="text-gray-700">용량</span>
                    <span className="text-gray-900">
                      {location.currentFill} / {location.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`${getFillColor(location.status)} h-3 rounded-full transition-all`}
                      style={{
                        width: `${(location.currentFill / location.capacity) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                  마지막 업데이트: {location.lastUpdated}
                </div>

                <div className="flex gap-2 flex-wrap">
                  <Button size="sm" variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">
                    <MapPin className="h-3 w-3 mr-1" />
                    위치 보기
                  </Button>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    수거 완료
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-3 w-3 mr-1" />
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
