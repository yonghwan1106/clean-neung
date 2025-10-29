import Anthropic from '@anthropic-ai/sdk';
import { GANGNEUNG_WASTE_GUIDE } from '@/lib/constants/wasteCategories';
import { enhanceWithNaverDetection } from './naver-clova';
import type { ClassificationResult } from '@/lib/types/waste';

const anthropic = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY || '',
});

export async function classifyWasteImage(imageBase64: string, language: string = 'ko'): Promise<ClassificationResult> {
  try {
    // First, try to enhance with Naver Clova detection
    const naverEnhancement = await enhanceWithNaverDetection(imageBase64);

    let additionalContext = '';
    if (naverEnhancement.naverDetections && naverEnhancement.suggestedCategories.length > 0) {
      additionalContext = `\n\nADDITIONAL CONTEXT FROM KOREAN AI MODEL:
Detected object types: ${naverEnhancement.suggestedCategories.join(', ')}
Please consider this information along with your own analysis.`;
    }

    const prompt = `${GANGNEUNG_WASTE_GUIDE}${additionalContext}

You are an expert in waste sorting and recycling. Analyze the provided image carefully and classify the waste item according to Gangneung City's waste disposal guidelines.

ANALYSIS STEPS:
1. Identify the specific item(s) in the image with high precision
2. Check the material composition (plastic type, paper quality, metal type, etc.)
3. Look for recycling symbols or material codes (PET, PP, PE, PS, PVC, etc.)
4. Consider the item's condition (clean, dirty, mixed materials)
5. Apply Gangneung City's specific disposal rules

IMPORTANT CLASSIFICATION RULES:
- PET bottles: Must remove label, separate cap, empty contents, and crush
- Mixed materials: If item has multiple materials that can't be separated → General waste
- Contaminated recyclables: Even if recyclable material, if dirty/greasy → General waste
- Food containers: Must be washed clean; if not cleanable → General waste
- Styrofoam: Clean white styrofoam → Recyclable; colored or dirty → General waste

Response format (JSON only):
{
  "detected_item": "Specific item name (e.g., PET bottle, plastic container, paper box)",
  "material_analysis": "Detailed material composition and condition",
  "possible_classifications": [
    {
      "category": "Classification category (e.g., 재활용 (플라스틱))",
      "disposal_method": "Specific disposal instructions",
      "disposal_days": ["월요일", "목요일"],
      "confidence": 95,
      "reasoning": "Why this classification applies",
      "special_notes": "Any special considerations"
    }
  ],
  "best_classification": {
    "category": "Most likely classification category",
    "disposal_method": "Specific disposal instructions with step-by-step guide",
    "disposal_days": ["월요일", "목요일"],
    "confidence": 95,
    "reasoning": "Detailed explanation of why this is the best classification",
    "special_notes": "Important notes for proper disposal"
  }
}

Gangneung City disposal schedule:
- Recyclables: Monday, Thursday
- General waste (Volume-based bags): Tuesday, Friday
- Food waste: Every day (by 6 PM)
- Large waste: Requires separate registration

CRITICAL: Return ONLY valid JSON. No additional text, explanations, or markdown formatting.`;

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
