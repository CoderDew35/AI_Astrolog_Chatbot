import OpenAI from 'openai';
import { Message } from '../types/chat';

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

interface ChatCompletionOptions {
  model?: string;
  temperature?: number;
}

/**
 * Gets a chat completion from OpenAI
 */
export async function getChatCompletion(
  messages: Message[], 
  options: ChatCompletionOptions = {}
): Promise<string> {
  try {
    const { 
      model = 'gpt-4-turbo', 
      temperature = 0.7 
    } = options;
    
    const completion = await client.chat.completions.create({
      model,
      messages,
      temperature,
    });
    
    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('Error getting chat completion:', error);
    throw new Error(
      error instanceof Error ? error.message : 'Failed to get response from OpenAI'
    );
  }
}
