import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Bell, Phone } from 'lucide-react';
import { GANGNEUNG_SCHEDULES } from '@/lib/constants/schedules';

export default function SchedulePage() {
  const schedules = GANGNEUNG_SCHEDULES.default;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* 페이지 제목 with Image */}
        <div className="mb-8 bg-white border-l-4 border-blue-600 rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-48 w-full">
            <Image
              src="https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=1200&h=400&fit=crop"
              alt="쓰레기 배출 일정"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
            <div className="absolute inset-0 flex items-center px-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  배출 일정 안내
                </h1>
                <p className="text-lg text-white/90">
                  강릉시 쓰레기 배출 일정을 한눈에 확인하세요
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 지역 정보 */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900 flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              📍 교동 기준 (전체 동 공통 일정)
            </CardTitle>
            <CardDescription className="text-blue-700 text-base">
              강릉시 모든 동에 동일한 배출 일정이 적용됩니다
            </CardDescription>
          </CardHeader>
        </Card>

        {/* 일정 카드들 */}
        <div className="space-y-4">
          {/* 재활용 */}
          <Card className="border-t-4 border-green-600 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-2xl">
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
                      className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold"
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
                <Button variant="outline" size="sm" className="w-full border-green-600 text-green-700 hover:bg-green-50">
                  <Bell className="mr-2 h-4 w-4" />
                  알림 설정
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 종량제봉투 */}
          <Card className="border-t-4 border-gray-600 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center text-2xl">
                  🗑️
                </div>
                {schedules.general.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm text-gray-600 mb-2 font-semibold">배출 요일</div>
                <div className="flex flex-wrap gap-2">
                  {schedules.general.days.map((day, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm font-semibold"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1 font-semibold">배출 시간</div>
                <div className="text-lg font-bold text-gray-700">{schedules.general.time}</div>
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
          <Card className="border-t-4 border-orange-600 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center text-2xl">
                  🍽️
                </div>
                {schedules.food.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm text-gray-600 mb-2 font-semibold">배출 요일</div>
                <div className="flex flex-wrap gap-2">
                  {schedules.food.days.map((day, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold"
                    >
                      {day}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1 font-semibold">배출 시간</div>
                <div className="text-lg font-bold text-orange-700">{schedules.food.time}</div>
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
          <Card className="border-t-4 border-red-600 hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center text-2xl">
                  📦
                </div>
                {schedules.large.category}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="text-sm text-gray-600 mb-2 font-semibold">배출 방법</div>
                <div className="text-base">
                  강릉시청 환경과에 신고 후 스티커 부착하여 배출
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-600 mb-1 font-semibold">신고 방법</div>
                <div className="text-base flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  033-640-5000
                </div>
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
        <Card className="mt-8 bg-yellow-50 border-yellow-300">
          <CardHeader>
            <CardTitle className="text-yellow-900 flex items-center gap-2">
              <span>💡</span> 배출 시 유의사항
            </CardTitle>
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
