'use client';

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Phone, Leaf, Globe, LogIn, UserPlus, User, LogOut, Camera, Calendar, Gift, Shield, Info } from "lucide-react";
import { useState } from "react";

interface LanguageSelectorProps {
  onLanguageChange?: (lang: string) => void;
}

export function LanguageSelector({ onLanguageChange }: LanguageSelectorProps) {
  const languageRoutes = {
    KOR: '/',
    ENG: '/en',
    CHN: '/zh',
    JPN: '/ja',
  };

  return (
    <div className="flex gap-6">
      <Link href={languageRoutes.KOR} className="flex items-center gap-1 text-white font-bold hover:text-blue-100">
        <Globe className="h-3 w-3" />
        KOR
      </Link>
      <span className="text-blue-200">|</span>
      <Link href={languageRoutes.ENG} className="text-blue-200 hover:text-white">
        ENG
      </Link>
      <span className="text-blue-200">|</span>
      <Link href={languageRoutes.CHN} className="text-blue-200 hover:text-white">
        CHN
      </Link>
      <span className="text-blue-200">|</span>
      <Link href={languageRoutes.JPN} className="text-blue-200 hover:text-white">
        JPN
      </Link>
    </div>
  );
}

export function PageHeader() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <>
      {/* Top Navigation Bar - Government Style */}
      <div className="bg-blue-900 text-white py-2 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <LanguageSelector />
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
            <Link href="/" className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">클린릉</h1>
                  <p className="text-sm text-gray-600">강릉시 스마트 분리수거 플랫폼</p>
                </div>
              </div>
            </Link>
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
    </>
  );
}
