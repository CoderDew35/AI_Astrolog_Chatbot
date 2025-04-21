import { Message } from '../types/chat';
import axios from 'axios';

const API_BASE_URL = 'https://sebnemkosker.com/customgpt/api/chat';


/**
 * Gets a chat completion from the backend server
 */
export async function getChatCompletion(
  messages: Message[], 
): Promise<string> {
  try {
    
    
    // Send request to our backend
    const response = await axios.post(`${API_BASE_URL}/completions`, {
      messages
    });
    
    // Return the assistant's response
    return response.data.content || '';
  } catch (error) {
    console.error('Error getting chat completion:', error);
    
    // Extract error message from API response if available
    if (axios.isAxiosError(error) && error.response) {
      const errorMessage = error.response.data?.error?.message || error.message;
      throw new Error(errorMessage);
    }
    
    throw new Error(
      error instanceof Error ? error.message : 'Failed to get response from server'
    );
  }
}


