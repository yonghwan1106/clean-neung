import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Recycle, AlertTriangle, TrendingUp, Clock, CheckCircle } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div>
      {/* Page Title */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">대시보드</h2>
        <p className="text-gray-600">강릉시 스마트 분리수거 시스템 현황</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card className="border-t-4 border-blue-600 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              전체 사용자
            </CardTitle>
            <Users className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">1,234</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              전월 대비 +12%
            </p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-green-600 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              금일 분류 건수
            </CardTitle>
            <Recycle className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">567</div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              전일 대비 +5%
            </p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-red-600 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              신고 대기중
            </CardTitle>
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">23</div>
            <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              처리 필요
            </p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-purple-600 hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              활성 사용자
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">892</div>
            <p className="text-xs text-gray-500 mt-1">최근 7일</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card className="border-t-4 border-blue-600 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600" />
              최근 분류 기록
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 pb-3 hover:bg-gray-50 p-2 rounded transition-colors">
                <div>
                  <p className="font-semibold text-gray-900">페트병</p>
                  <p className="text-sm text-gray-600">user@example.com</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    재활용 (플라스틱)
                  </span>
                  <p className="text-xs text-gray-500 mt-1">2분 전</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-gray-200 pb-3 hover:bg-gray-50 p-2 rounded transition-colors">
                <div>
                  <p className="font-semibold text-gray-900">종이박스</p>
                  <p className="text-sm text-gray-600">user2@example.com</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    재활용 (종이)
                  </span>
                  <p className="text-xs text-gray-500 mt-1">5분 전</p>
                </div>
              </div>
              <div className="flex items-center justify-between hover:bg-gray-50 p-2 rounded transition-colors">
                <div>
                  <p className="font-semibold text-gray-900">음식물 쓰레기</p>
                  <p className="text-sm text-gray-600">user3@example.com</p>
                </div>
                <div className="text-right">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    음식물
                  </span>
                  <p className="text-xs text-gray-500 mt-1">10분 전</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-green-600 hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Recycle className="h-5 w-5 text-green-600" />
              분류 통계
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">재활용 (플라스틱)</span>
                  <span className="text-sm font-bold text-blue-600">32%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-blue-600 h-3 rounded-full" style={{ width: '32%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">재활용 (종이)</span>
                  <span className="text-sm font-bold text-green-600">25%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-green-600 h-3 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">음식물</span>
                  <span className="text-sm font-bold text-yellow-600">20%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-yellow-600 h-3 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">종량제봉투</span>
                  <span className="text-sm font-bold text-gray-600">15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gray-600 h-3 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">기타</span>
                  <span className="text-sm font-bold text-purple-600">8%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-purple-600 h-3 rounded-full" style={{ width: '8%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
