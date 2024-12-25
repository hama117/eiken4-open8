export const EXAMPLE_EXPLANATION = `正解です。
文の内容は「外の天気がとても( )だから、傘を忘れないでね」という意味です。
選択肢は以下の通りです：

rainy（雨の）
sunny（晴れの）
snowy（雪の）
cloudy（曇りの）

傘が必要なのは雨が降っている場合なので、正解は 1. rainy（雨の） です。

完全な文は：
"It's very rainy outside, so don't forget to bring an umbrella."
（外はとても雨が降っているので、傘を忘れないでください。）`;

export const createExplanationPrompt = (
  isCorrect: boolean,
  question: string,
  choices: string[],
  correctAnswer: number
): string => `以下の形式で解説を作成してください。

# 形式例
${EXAMPLE_EXPLANATION}

# 実際の問題の解説
${isCorrect ? '正解です。' : '不正解です。'}
文の内容は「${question}」という意味です。
選択肢は以下の通りです：

${choices.map((choice) => choice).join('\n')}

正解は ${correctAnswer}. ${choices[correctAnswer - 1]} です。その理由を説明してください。

完全な文は：
（英文と日本語訳を書いてください）`;