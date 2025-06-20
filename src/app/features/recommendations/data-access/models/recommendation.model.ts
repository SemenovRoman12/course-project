import {UserEntity} from '@models/user.model';
import {
  RecommendationsCardComponent
} from '@features/recommendations/recommendations-card/recommendations-card.component';
import {UserActivitiesEntity} from '@features/profile/data-access/+state/profile.reducer';

export interface RecommendationGeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
      role: string;
    };
    finishReason: string;
    index: number;
  }>;
  usageMetadata: {
    promptTokenCount: number;
    candidatesTokenCount: number;
    totalTokenCount: number;
    promptTokensDetails: Array<{
      modality: string;
      tokenCount: number;
    }>;
    thoughtsTokenCount: number;
  };
  modelVersion: string;
  responseId: string;
}

export interface GeminiRequestBody {
  contents: {
    parts: {
      text: string;
    }[];
  }[];
}

export interface RecommendationResponse extends Required<Recommendation[]> {}

export interface Recommendation {
  id: number;
  user: UserEntity;
  data: string;
  date: string;
}

export interface RecommendationRequestPayload {
  goal: string;
}

export interface PromptToGemini {
  message: string
}

export interface RecommendationVM {
  data: string;
  date: string;
}
