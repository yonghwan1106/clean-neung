import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Target, Users, Lightbulb, Award, Sparkles, Globe, Recycle, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Hero Section with Trophy */}
        <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg overflow-hidden">
          <div className="p-8 md:p-12 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Award className="h-12 w-12 text-yellow-300" />
              <div>
                <p className="text-yellow-300 font-bold text-lg">🏆 2025년 강릉시 시민 아이디어 공모전 출품작</p>
                <h1 className="text-4xl md:text-5xl font-bold mt-2">클린릉 프로젝트</h1>
              </div>
            </div>
            <p className="text-xl text-blue-100 max-w-2xl">
              AI 기술로 더 쉽고 정확한 분리수거를 실현하는 강릉시 스마트 환경 플랫폼
            </p>
          </div>
        </div>

        {/* Project Overview */}
        <Card className="mb-8 border-t-4 border-green-600">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Leaf className="h-7 w-7 text-green-600" />
              프로젝트 소개
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 leading-relaxed">
            <p className="text-lg">
              <span className="font-bold text-gray-900">클린릉(Clean-Neung)</span>은 강릉시민과 관광객이 쓰레기를 올바르게 분류하고 배출할 수 있도록 돕는 AI 기반 스마트 분리수거 플랫폼입니다.
            </p>
            <p>
              복잡한 분리수거 규칙으로 인해 많은 시민들이 어려움을 겪고 있습니다. 클린릉은 사진 한 장으로 쓰레기를 자동 분류하고,
              배출 방법과 일정을 안내하여 누구나 쉽게 올바른 분리수거를 실천할 수 있도록 지원합니다.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600">
              <p className="font-semibold text-blue-900">
                Claude AI와 네이버 클로바 두 가지 AI를 활용하여 정확도를 높이고,
                포인트 시스템으로 시민 참여를 유도하는 혁신적인 환경 솔루션입니다.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Key Features */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Sparkles className="h-8 w-8 text-yellow-600" />
            핵심 기능
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-t-4 border-blue-600 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-900">
                  <Recycle className="h-6 w-6 text-blue-600" />
                  AI 쓰레기 분류
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  사진 한 장으로 쓰레기 종류를 자동 인식하고 정확한 분류 방법과 배출 일정을 안내합니다.
                  Claude AI와 네이버 클로바를 선택하여 사용할 수 있습니다.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-green-600 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-900">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                  포인트 리워드 시스템
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  올바른 분류 활동으로 포인트를 적립하고, 불법 투기 신고 등 환경 보호 활동에 참여하면
                  추가 포인트를 받을 수 있습니다.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-purple-600 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-900">
                  <Globe className="h-6 w-6 text-purple-600" />
                  다국어 지원 (4개국)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  한국어, 영어, 중국어, 일본어를 지원하여 강릉을 방문하는 외국인 관광객도
                  쉽게 분리수거를 할 수 있도록 돕습니다.
                </p>
              </CardContent>
            </Card>

            <Card className="border-t-4 border-red-600 hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-900">
                  <Users className="h-6 w-6 text-red-600" />
                  시민 참여 플랫폼
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  불법 투기 신고, 쓰레기통 위치 제보 등 시민이 직접 참여하여
                  깨끗한 강릉을 만들어가는 공동체 플랫폼입니다.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Project Goals */}
        <Card className="mb-8 border-t-4 border-yellow-600">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Target className="h-7 w-7 text-yellow-600" />
              프로젝트 목표
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
                <span><strong className="text-gray-900">분리수거 정확도 향상:</strong> AI 기술로 시민들의 올바른 분리수거를 유도하여 재활용률을 높입니다.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
                <span><strong className="text-gray-900">환경 교육 강화:</strong> 직관적인 UI/UX로 누구나 쉽게 배우고 실천할 수 있는 환경 교육을 제공합니다.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
                <span><strong className="text-gray-900">관광도시 이미지 제고:</strong> 깨끗한 강릉 이미지를 구축하고 외국인 관광객에게도 친환경 도시를 홍보합니다.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</span>
                <span><strong className="text-gray-900">시민 참여 활성화:</strong> 포인트 시스템과 커뮤니티 기능으로 자발적인 환경 보호 참여를 촉진합니다.</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="mb-8 border-t-4 border-blue-600">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Lightbulb className="h-7 w-7 text-blue-600" />
              기술 스택
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Frontend</h4>
                <p className="text-sm text-gray-700">Next.js 16, React 19, TypeScript, Tailwind CSS 4</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">AI Engine</h4>
                <p className="text-sm text-gray-700">Claude AI (Anthropic), 네이버 클로바 비전</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Backend</h4>
                <p className="text-sm text-gray-700">Next.js API Routes, Google Sheets API</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-bold text-gray-900 mb-2">Authentication</h4>
                <p className="text-sm text-gray-700">NextAuth.js v5</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contest Info */}
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-t-4 border-yellow-600">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Award className="h-7 w-7 text-yellow-600" />
              공모전 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-gray-700">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-gray-900 mb-1">공모전명</p>
                <p>2025년 강릉시 시민 아이디어 공모전</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">주제</p>
                <p>스마트 환경 / 지속가능한 도시</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">출품 부문</p>
                <p>시민 생활 개선 아이디어</p>
              </div>
              <div>
                <p className="font-semibold text-gray-900 mb-1">개발 기간</p>
                <p>2025년 10월</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg border border-yellow-300">
              <p className="text-center text-yellow-900 font-bold">
                💚 깨끗한 강릉, 지속가능한 미래를 위한 시민 아이디어 💚
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
