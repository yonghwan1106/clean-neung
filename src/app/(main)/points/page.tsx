'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Gift, TrendingUp, Calendar } from 'lucide-react';
import type { Point } from '@/lib/types/waste';

// 테스트용 User ID
const TEST_USER_ID = 'usr_test_001';

export default function PointsPage() {
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [pointsHistory, setPointsHistory] = useState<Point[]>([]);
  const [thisMonthEarned, setThisMonthEarned] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPointsData();
  }, []);

  const fetchPointsData = async () => {
    try {
      const response = await fetch(`/api/points?userId=${TEST_USER_ID}`);
      const data = await response.json();

      if (data.success) {
        setTotalPoints(data.data.total_points);
        setPointsHistory(data.data.recent_history);
        setThisMonthEarned(data.data.this_month_earned);
      }
    } catch (error) {
      console.error('Failed to fetch points:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-medium">포인트 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 헤더 */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 hover:bg-green-100">
              <ArrowLeft className="mr-2 h-4 w-4" />
              홈으로
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
            포인트
          </h1>
          <p className="text-lg text-gray-600">올바른 분리수거로 적립한 포인트를 확인하세요</p>
        </div>

        {/* 포인트 요약 */}
        <Card className="mb-8 bg-gradient-to-br from-green-500 to-emerald-600 text-white shadow-2xl border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <Gift className="h-6 w-6" />
              내 포인트
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold mb-2">
              {totalPoints.toLocaleString()}P
            </div>
            <div className="flex items-center gap-2 text-green-100">
              <TrendingUp className="h-4 w-4" />
              <span>이번 달 {thisMonthEarned}P 적립</span>
            </div>
          </CardContent>
        </Card>

        {/* 포인트 사용 안내 */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">💡 포인트 사용 방법</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-900 space-y-2">
            <p>• 강릉 지역 상점에서 할인 쿠폰으로 사용 (준비 중)</p>
            <p>• 강릉페이로 전환 (1,000P = 1,000원, 준비 중)</p>
            <p>• 환경 단체에 기부 (준비 중)</p>
          </CardContent>
        </Card>

        {/* 포인트 적립 방법 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>포인트 적립 방법</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-semibold">쓰레기 분류</div>
                <div className="text-sm text-gray-600">AI 분석 1회당</div>
              </div>
              <div className="text-xl font-bold text-green-600">+10P</div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-semibold">연속 사용 보너스</div>
                <div className="text-sm text-gray-600">3일 연속 사용 시</div>
              </div>
              <div className="text-xl font-bold text-green-600">+20P</div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-semibold">주간 챌린지</div>
                <div className="text-sm text-gray-600">주 5회 이상 사용 시</div>
              </div>
              <div className="text-xl font-bold text-green-600">+50P</div>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-semibold">불법 투기 신고</div>
                <div className="text-sm text-gray-600">신고 1건당</div>
              </div>
              <div className="text-xl font-bold text-green-600">+20P</div>
            </div>
          </CardContent>
        </Card>

        {/* 포인트 히스토리 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              포인트 히스토리
            </CardTitle>
            <CardDescription>최근 10개의 포인트 내역</CardDescription>
          </CardHeader>
          <CardContent>
            {pointsHistory.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>아직 포인트 내역이 없습니다.</p>
                <p className="text-sm mt-2">쓰레기를 분류하고 포인트를 적립해보세요!</p>
                <Link href="/classify">
                  <Button className="mt-4 bg-green-600 hover:bg-green-700">
                    지금 분류하기
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {pointsHistory.map((point) => (
                  <div
                    key={point.id}
                    className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-semibold">{point.reason}</div>
                      <div className="text-sm text-gray-600">
                        {formatDate(point.created_at)}
                      </div>
                    </div>
                    <div
                      className={`text-xl font-bold ${
                        point.type === 'earn' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {point.type === 'earn' ? '+' : '-'}
                      {point.amount}P
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">더 많은 포인트를 적립하세요!</p>
          <div className="flex gap-3 justify-center">
            <Link href="/classify">
              <Button className="bg-green-600 hover:bg-green-700">
                쓰레기 분류하기
              </Button>
            </Link>
            <Link href="/mypage">
              <Button variant="outline">마이페이지</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
