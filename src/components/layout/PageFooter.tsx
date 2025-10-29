import Link from "next/link";
import { Phone, MapPin, Clock, Leaf } from "lucide-react";

export function PageFooter() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 mt-auto">
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

        <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-500">
          <p>© 2025 강릉시청. All rights reserved.</p>
          <p className="mt-2">본 플랫폼은 강릉시 환경 개선을 위해 운영됩니다.</p>
        </div>
      </div>
    </footer>
  );
}
