import OpenAI from 'openai';
import { Message } from '../types/chat';

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function getChatCompletion(messages: Message[]) {
  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4-turbo', // Change this to your preferred model if needed
      messages,
    });
    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('Error getting chat completion:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to get response from OpenAI'
    );
  }
}
