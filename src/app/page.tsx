import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Camera, Calendar, Gift, Sparkles, Leaf, Users, ArrowRight, Recycle, Clock, Award, Zap, Shield, Heart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-emerald-500 via-green-600 to-teal-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <Badge className="mb-8 bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm text-base px-6 py-2 inline-flex items-center">
              <Sparkles className="w-4 h-4 mr-2" />
              강릉시 공식 AI 분리수거 플랫폼
            </Badge>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight tracking-tight drop-shadow-2xl">
              클린릉
            </h1>

            <p className="text-2xl md:text-4xl mb-4 font-light leading-relaxed">
              사진 한 장으로 <span className="font-bold underline decoration-wavy decoration-4 decoration-yellow-300">쓰레기 분류</span>
            </p>
            <p className="text-xl md:text-2xl mb-16 text-green-50 font-light">
              AI가 자동으로 분류하고, 포인트도 적립해드립니다
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button size="lg" className="w-full sm:w-auto bg-white text-green-600 hover:bg-green-50 hover:scale-105 transition-transform shadow-2xl px-12 py-8 text-xl font-bold rounded-2xl" asChild>
                <Link href="/classify">
                  <Camera className="mr-3 h-7 w-7" />
                  지금 시작하기
                  <ArrowRight className="ml-3 h-7 w-7" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-3 border-white text-white hover:bg-white hover:text-green-600 hover:scale-105 transition-transform px-12 py-8 text-xl font-bold rounded-2xl backdrop-blur-sm bg-white/10" asChild>
                <Link href="/schedule">
                  <Calendar className="mr-3 h-7 w-7" />
                  배출 일정
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 pt-16 border-t border-white/20">
              <div className="text-center">
                <div className="text-5xl font-black mb-2">AI</div>
                <div className="text-lg text-green-100">자동 분류</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2">24/7</div>
                <div className="text-lg text-green-100">언제나</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-black mb-2">무료</div>
                <div className="text-lg text-green-100">100%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
              왜 클린릉인가요?
            </h2>
            <p className="text-xl text-gray-600">
              강릉시민을 위한 스마트한 분리수거 솔루션
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 bg-white">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">AI 자동 인식</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Claude AI가 쓰레기 사진을 즉시 분석하여 정확한 분류 방법을 안내합니다
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 bg-white">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">배출 일정 알림</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg leading-relaxed">
                  강릉시 지역별 배출 일정을 자동으로 확인하고 알림을 받아보세요
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 bg-white">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">포인트 적립</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-lg leading-relaxed">
                  올바른 분리수거로 포인트를 모으고 다양한 혜택을 받으세요
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
                간단한 3단계
              </h2>
              <p className="text-xl text-gray-600">
                누구나 쉽게 사용할 수 있습니다
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white text-4xl font-black shadow-2xl group-hover:scale-110 transition-transform">
                  1
                </div>
                <h3 className="text-2xl font-bold mb-3">사진 촬영</h3>
                <p className="text-gray-600 text-lg">
                  버리고 싶은 쓰레기를 사진으로 찍어주세요
                </p>
              </div>

              <div className="text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white text-4xl font-black shadow-2xl group-hover:scale-110 transition-transform">
                  2
                </div>
                <h3 className="text-2xl font-bold mb-3">AI 분석</h3>
                <p className="text-gray-600 text-lg">
                  AI가 자동으로 분석하여 분류 방법을 알려드립니다
                </p>
              </div>

              <div className="text-center group">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-3xl flex items-center justify-center mx-auto mb-6 text-white text-4xl font-black shadow-2xl group-hover:scale-110 transition-transform">
                  3
                </div>
                <h3 className="text-2xl font-bold mb-3">포인트 적립</h3>
                <p className="text-gray-600 text-lg">
                  올바르게 배출하고 포인트를 받으세요
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="w-20 h-20 mx-auto mb-8 drop-shadow-2xl" />
            <h2 className="text-4xl md:text-6xl font-black mb-6">
              지금 바로 시작하세요
            </h2>
            <p className="text-xl md:text-2xl mb-12 text-green-50 font-light">
              강릉시의 깨끗한 환경을 위해 함께해요
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 hover:scale-105 transition-transform shadow-2xl px-12 py-8 text-xl font-bold rounded-2xl" asChild>
                <Link href="/classify">
                  <Camera className="mr-3 h-7 w-7" />
                  쓰레기 분류하기
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-3 border-white text-white hover:bg-white hover:text-green-600 hover:scale-105 transition-transform px-12 py-8 text-xl font-bold rounded-2xl backdrop-blur-sm bg-white/10" asChild>
                <Link href="/auth/signup">
                  <Users className="mr-3 h-7 w-7" />
                  회원가입
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Recycle className="h-6 w-6 text-green-500" />
            <span className="text-2xl font-bold text-white">클린릉</span>
          </div>
          <p className="text-sm">
            © 2025 클린릉. 강릉시 스마트 분리수거 플랫폼
          </p>
          <p className="text-xs mt-2 text-gray-500">
            AI 기반 쓰레기 분류 서비스
          </p>
        </div>
      </footer>
    </div>
  );
}
