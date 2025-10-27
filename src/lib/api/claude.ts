import Anthropic from '@anthropic-ai/sdk';
import { GANGNEUNG_WASTE_GUIDE } from '@/lib/constants/wasteCategories';
import type { ClassificationResult } from '@/lib/types/waste';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || '',
});

export async function classifyWasteImage(imageBase64: string): Promise<ClassificationResult> {
  try {
    const prompt = `${GANGNEUNG_WASTE_GUIDE}

당신은 쓰레기 분리수거 전문가입니다.
제공된 이미지를 분석하여 다음 정보를 JSON 형식으로 제공하세요.

이미지에서 감지된 물품을 정확히 식별하고, 강릉시 쓰레기 분류 기준에 따라 5가지 가능한 분류 방법과 각각의 확률을 제시하세요.

응답 형식:
{
  "detected_item": "감지된 물품명 (예: 페트병, 비닐봉지 등)",
  "possible_classifications": [
    {
      "category": "분류 카테고리 (예: 재활용-플라스틱)",
      "disposal_method": "구체적인 배출 방법",
      "disposal_days": ["월요일", "목요일"],
      "confidence": 95,
      "special_notes": "특이사항이 있다면 기재"
    }
  ],
  "best_classification": {
    "category": "가장 확률이 높은 분류 카테고리",
    "disposal_method": "구체적인 배출 방법",
    "disposal_days": ["월요일", "목요일"],
    "confidence": 95,
    "special_notes": "특이사항이 있다면 기재"
  }
}

강릉시 배출 규정:
- 재활용: 월요일, 목요일
- 종량제봉투: 화요일, 금요일
- 음식물: 매일
- 대형폐기물: 별도 신고

중요: 반드시 JSON 형식으로만 응답하세요. 다른 텍스트는 포함하지 마세요.`;

    const response = await anthropic.messages.create({
      model: process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: imageBase64,
              },
            },
            {
              type: 'text',
              text: prompt,
            },
          ],
        },
      ],
    });

    // AI 응답 파싱
    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Invalid AI response type');
    }

    const aiText = content.text;

    // JSON 추출 (코드 블록이나 다른 텍스트가 포함될 수 있음)
    const jsonMatch = aiText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to extract JSON from AI response');
    }

    const result = JSON.parse(jsonMatch[0]);

    // 결과 검증 및 반환
    if (!result.best_classification) {
      throw new Error('Invalid classification result structure');
    }

    return {
      detected_item: result.detected_item,
      category: result.best_classification.category,
      disposal_method: result.best_classification.disposal_method,
      disposal_days: result.best_classification.disposal_days,
      confidence: result.best_classification.confidence,
      special_notes: result.best_classification.special_notes,
    };
  } catch (error) {
    console.error('Claude AI classification error:', error);
    throw new Error('AI 분석에 실패했습니다. 다시 시도해주세요.');
  }
}

// 이미지를 Base64로 인코딩
export function imageToBase64(buffer: Buffer): string {
  return buffer.toString('base64');
}
