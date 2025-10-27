import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, Bell } from 'lucide-react';
import { GANGNEUNG_SCHEDULES } from '@/lib/constants/schedules';

export default function SchedulePage() {
  const schedules = GANGNEUNG_SCHEDULES.default;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* 헤더 */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              홈으로
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-green-600 mb-2">배출 일정</h1>
          <p className="text-gray-600">강릉시 쓰레기 배출 일정을 확인하세요</p>
        </div>

        {/* 지역 정보 */}
        <Card className="mb-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">📍 교동 기준</CardTitle>
            <CardDescription className="text-blue-700">
              모든 동 동일한 배출 일정 적용
            </CardDescription>
          </CardHeader>
        </Card>

        {/* 일정 카드들 */}
        <div className="space-y-4">
          {/* 재활용 */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                ♻️ {schedules.recyclable.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm text-gray-600 mb-2">배출 요일</div>
                <div className="flex flex-wrap gap-2">
                  {schedules.recyclable.days.map((day, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">배출 시간</div>
                <div className="text-base font-semibold">{schedules.recyclable.time}</div>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Bell className="mr-2 h-4 w-4" />
                  알림 설정
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 종량제봉투 */}
          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🗑️ {schedules.general.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm text-gray-600 mb-2">배출 요일</div>
                <div className="flex flex-wrap gap-2">
                  {schedules.general.days.map((day, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">배출 시간</div>
                <div className="text-base font-semibold">{schedules.general.time}</div>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Bell className="mr-2 h-4 w-4" />
                  알림 설정
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 음식물 */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                🍽️ {schedules.food.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm text-gray-600 mb-2">배출 요일</div>
                <div className="flex flex-wrap gap-2">
                  {schedules.food.days.map((day, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm font-medium"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">배출 시간</div>
                <div className="text-base font-semibold">{schedules.food.time}</div>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Bell className="mr-2 h-4 w-4" />
                  알림 설정
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 대형폐기물 */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                📦 {schedules.large.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm text-gray-600 mb-2">배출 방법</div>
                <div className="text-base">
                  강릉시청 환경과에 신고 후 스티커 부착하여 배출
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1">신고 방법</div>
                <div className="text-base">☎️ 033-640-5000</div>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" />
                  대형폐기물 신고하기 (준비 중)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 안내 정보 */}
        <Card className="mt-8 bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-900">💡 배출 시 유의사항</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-yellow-900">
            <p>• 배출 시간을 꼭 지켜주세요 (늦게 배출 시 수거되지 않을 수 있습니다)</p>
            <p>• 재활용품은 깨끗이 씻어서 배출해주세요</p>
            <p>• 혼합 배출 시 전체가 종량제 봉투 처리될 수 있습니다</p>
            <p>• 비가 오는 날은 재활용 배출을 피해주세요</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
