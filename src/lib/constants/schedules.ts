// 강릉시 쓰레기 배출 일정
export const GANGNEUNG_SCHEDULES = {
  // 동별 배출 일정 (현재는 전체 동이 동일한 규정 적용)
  default: {
    recyclable: {
      category: '재활용',
      days: ['월요일', '목요일'],
      time: '오전 8시까지',
    },
    general: {
      category: '종량제봉투',
      days: ['화요일', '금요일'],
      time: '오전 8시까지',
    },
    food: {
      category: '음식물',
      days: ['매일'],
      time: '오후 6시까지',
    },
    large: {
      category: '대형폐기물',
      days: ['별도 신고'],
      time: '신고 후 배출',
    },
  },
};

// 요일 영문 -> 한글 매핑
export const DAY_MAP: Record<number, string> = {
  0: '일요일',
  1: '월요일',
  2: '화요일',
  3: '수요일',
  4: '목요일',
  5: '금요일',
  6: '토요일',
};

// 다음 배출일 계산 함수
export function getNextDisposalDate(disposalDays: string[]): string {
  const today = new Date();
  const currentDay = today.getDay();

  // "매일"인 경우
  if (disposalDays.includes('매일')) {
    return '오늘';
  }

  // 요일을 숫자로 변환
  const dayNumbers = disposalDays.map(day => {
    return Object.entries(DAY_MAP).find(([_, name]) => name === day)?.[0];
  }).filter(Boolean).map(Number);

  // 다음 배출일 찾기
  let nextDay = dayNumbers.find(day => day > currentDay);
  if (!nextDay) {
    nextDay = dayNumbers[0]; // 다음 주 첫 배출일
  }

  const daysUntilNext = nextDay > currentDay
    ? nextDay - currentDay
    : 7 - currentDay + nextDay;

  const nextDate = new Date(today);
  nextDate.setDate(today.getDate() + daysUntilNext);

  const year = nextDate.getFullYear();
  const month = String(nextDate.getMonth() + 1).padStart(2, '0');
  const date = String(nextDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${date} (${DAY_MAP[nextDate.getDay()]})`;
}
