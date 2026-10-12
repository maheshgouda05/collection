import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Send, 
  Sparkles, 
  Shirt, 
  User, 
  RefreshCw,
  PlusCircle,
  MessageSquare
} from 'lucide-react';
import { useWardrobe } from '../lib/wardrobeContext.tsx';
import { assistantService } from '../lib/services/assistantService.ts';
import type { StylingConversation, StylingMessage } from '../lib/types.ts';

export const AiStylistView: React.FC = () => {
  const { user, items, weather } = useWardrobe();

  const [conversations, setConversations] = useState<StylingConversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<StylingMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Quick prompt suggestions
  const promptChips = [
    'What should I wear today based on the weather?',
    'Create a chic weekend brunch outfit with my dresses.',
    'Which wardrobe categories am I currently missing?',
    'How can I layer my outerwear for an evening event?',
  ];

  const loadConversations = async () => {
    try {
      const convs = await assistantService.getConversations();
      setConversations(convs);
      if (convs.length > 0 && !activeConvId) {
        selectConversation(convs[0].id);
      }
    } catch (err) {
      console.warn('Failed to load conversations:', err);
    }
  };

  const selectConversation = async (id: string) => {
    setActiveConvId(id);
    try {
      const conv = await assistantService.getConversation(id);
      setMessages(conv.messages || []);
    } catch (err) {
      console.error('Failed to load conversation details:', err);
    }
  };

  const startNewChat = () => {
    setActiveConvId(null);
    setMessages([]);
  };

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    setInputMessage('');

    // Optimistic user message append
    const tempUserMsg: StylingMessage = {
      id: crypto.randomUUID(),
      conversationId: activeConvId || 'temp',
      role: 'user',
      content: text,
      createdAt: new Date().toISOString(),
    };
    setMessages(prev => [...prev, tempUserMsg]);
    setIsLoading(true);

    try {
      const res = await assistantService.sendMessage({
        message: text,
        conversationId: activeConvId || undefined,
        weatherCity: weather?.city,
      });

      if (!activeConvId) {
        setActiveConvId(res.conversationId);
        loadConversations();
      }

      setMessages(prev => [...prev, res.message]);
    } catch (err: any) {
      const errorMsg: StylingMessage = {
        id: crypto.randomUUID(),
        conversationId: activeConvId || 'temp',
        role: 'assistant',
        content: `Stylist Error: ${err.message || 'Unable to contact AI stylist service.'}`,
        createdAt: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-8.5rem)] flex flex-col md:flex-row gap-4 animate-fade-in pb-4">
      {/* Sidebar: Conversation Sessions */}
      <div className="hidden md:flex flex-col w-72 bg-slate-900 border border-slate-800 rounded-3xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-rose-400" />
            <h2 className="text-sm font-bold text-white">Stylist Sessions</h2>
          </div>
          <button
            onClick={startNewChat}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="Start new conversation"
          >
            <PlusCircle className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {conversations.map(conv => {
            const isActive = conv.id === activeConvId;
            return (
              <button
                key={conv.id}
                onClick={() => selectConversation(conv.id)}
                className={`w-full text-left p-3 rounded-xl text-xs font-medium transition-all flex items-start gap-2.5 ${
                  isActive
                    ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <MessageSquare className="w-4 h-4 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <span className="truncate block font-semibold text-slate-200">
                    {conv.title}
                  </span>
                  <span className="text-[10px] text-slate-500 block">
                    {new Date(conv.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </button>
            );
          })}
          {conversations.length === 0 && (
            <div className="p-4 text-center text-xs text-slate-500">
              No previous styling chats. Ask your first question!
            </div>
          )}
        </div>

        {/* Client Wardrobe Context Badge */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
          <span>Active Closet:</span>
          <span className="font-semibold text-white">{items.length} garments</span>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 bg-slate-900 border border-slate-800 rounded-3xl shadow-xl flex flex-col overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Personal AI Stylist</span>
                <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-indigo-500/15 text-indigo-400 border border-indigo-500/30">
                  Gemini 3.8 Flash
                </span>
              </h2>
              <p className="text-[11px] text-slate-400">
                Grounded strictly in your {items.length} wardrobe pieces & weather data
              </p>
            </div>
          </div>

          <button
            onClick={startNewChat}
            className="md:hidden px-3 py-1.5 bg-slate-800 text-xs text-slate-300 rounded-xl"
          >
            New Chat
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 max-w-md mx-auto">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4 shadow-inner">
                <Bot className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white">How can I style you today?</h3>
              <p className="text-xs text-slate-400 mt-1 mb-6">
                I know every piece in your wardrobe, your measurements, and the current forecast in {weather?.city || 'your city'}.
              </p>

              {/* Prompt Suggestion Chips */}
              <div className="space-y-2 w-full text-left">
                {promptChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(chip)}
                    className="w-full p-2.5 rounded-xl bg-slate-950 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-xs text-left transition-all flex items-center justify-between group"
                  >
                    <span>{chip}</span>
                    <Sparkles className="w-3.5 h-3.5 text-slate-500 group-hover:text-rose-400 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map(msg => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white shrink-0 shadow-sm mt-1">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                      isAssistant
                        ? 'bg-slate-950 border border-slate-800 text-slate-200'
                        : 'bg-indigo-600 text-white shadow-md'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    <span className="text-[10px] text-slate-400 block mt-2 text-right">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {!isAssistant && (
                    <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0 mt-1">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })
          )}

          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-indigo-600 flex items-center justify-center text-white shrink-0 animate-pulse">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-xs text-slate-400 flex items-center gap-2">
                <div className="w-3 h-3 bg-rose-500 rounded-full animate-bounce" />
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                <span className="ml-2">Stylist analyzing wardrobe collection...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 border-t border-slate-800/80 bg-slate-950/60">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="Ask for outfit pairings, event styling, or wardrobe gap checks..."
              className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs sm:text-sm placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={isLoading || !inputMessage.trim()}
              className="px-5 py-2.5 bg-gradient-to-r from-rose-500 to-indigo-600 hover:opacity-95 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-md transition-all disabled:opacity-40 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
