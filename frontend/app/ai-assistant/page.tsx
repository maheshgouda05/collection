'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useWardrobe } from '@/lib/wardrobeContext';
import { AssistantMessage, WardrobeItem } from '@/lib/types';
import { assistantService } from '@/lib/services/assistantService';
import { INITIAL_ASSISTANT_MESSAGES, SUGGESTED_ASSISTANT_PROMPTS } from '@/lib/mock/assistantData';
import {
  Sparkles,
  Send,
  Paperclip,
  Trash2,
  X,
  Shirt,
  ExternalLink,
  Bot,
  User,
  Info,
  Layers,
  ChevronRight,
} from 'lucide-react';

export default function AIAssistantPage() {
  const { items, bodyProfile, showToast } = useWardrobe();

  const [messages, setMessages] = useState<AssistantMessage[]>(INITIAL_ASSISTANT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [attachedItem, setAttachedItem] = useState<WardrobeItem | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text && !attachedItem) return;

    const messageContent = text || `Tell me how to style this ${attachedItem?.name}`;
    const now = new Date();
    const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: AssistantMessage = {
      id: `msg-user-${Date.now()}`,
      sender: 'user',
      content: messageContent,
      timestamp: timeFormatted,
      attachedItem: attachedItem || undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    const sentAttached = attachedItem;
    setAttachedItem(null);
    setIsTyping(true);

    try {
      const assistantReply = await assistantService.sendMessage(messageContent, {
        attachedItem: sentAttached || undefined,
        collection: items,
        profile: bodyProfile,
      });
      setMessages((prev) => [...prev, assistantReply]);
    } catch {
      showToast('Assistant simulation error. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearHistory = () => {
    if (confirm('Clear the conversation session history?')) {
      setMessages(INITIAL_ASSISTANT_MESSAGES);
      showToast('Conversation session cleared');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 text-violet-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Wardrobe AI Stylist</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-neutral-900 tracking-tight">
            AI Fashion Assistant
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Simulated AI assistant evaluating your {items.length} saved clothing pieces, proportions, and weather.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearHistory}
            className="px-3.5 py-2 rounded-xl bg-white border border-neutral-200 text-neutral-600 hover:text-neutral-900 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Chat</span>
          </button>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="p-3 rounded-2xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-between text-xs text-violet-900">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-violet-600 shrink-0" />
          <span>
            <strong>Demo Assistant:</strong> Powered by frontend rules matching your real collection data. Ready for future backend streaming LLM integration.
          </span>
        </div>
      </div>

      {/* Chat Conversation Container */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm flex flex-col h-[600px] overflow-hidden">
        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 custom-scrollbar bg-neutral-50/50">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] sm:max-w-[75%] ${
                  isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                    isUser
                      ? 'bg-neutral-900 text-white'
                      : 'bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-md'
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className="space-y-1.5">
                  <div
                    className={`p-4 rounded-2xl text-xs leading-relaxed shadow-sm ${
                      isUser
                        ? 'bg-neutral-900 text-white rounded-tr-none'
                        : 'bg-white border border-neutral-200/80 text-neutral-800 rounded-tl-none'
                    }`}
                  >
                    {/* Attached Item Card Preview (if any) */}
                    {msg.attachedItem && (
                      <div
                        className={`mb-3 p-2.5 rounded-xl border flex items-center gap-2.5 ${
                          isUser
                            ? 'bg-neutral-800 border-neutral-700 text-white'
                            : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                        }`}
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={msg.attachedItem.imageUrl}
                          alt={msg.attachedItem.name}
                          className="w-10 h-10 rounded-lg object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="text-[9px] uppercase tracking-wider block opacity-75">
                            Attached Closet Item
                          </span>
                          <p className="font-semibold truncate">{msg.attachedItem.name}</p>
                          <p className="text-[10px] opacity-75">
                            {msg.attachedItem.colour} • {msg.attachedItem.category}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="whitespace-pre-line">{msg.content}</div>

                    {/* Optional Action CTA */}
                    {msg.suggestedAction && (
                      <div className="pt-3 mt-3 border-t border-neutral-100">
                        <Link
                          href={msg.suggestedAction.href}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-violet-50 hover:bg-violet-100 text-violet-800 text-[11px] font-semibold transition"
                        >
                          <span>{msg.suggestedAction.label}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>

                  <span
                    className={`text-[10px] text-neutral-400 block px-1 ${
                      isUser ? 'text-right' : 'text-left'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-[75%] mr-auto items-center animate-fadeIn">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-neutral-200 p-3.5 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-violet-600 animate-bounce [animation-delay:0.4s]" />
                <span className="text-[11px] text-neutral-500 ml-1.5">Analyzing wardrobe rules...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Question Chips */}
        <div className="p-3 border-t border-neutral-100 bg-white overflow-x-auto custom-scrollbar flex items-center gap-2">
          <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider whitespace-nowrap px-1">
            Suggested:
          </span>
          {SUGGESTED_ASSISTANT_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[11px] whitespace-nowrap transition cursor-pointer shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Attached Item Draft Chip */}
        {attachedItem && (
          <div className="px-4 py-2 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between text-xs animate-fadeIn">
            <div className="flex items-center gap-2 text-neutral-700">
              <Paperclip className="w-3.5 h-3.5 text-violet-600" />
              <span>Attached Context:</span>
              <span className="font-semibold text-neutral-900">{attachedItem.name}</span>
              <span className="text-[10px] text-neutral-500">({attachedItem.colour})</span>
            </div>
            <button
              onClick={() => setAttachedItem(null)}
              className="p-1 hover:text-rose-600 text-neutral-400 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Message Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 sm:p-4 bg-white border-t border-neutral-200 flex items-center gap-2"
        >
          {/* Attach Button */}
          <button
            type="button"
            onClick={() => setIsPickerOpen(!isPickerOpen)}
            className={`p-2.5 rounded-xl border transition cursor-pointer ${
              attachedItem
                ? 'bg-violet-50 border-violet-300 text-violet-700'
                : 'bg-neutral-50 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
            }`}
            title="Attach item from collection"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              attachedItem
                ? `Ask about styling ${attachedItem.name}...`
                : 'Ask styling questions about your collection...'
            }
            className="flex-1 px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs outline-none focus:border-neutral-900 focus:bg-white transition"
          />

          <button
            type="submit"
            disabled={!inputText.trim() && !attachedItem}
            className="px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-black disabled:opacity-40 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            <span>Send</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>

      {/* Wardrobe Item Attachment Modal */}
      {isPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 space-y-4 max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <Shirt className="w-4 h-4 text-violet-600" />
                <h3 className="font-serif text-lg font-bold text-neutral-900">
                  Attach an Item to Query
                </h3>
              </div>
              <button
                onClick={() => setIsPickerOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-500">
              Select any piece in your closet to ask the assistant for tailored outfit pairings or care tips.
            </p>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setAttachedItem(item);
                    setIsPickerOpen(false);
                    showToast(`Attached "${item.name}"`);
                  }}
                  className="w-full p-3 rounded-2xl border border-neutral-200 hover:border-neutral-900 bg-neutral-50/50 hover:bg-white transition flex items-center gap-3 text-left cursor-pointer"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-12 h-12 rounded-xl object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-neutral-900 truncate">{item.name}</p>
                    <p className="text-[11px] text-neutral-500">
                      {item.category} • {item.colour} • {item.fabric}
                    </p>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-400 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
