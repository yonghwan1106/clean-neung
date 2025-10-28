import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Calendar, Bell } from 'lucide-react';
import { GANGNEUNG_SCHEDULES } from '@/lib/constants/schedules';

export default function SchedulePage() {
  const schedules = GANGNEUNG_SCHEDULES.default;

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
            배출 일정
          </h1>
          <p className="text-lg text-gray-600">강릉시 쓰레기 배출 일정을 한눈에 확인하세요</p>
        </div>

        {/* 지역 정보 */}
        <Card className="mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              📍 교동 기준
            </CardTitle>
            <CardDescription className="text-blue-700 text-base">
              모든 동 동일한 배출 일정 적용됩니다
            </CardDescription>
          </CardHeader>
        </Card>

        {/* 일정 카드들 */}
        <div className="space-y-4">
          {/* 재활용 */}
          <Card className="border-2 border-green-300 hover:shadow-xl transition-shadow bg-gradient-to-br from-white to-green-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-2xl shadow-md">
                  ♻️
                </div>
                {schedules.recyclable.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-gray-600 mb-2 font-semibold">배출 요일</div>
                <div className="flex flex-wrap gap-2">
                  {schedules.recyclable.days.map((day, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-semibold shadow-md"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1 font-semibold">배출 시간</div>
                <div className="text-lg font-bold text-green-700">{schedules.recyclable.time}</div>
              </div>
              <div className="pt-2">
                <Button variant="outline" size="sm" className="w-full border-2 border-green-500 text-green-700 hover:bg-green-50">
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
