import { AssistantMessage } from '../types';

export const INITIAL_ASSISTANT_MESSAGES: AssistantMessage[] = [
  {
    id: 'msg-welcome-01',
    sender: 'assistant',
    content:
      "Hello Elena! I'm your Collection It All wardrobe styling assistant. I have full visibility of your saved clothing collection, body profile, and style preferences. How can I help you dress or coordinate today?",
    timestamp: '10:00 AM',
  },
];

export const SUGGESTED_ASSISTANT_PROMPTS = [
  'What should I wear today?',
  'Which shirt matches these trousers?',
  'Suggest an outfit for college.',
  'What can I wear to a party using my existing collection?',
  'Which shoes match this dress?',
  'What am I missing in my wardrobe?',
  'Suggest an outfit based on today\'s weather.',
  'What should I buy to complete this outfit?',
  'How can I style this item in three different ways?',
];
