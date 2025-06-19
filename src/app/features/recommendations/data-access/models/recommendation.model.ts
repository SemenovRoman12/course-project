import {UserEntity} from '@models/user.model';
import {
  RecommendationsCardComponent
} from '@features/recommendations/recommendations-card/recommendations-card.component';

export interface RecommendationGeminiResponse {
  candidates: [
    {
      content: {
        parts: [
          text: string
        ];
      };
    }
  ];
  usageMetadata: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
    promptTokensDetails: [
      {
        modality: string;
        tokenCount: number;
      }
    ];
    thoughtsTokenCount: number;
  };
  modelVersion: string;
  responseId: string;
}

export interface RecommendationResponse extends Required<Recommendation[]> {}

export interface Recommendation {
  id: number;
  user: UserEntity;
  data: string;
  date: string;
}

export interface RecommendationRequestPayload {}
