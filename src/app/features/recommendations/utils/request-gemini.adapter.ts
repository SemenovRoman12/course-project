import {
  GeminiRequestBody,
  PromptToGemini, RecommendationGeminiResponse,
  RecommendationRequestPayload, RecommendationVM,
} from '@features/recommendations/data-access/models/recommendation.model';
import {UserEntity} from '@models/user.model';
import {UserActivitiesEntity} from '@features/profile/data-access/+state/profile.reducer';
import {formatDate} from '@features/recommendations/utils/date-transform';


export const geminiAdapter = {
  requestGeminiAdapter: function (
    {goal}: RecommendationRequestPayload,
    userData: UserEntity,
    userActivities: UserActivitiesEntity[]
  ): PromptToGemini {
    const { name, email, height, weight, age, gender } = userData;

    const header = `Пользователь:\nИмя: ${name}\nEmail: ${email}\nРост: ${height ?? 'не указан'} см\nВес: ${weight ?? 'не указан'} кг\nВозраст: ${age ?? 'не указан'}\nПол: ${gender || 'не указан'}\nЦель пользователя: ${goal}\n`;

    const activitiesText = userActivities
      .map((activity) => {
        return `${activity.date} — ${activity.steps} шагов, ${activity.distance} км, ${activity.calories} ккал, ср. пульс ${activity.heartRateAvg}, макс. пульс ${activity.heartRateMax}, стресс: ${activity.stressLevel}, сон: ${activity.sleepQuality}%, активность: ${activity.activeMinutes} мин`;
      })
      .join('\n');

    const message = `Можешь на основании пользовательских данных, данных о его активностях и цели дать краткую рекомендацию (в двух предложениях) что ему нужно делать чтобы достичь своей цели. В ответе ожидаю ничего кроме текста рекомендаци в 1 - 2 предложениях.\n\n${header}\nАктивности пользователя за последние дни:\n${activitiesText}`;

    return { message };
  },

  bodyGeminiAdapter: function (
    message: PromptToGemini
  ): GeminiRequestBody {

    return {
      contents: [
        {
          parts: [
            { text: message.message }
          ]
        }
      ]
    };
  },

  responseGeminiToRequestAdapter: function (
    response: RecommendationGeminiResponse
  ): RecommendationVM {
    const data = response.candidates[0].content.parts[0].text;
    const date = formatDate(new Date())
    return {
      data,
      date
    };
  }
}
