'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, User, MapPin, Gift, BarChart3, Calendar, Languages } from 'lucide-react';
import type { User as UserType } from '@/lib/types/user';
import type { WasteLog } from '@/lib/types/waste';

// 테스트용 User ID
const TEST_USER_ID = 'usr_test_001';

export default function MyPage() {
  const [user, setUser] = useState<UserType | null>(null);
  const [recentLogs, setRecentLogs] = useState<WasteLog[]>([]);
  const [stats, setStats] = useState({
    totalClassifications: 0,
    thisMonthClassifications: 0,
    totalPoints: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      // 사용자 정보 가져오기
      const userResponse = await fetch(`/api/user/${TEST_USER_ID}`);
      const userData = await userResponse.json();

      if (userData.success) {
        setUser(userData.data.user);
        setRecentLogs(userData.data.recent_logs);
        setStats(userData.data.stats);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
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
    });
  };

  const getLanguageName = (lang: string) => {
    const languages: Record<string, string> = {
      ko: '한국어',
      en: 'English',
      zh: '中文',
      ja: '日本語',
    };
    return languages[lang] || lang;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-green-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 font-medium">사용자 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center">
        <Card className="max-w-md shadow-xl">
          <CardContent className="p-8 text-center">
            <p className="text-gray-600 mb-4 text-lg">사용자 정보를 불러올 수 없습니다.</p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                홈으로 돌아가기
              </Button>
            </Link>
          </CardContent>
        </Card>
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
            마이페이지
          </h1>
          <p className="text-lg text-gray-600">내 정보와 활동 내역을 확인하세요</p>
        </div>

        {/* 프로필 카드 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              프로필
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-600">
                {user.name.charAt(0)}
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold">{user.name}</h3>
                <p className="text-gray-600">{user.email}</p>
                {user.phone && <p className="text-gray-600">{user.phone}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 pt-4 border-t">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">주소</div>
                  <div className="font-medium">
                    {user.address} {user.address_detail}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Languages className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">언어</div>
                  <div className="font-medium">{getLanguageName(user.language)}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-sm text-gray-600">가입일</div>
                  <div className="font-medium">{formatDate(user.created_at)}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">총 분류 횟수</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {stats.totalClassifications}
                <span className="text-base font-normal text-gray-600 ml-1">회</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">이번 달 분류</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {stats.thisMonthClassifications}
                <span className="text-base font-normal text-gray-600 ml-1">회</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">보유 포인트</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">
                {stats.totalPoints}
                <span className="text-base font-normal text-gray-600 ml-1">P</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 최근 활동 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              최근 활동
            </CardTitle>
            <CardDescription>최근 5개의 분류 기록</CardDescription>
          </CardHeader>
          <CardContent>
            {recentLogs.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>아직 분류 기록이 없습니다.</p>
                <p className="text-sm mt-2">쓰레기를 분류하고 포인트를 적립해보세요!</p>
                <Link href="/classify">
                  <Button className="mt-4 bg-green-600 hover:bg-green-700">
                    지금 분류하기
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex justify-between items-center p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1">
                      <div className="font-semibold">{log.detected_item}</div>
                      <div className="text-sm text-gray-600">{log.category}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatDate(log.created_at)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">신뢰도</div>
                      <div className="text-lg font-bold text-green-600">
                        {log.confidence}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 빠른 링크 */}
        <Card>
          <CardHeader>
            <CardTitle>빠른 링크</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link href="/classify">
              <Button variant="outline" className="w-full">
                쓰레기 분류하기
              </Button>
            </Link>
            <Link href="/points">
              <Button variant="outline" className="w-full">
                <Gift className="mr-2 h-4 w-4" />
                포인트 확인
              </Button>
            </Link>
            <Link href="/schedule">
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                배출 일정 보기
              </Button>
            </Link>
            <Button variant="outline" className="w-full" disabled>
              설정 (준비 중)
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
