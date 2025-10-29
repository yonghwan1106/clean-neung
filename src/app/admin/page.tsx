import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AdminDashboard() {
  return (
    <div className="px-4 sm:px-0">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">대시보드</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">
              전체 사용자
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,234</div>
            <p className="text-xs text-gray-500 mt-1">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">
              금일 분류 건수
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">567</div>
            <p className="text-xs text-gray-500 mt-1">+5% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">
              신고 대기중
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600">23</div>
            <p className="text-xs text-gray-500 mt-1">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium text-gray-500">
              활성 사용자
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">892</div>
            <p className="text-xs text-gray-500 mt-1">Last 7 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>최근 분류 기록</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">페트병</p>
                  <p className="text-sm text-gray-500">user@example.com</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">재활용 (플라스틱)</p>
                  <p className="text-xs text-gray-500">2분 전</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">종이박스</p>
                  <p className="text-sm text-gray-500">user2@example.com</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">재활용 (종이)</p>
                  <p className="text-xs text-gray-500">5분 전</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">음식물 쓰레기</p>
                  <p className="text-sm text-gray-500">user3@example.com</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">음식물</p>
                  <p className="text-xs text-gray-500">10분 전</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>분류 통계</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">재활용 (플라스틱)</span>
                <span className="text-sm text-gray-500">32%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '32%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">재활용 (종이)</span>
                <span className="text-sm text-gray-500">25%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">음식물</span>
                <span className="text-sm text-gray-500">20%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '20%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">종량제봉투</span>
                <span className="text-sm text-gray-500">15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-gray-600 h-2 rounded-full" style={{ width: '15%' }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">기타</span>
                <span className="text-sm text-gray-500">8%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: '8%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
