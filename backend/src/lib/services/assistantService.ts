import { apiRequest } from './apiClient.ts';
import type { StylingConversation, StylingMessage } from '../types.ts';

export const assistantService = {
  async getConversations(): Promise<StylingConversation[]> {
    const res = await apiRequest<{ conversations: StylingConversation[] }>('/api/ai/conversations');
    return res.conversations || [];
  },

  async getConversation(id: string): Promise<StylingConversation> {
    const res = await apiRequest<{ conversation: StylingConversation }>(`/api/ai/conversations/${id}`);
    return res.conversation;
  },

  async sendMessage(payload: {
    message: string;
    conversationId?: string;
    selectedItemId?: string;
    occasion?: string;
    weatherCity?: string;
  }): Promise<{
    conversationId: string;
    message: StylingMessage;
    reply: string;
  }> {
    return apiRequest('/api/ai/assistant', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },
};
