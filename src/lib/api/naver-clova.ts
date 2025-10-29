/**
 * Naver Cloud Platform Object Detection API Integration
 *
 * This module provides integration with Naver Clova Vision API
 * for detecting objects in waste images.
 */

interface NaverVisionDetectionResult {
  predictions: Array<{
    label: string;
    confidence: number;
    bbox: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
  }>;
}

interface NaverAPIConfig {
  clientId: string;
  clientSecret: string;
  endpoint: string;
}

class NaverClovaVisionAPI {
  private config: NaverAPIConfig;

  constructor() {
    this.config = {
      clientId: process.env.NAVER_CLIENT_ID || '',
      clientSecret: process.env.NAVER_CLIENT_SECRET || '',
      endpoint: 'https://naveropenapi.apigw.ntruss.com/vision-obj/v1/detect',
    };
  }

  /**
   * Detect objects in an image using Naver Clova Vision API
   */
  async detectObjects(imageBase64: string): Promise<NaverVisionDetectionResult | null> {
    try {
      // Check if credentials are configured
      if (!this.config.clientId || !this.config.clientSecret) {
        console.warn('Naver Cloud credentials not configured, skipping Naver API call');
        return null;
      }

      const imageBuffer = Buffer.from(imageBase64, 'base64');

      const response = await fetch(this.config.endpoint, {
        method: 'POST',
        headers: {
          'X-NCP-APIGW-API-KEY-ID': this.config.clientId,
          'X-NCP-APIGW-API-KEY': this.config.clientSecret,
          'Content-Type': 'application/octet-stream',
        },
        body: imageBuffer,
      });

      if (!response.ok) {
        console.error('Naver API error:', response.status, response.statusText);
        return null;
      }

      const result = await response.json();
      return result as NaverVisionDetectionResult;
    } catch (error) {
      console.error('Naver Clova Vision API error:', error);
      return null;
    }
  }

  /**
   * Map Naver detection results to waste categories
   */
  mapToWasteCategory(detections: NaverVisionDetectionResult): string[] {
    const wasteKeywords = {
      plastic: ['bottle', 'plastic', 'container', 'cup', 'bag', 'packaging'],
      paper: ['paper', 'cardboard', 'box', 'newspaper', 'book', 'magazine'],
      glass: ['glass', 'bottle', 'jar'],
      metal: ['can', 'metal', 'aluminum', 'steel'],
      food: ['food', 'fruit', 'vegetable', 'meat', 'organic'],
      electronics: ['phone', 'computer', 'tv', 'electronics', 'battery'],
    };

    const detectedCategories: string[] = [];

    detections.predictions.forEach((pred) => {
      const label = pred.label.toLowerCase();

      for (const [category, keywords] of Object.entries(wasteKeywords)) {
        if (keywords.some(keyword => label.includes(keyword))) {
          if (!detectedCategories.includes(category)) {
            detectedCategories.push(category);
          }
        }
      }
    });

    return detectedCategories;
  }
}

export const naverClovaAPI = new NaverClovaVisionAPI();

/**
 * Helper function to enhance Claude's classification with Naver Clova detection
 */
export async function enhanceWithNaverDetection(imageBase64: string): Promise<{
  naverDetections: NaverVisionDetectionResult | null;
  suggestedCategories: string[];
}> {
  const detections = await naverClovaAPI.detectObjects(imageBase64);

  if (!detections) {
    return {
      naverDetections: null,
      suggestedCategories: [],
    };
  }

  const suggestedCategories = naverClovaAPI.mapToWasteCategory(detections);

  return {
    naverDetections: detections,
    suggestedCategories,
  };
}
