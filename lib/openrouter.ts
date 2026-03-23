import axios from 'axios';

export interface OpenRouterConfig {
  apiKey: string;
  baseURL: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OpenRouterResponse {
  id: string;
  choices: Array<{
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export class OpenRouterClient {
  private config: OpenRouterConfig;

  constructor(config: OpenRouterConfig) {
    this.config = config;
  }

  async createChatCompletion(
    messages: ChatMessage[],
    model: string = 'openai/gpt-3.5-turbo',
    options: {
      temperature?: number;
      max_tokens?: number;
      stream?: boolean;
    } = {}
  ): Promise<OpenRouterResponse> {
    try {
      const response = await axios.post(
        `${this.config.baseURL}/chat/completions`,
        {
          model,
          messages,
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 1000,
          stream: options.stream || false,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.config.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
            'X-Title': 'Microbot AI',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('OpenRouter API error:', error);
      throw new Error('Failed to get AI response');
    }
  }

  async getModels(): Promise<any[]> {
    try {
      const response = await axios.get(`${this.config.baseURL}/models`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch models:', error);
      return [];
    }
  }
}

// Default client instance
export const openRouterClient = new OpenRouterClient({
  apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || '',
  baseURL: 'https://openrouter.ai/api/v1',
});