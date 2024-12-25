import { getClient } from './client';
import { createExplanationPrompt } from './prompts';

export const generateExplanation = async (
  question: string,
  choices: string[],
  correctAnswer: number,
  selectedAnswer: number,
  onToken: (token: string) => void
): Promise<void> => {
  try {
    const client = getClient();
    const isCorrect = selectedAnswer === correctAnswer - 1;
    const prompt = createExplanationPrompt(isCorrect, question, choices, correctAnswer);

    const stream = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "あなたは英語教師です。生徒が理解しやすいように、丁寧に解説してください。"
        },
        { 
          role: "user", 
          content: prompt 
        }
      ],
      stream: true,
      temperature: 0.7,
      max_tokens: 1000,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        onToken(content);
      }
    }
  } catch (error: any) {
    console.error('OpenAI explanation error:', error);
    
    if (error.code === 'invalid_api_key') {
      throw new Error('APIキーが無効です。正しいAPIキーを入力してください。');
    }
    
    if (error.code === 'insufficient_quota') {
      throw new Error('APIの利用制限に達しました。別のAPIキーを使用してください。');
    }
    
    if (error.message?.includes('API key')) {
      throw new Error('APIキーが無効または期限切れです。');
    }
    
    throw new Error('解説の生成中にエラーが発生しました。もう一度お試しください。');
  }
};