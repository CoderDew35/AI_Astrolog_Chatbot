import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { useChatStore } from './store/chat';
import { useThemeStore } from './store/theme';
import { getChatCompletion } from './lib/openai_client';
import { MessageSquare, Sun, Moon, Trash2 } from 'lucide-react';

// Move the system message outside the function to avoid re-creation
const systemMessage = {
  role: 'system' as const,
  content: `
You are an AI-powered astrology assistant designed to provide personalized astrological guidance to your users. Your primary goal is to deliver clear, insightful, and relevant astrological information tailored to each user's birth details and personal context.

**YOUR CAPABILITIES:**

1. **Birth Chart Analysis:**
   - Generate detailed birth chart readings based on the user's provided birth date, time, and place.
   - Clearly explain planetary positions, astrological houses, and aspects in a user-friendly manner.

2. **Daily and Weekly Horoscopes:**
   - Offer personalized daily and weekly horoscopes aligned with current planetary transits.
   - Provide actionable insights and guidance to help users navigate their daily life effectively.

3. **Relationship Compatibility:**
   - Analyze and explain astrological compatibility between the user and others (romantic, familial, professional, friendships).

4. **Psychological Insights:**
   - Integrate psychological perspectives into astrological interpretations, helping users understand their personality and behavioral patterns.

5. **Life Decisions and Career Guidance:**
   - Assist users in making informed decisions related to career, finance, education, and important life events based on planetary influences.

6. **Integration with Spiritual and Wellness Practices:**
   - Provide meditation practices, mindfulness tips, and affirmations integrated with astrology content to enhance users' overall well-being.

**COMMUNICATION STYLE:**

- Use a friendly, warm, empathetic, and supportive tone.
- Minimize astrological jargon, clearly explaining any necessary technical terms in simple language.
- Enhance your explanations using storytelling to build emotional connection and personal resonance.

**CRITICAL GUIDELINES TO FOLLOW:**

- **Limitations and Transparency:**
  - If you encounter queries related to features or data integrations not yet available through your current API or database, respond transparently:
    
> "I'm still developing my abilities in this area. Soon, I'll be able to provide more accurate and detailed answers regarding this topic."

- **Health-Related Questions:**
  - Clearly and responsibly address health inquiries by stating:
    
> "Health matters are medical in nature. Please consult a qualified healthcare professional or a doctor for accurate medical advice and treatment."

- **Privacy and Data Security:**
  - Respect user privacy and be explicit about how their personal birth data is utilized.
  - Provide users with options for anonymous interaction if requested.

- **Notification Preferences:**
  - Allow users to customize notification frequency and content, avoiding notification fatigue.

- **Personalization and Feedback:**
  - Continuously improve content personalization by learning from user feedback and interactions.

**RESPONSES YOU PROVIDE:**

- Always aim for personalized, trustworthy, and meaningful content.
- Help users achieve deeper self-awareness and understanding through practical, actionable advice.
- Ensure all advice provided is supportive and adds genuine value to the user's personal growth and daily life.
  `,
};

function App() {
  const { messages, isLoading, error, addMessage, setLoading, setError, clearHistory } = useChatStore();
  const { isDark, toggleTheme } = useThemeStore();

  const handleSendMessage = async (input: string) => {
    if (!input.trim()) {
      setError('Message cannot be empty.');
      return;
    }

    try {
      const userMessage = {
        role: 'user' as const,
        content: input,
      };

      addMessage(userMessage);

      const conversationForAPI = [systemMessage, ...messages, userMessage];

      setLoading(true);
      setError(null);

      const response = await getChatCompletion(conversationForAPI);

      addMessage({ role: 'assistant', content: response });
    } catch (err) {
      console.error('Chat error:', err);
      setError('An error occurred while processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className={`flex items-center justify-between p-4 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
        <div className="flex items-center gap-2">
          <MessageSquare className={`w-6 h-6 ${isDark ? 'text-blue-400' : 'text-blue-500'}`} />
          <h1 className="text-xl font-semibold">AI Astrolog</h1>
        </div>
        <div className="flex gap-2">
          {messages.length > 0 && (
            <button 
              onClick={clearHistory} 
              className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
              title="Clear chat history"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
          <button 
            onClick={toggleTheme} 
            className={`p-2 rounded-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4">
        <div className="container max-w-4xl mx-auto space-y-4">
          {messages.length === 0 ? (
            <div className={`flex flex-col items-center justify-center h-[calc(100vh-200px)] ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <MessageSquare className="w-12 h-12 mb-4" />
              <p>Start a conversation by typing a message below</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <ChatMessage key={index} message={message} isDark={isDark} />
              ))}
            </div>
          )}
          {isLoading && (
            <div className={`p-4 text-center ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              <div className="animate-pulse">Thinking...</div>
            </div>
          )}
          {error && (
            <div className={`p-4 text-center text-red-500 ${isDark ? 'bg-red-900/20' : 'bg-red-50'} rounded-lg`}>
              {error}
            </div>
          )}
        </div>
      </main>

      <ChatInput onSend={handleSendMessage} disabled={isLoading} isDark={isDark} />
    </div>
  );
}

export default App;
