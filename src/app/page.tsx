'use client';

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Camera, Calendar, Gift, MapPin, Recycle,
  Users, ArrowRight, Bell, FileText, Phone,
  Leaf, Globe, Award, Shield, Zap, Heart,
  LogIn, UserPlus, User, LogOut, ChevronRight,
  Building2, MessageSquare, TrendingUp, Clock, Info
} from "lucide-react";

export default function Home() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar - Government Style */}
      <div className="bg-blue-900 text-white py-2 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <Link href="/" className="flex items-center gap-1 text-white font-bold hover:text-blue-100">
                <Globe className="h-3 w-3" />
                KOR
              </Link>
              <span className="text-blue-200">|</span>
              <Link href="/en" className="text-blue-200 hover:text-white">
                ENG
              </Link>
              <span className="text-blue-200">|</span>
              <Link href="/zh" className="text-blue-200 hover:text-white">
                CHN
              </Link>
              <span className="text-blue-200">|</span>
              <Link href="/ja" className="text-blue-200 hover:text-white">
                JPN
              </Link>
            </div>
            <div className="flex gap-4 items-center">
              {session ? (
                <>
                  <span className="text-blue-200">{session.user?.name}님</span>
                  <Link href="/admin" className="hover:text-blue-200 flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    관리자
                  </Link>
                  <Link href="/mypage" className="hover:text-blue-200 flex items-center gap-1">
                    <User className="h-3 w-3" />
                    마이페이지
                  </Link>
                  <button onClick={handleLogout} className="hover:text-blue-200 flex items-center gap-1">
                    <LogOut className="h-3 w-3" />
                    로그아웃
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="hover:text-blue-200 flex items-center gap-1">
                    <LogIn className="h-3 w-3" />
                    로그인
                  </Link>
                  <Link href="/auth/signup" className="hover:text-blue-200 flex items-center gap-1">
                    <UserPlus className="h-3 w-3" />
                    회원가입
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Government Style */}
      <header className="bg-white border-b-2 border-blue-600 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">클린릉</h1>
                  <p className="text-sm text-gray-600">강릉시 스마트 분리수거 플랫폼</p>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3">
              <Phone className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">민원상담</p>
                <p className="text-lg font-bold text-blue-600">033-640-5000</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <nav className="bg-blue-600 text-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex">
                <Link href="/about" className="px-6 py-4 hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                  <Info className="h-4 w-4" />
                  프로젝트 소개
                </Link>
                <Link href="/classify" className="px-6 py-4 hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                  <Camera className="h-4 w-4" />
                  AI 분류하기
                </Link>
                <Link href="/schedule" className="px-6 py-4 hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                  <Calendar className="h-4 w-4" />
                  배출일정
                </Link>
                <Link href="/points" className="px-6 py-4 hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                  <Gift className="h-4 w-4" />
                  포인트
                </Link>
                <Link href="/mypage" className="px-6 py-4 hover:bg-blue-700 transition-colors flex items-center gap-2 font-medium">
                  <User className="h-4 w-4" />
                  마이페이지
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section - Banner Style */}
      <section className="relative bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex flex-col gap-3 mb-6">
                <Badge className="bg-yellow-400 text-yellow-900 border-yellow-500 hover:bg-yellow-300 font-bold text-sm inline-flex items-center gap-1 w-fit">
                  <Award className="h-4 w-4" />
                  🏆 2025년 강릉시 시민 아이디어 공모전 출품작
                </Badge>
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm w-fit">
                  강릉시 공식 AI 플랫폼
                </Badge>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                사진 한 장으로<br />
                쓰레기 분류
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Claude AI와 네이버 클로바가 쓰레기를 자동으로 분류하고<br />
                배출 방법을 안내해드립니다
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-6 text-lg font-bold" asChild>
                  <Link href="/classify">
                    <Camera className="mr-2 h-5 w-5" />
                    지금 시작하기
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-blue-600 px-8 py-6 text-lg font-bold backdrop-blur-sm" asChild>
                  <Link href="/schedule" className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    배출일정 보기
                  </Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl">
                  <div className="relative h-64 w-full">
                    <Image
                      src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&h=600&fit=crop"
                      alt="재활용 분리수거"
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  </div>
                  <div className="p-6 space-y-4 bg-white">
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                          <Recycle className="h-6 w-6 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">금일 분류</p>
                          <p className="text-2xl font-bold text-gray-900">567건</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">활성 사용자</p>
                          <p className="text-2xl font-bold text-gray-900">1,234명</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="bg-yellow-100 p-3 rounded-lg">
                          <Award className="h-6 w-6 text-yellow-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">적립 포인트</p>
                          <p className="text-2xl font-bold text-gray-900">12,340P</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards - Government Style */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              맞춤형 서비스
            </h2>
            <p className="text-lg text-gray-600">
              시민과 관광객을 위한 스마트 분리수거 서비스
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* 시민 서비스 */}
            <Card className="hover:shadow-xl transition-all border-t-4 border-blue-600 overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop"
                  alt="시민 서비스"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-white/90 text-blue-600 border-0">시민</Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">시민 서비스</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/classify">AI 쓰레기 분류</Link>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/schedule">배출 일정 확인</Link>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/points">포인트 적립</Link>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-blue-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <span>불법 투기 신고</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 관광객 서비스 */}
            <Card className="hover:shadow-xl transition-all border-t-4 border-green-600 overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1528543606781-2f6e6857f318?w=600&h=400&fit=crop"
                  alt="관광객 서비스"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-white/90 text-green-600 border-0">관광객</Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <MapPin className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-xl">관광객 서비스</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700 hover:text-green-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <span>다국어 지원 (4개국)</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-green-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <span>쓰레기통 위치 안내</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-green-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <span>분리수거 가이드</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-green-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <span>관광지 정보</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* 관리자 서비스 */}
            <Card className="hover:shadow-xl transition-all border-t-4 border-purple-600 overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"
                  alt="관리자 서비스"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <Badge className="bg-white/90 text-purple-600 border-0">관리자</Badge>
                </div>
              </div>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <Building2 className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-xl">관리자 서비스</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-gray-700 hover:text-purple-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/admin">대시보드</Link>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-purple-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/admin/reports">불법투기 관리</Link>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-purple-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/admin/locations">쓰레기통 관리</Link>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700 hover:text-purple-600 cursor-pointer group">
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    <Link href="/admin/users">사용자 관리</Link>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              빠른 서비스
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link href="/classify" className="group">
              <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                <CardContent className="pt-8 pb-6">
                  <div className="bg-gradient-to-br from-green-400 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Camera className="h-8 w-8 text-white" />
                  </div>
                  <p className="font-bold text-gray-900">AI 분류</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/schedule" className="group">
              <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                <CardContent className="pt-8 pb-6">
                  <div className="bg-gradient-to-br from-blue-400 to-cyan-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <p className="font-bold text-gray-900">배출일정</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/points" className="group">
              <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer">
                <CardContent className="pt-8 pb-6">
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Gift className="h-8 w-8 text-white" />
                  </div>
                  <p className="font-bold text-gray-900">포인트</p>
                </CardContent>
              </Card>
            </Link>

            <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer group">
              <CardContent className="pt-8 pb-6">
                <div className="bg-gradient-to-br from-red-400 to-pink-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Bell className="h-8 w-8 text-white" />
                </div>
                <p className="font-bold text-gray-900">신고하기</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Notice Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* 공지사항 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <FileText className="h-6 w-6 text-blue-600" />
                      공지사항
                    </CardTitle>
                    <Button variant="ghost" size="sm">더보기 +</Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2 pb-3 border-b hover:bg-gray-50 px-2 py-2 rounded cursor-pointer">
                      <ChevronRight className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-gray-900 hover:text-blue-600">클린릉 플랫폼 정식 오픈 안내</p>
                        <p className="text-xs text-gray-500 mt-1">2025-10-29</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 pb-3 border-b hover:bg-gray-50 px-2 py-2 rounded cursor-pointer">
                      <ChevronRight className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-gray-900 hover:text-blue-600">AI 분류 정확도 개선 업데이트</p>
                        <p className="text-xs text-gray-500 mt-1">2025-10-28</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2 pb-3 border-b hover:bg-gray-50 px-2 py-2 rounded cursor-pointer">
                      <ChevronRight className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="text-gray-900 hover:text-blue-600">다국어 서비스 지원 시작</p>
                        <p className="text-xs text-gray-500 mt-1">2025-10-27</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* 분리수거 통계 */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <TrendingUp className="h-6 w-6 text-green-600" />
                      분리수거 통계
                    </CardTitle>
                    <Badge variant="outline">실시간</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">재활용 (플라스틱)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full" style={{width: '32%'}}></div>
                        </div>
                        <span className="text-sm font-medium">32%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">재활용 (종이)</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-green-600 rounded-full" style={{width: '25%'}}></div>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">음식물</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-yellow-600 rounded-full" style={{width: '20%'}}></div>
                        </div>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">종량제봉투</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gray-600 rounded-full" style={{width: '15%'}}></div>
                        </div>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Government Style */}
      <footer className="bg-gray-800 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-bold text-white">클린릉</h3>
              </div>
              <p className="text-sm text-gray-400">
                강릉시 공식 AI 기반<br />
                스마트 분리수거 플랫폼
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">주요 서비스</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/classify" className="hover:text-white">AI 쓰레기 분류</Link></li>
                <li><Link href="/schedule" className="hover:text-white">배출 일정</Link></li>
                <li><Link href="/points" className="hover:text-white">포인트 적립</Link></li>
                <li><Link href="/mypage" className="hover:text-white">마이페이지</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">고객 지원</h4>
              <ul className="space-y-2 text-sm">
                <li className="hover:text-white cursor-pointer">공지사항</li>
                <li className="hover:text-white cursor-pointer">이용 가이드</li>
                <li className="hover:text-white cursor-pointer">자주 묻는 질문</li>
                <li className="hover:text-white cursor-pointer">문의하기</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-3">연락처</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  033-640-5000
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  평일 09:00 - 18:00
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  강릉시청 환경과
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-sm">
            <div className="mb-4 p-3 bg-blue-900 rounded-lg inline-block">
              <p className="text-blue-200 font-semibold">🏆 2025년 강릉시 시민 아이디어 공모전 출품작</p>
            </div>
            <p className="text-gray-500">© 2025 강릉시청. All rights reserved.</p>
            <p className="mt-2 text-gray-500">본 플랫폼은 강릉시 환경 개선을 위해 운영됩니다.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
