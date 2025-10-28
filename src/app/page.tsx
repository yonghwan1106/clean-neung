import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Calendar, Gift, Sparkles, Leaf, TrendingUp, Users, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-green-100 text-green-700 hover:bg-green-200 border-green-200">
              <Sparkles className="w-3 h-3 mr-1" />
              AI 기반 스마트 분리수거
            </Badge>

            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                클린릉
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              사진 한 장으로 쓰레기를 분류하고<br />
              <span className="text-green-600 font-semibold">포인트</span>도 적립하세요
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/classify">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg shadow-green-200 px-8 py-6 text-lg">
                  <Camera className="mr-2 h-5 w-5" />
                  지금 시작하기
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/schedule">
                <Button size="lg" variant="outline" className="border-2 border-green-600 text-green-700 hover:bg-green-50 px-8 py-6 text-lg">
                  <Calendar className="mr-2 h-5 w-5" />
                  배출 일정 확인
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">AI</div>
                <div className="text-sm text-gray-600 mt-1">자동 분류</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-gray-600 mt-1">언제나 가능</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600 mt-1">무료 사용</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            왜 클린릉을 사용해야 할까요?
          </h2>
          <p className="text-lg text-gray-600">
            강릉시민을 위한 똑똑한 분리수거 솔루션
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="border-2 hover:border-green-300 transition-all hover:shadow-xl group">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Camera className="h-7 w-7 text-green-600" />
              </div>
              <CardTitle className="text-xl">AI 자동 인식</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                Claude AI가 쓰레기 사진을 분석하여 정확한 분류 방법을 즉시 안내합니다
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-green-300 transition-all hover:shadow-xl group">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="h-7 w-7 text-blue-600" />
              </div>
              <CardTitle className="text-xl">배출 일정 알림</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                강릉시 지역별 배출 일정을 자동으로 확인하고 알림을 받아보세요
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-green-300 transition-all hover:shadow-xl group">
            <CardHeader>
              <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Gift className="h-7 w-7 text-yellow-600" />
              </div>
              <CardTitle className="text-xl">포인트 적립</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                올바른 분리수거로 포인트를 적립하고 지역 상점에서 사용하세요
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How it Works */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              이렇게 간단해요
            </h2>
            <p className="text-lg text-gray-600">
              3단계로 완성되는 스마트 분리수거
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">사진 촬영</h3>
              <p className="text-gray-600">
                버리고 싶은 쓰레기를<br />사진으로 찍어주세요
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">AI 분석</h3>
              <p className="text-gray-600">
                AI가 자동으로 분석하여<br />분류 방법을 알려드려요
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">포인트 적립</h3>
              <p className="text-gray-600">
                올바르게 배출하고<br />포인트를 받으세요
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="max-w-4xl mx-auto bg-gradient-to-r from-green-600 to-emerald-600 border-0 shadow-2xl">
          <CardContent className="p-12 text-center">
            <Leaf className="w-16 h-16 text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              지금 바로 시작하세요
            </h2>
            <p className="text-lg text-green-50 mb-8">
              강릉시의 깨끗한 환경을 위해 함께해요
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/classify">
                <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 shadow-lg px-8 py-6 text-lg">
                  <Camera className="mr-2 h-5 w-5" />
                  쓰레기 분류하기
                </Button>
              </Link>
              <Link href="/auth/signup">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-6 text-lg">
                  <Users className="mr-2 h-5 w-5" />
                  회원가입
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer Info */}
      <section className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p className="text-sm">
          © 2025 클린릉. 강릉시 스마트 분리수거 플랫폼
        </p>
      </section>
    </div>
  );
}
