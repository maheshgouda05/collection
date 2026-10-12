import { AssistantMessage, WardrobeItem, BodyProfile } from '../types';
import { apiFetch } from './apiClient';

export interface AssistantContext {
  attachedItem?: WardrobeItem;
  collection: WardrobeItem[];
  profile?: BodyProfile;
  currentWeather?: string;
  conversationId?: string;
}

/**
 * assistantService powers the AI Stylist, connected to backend /api/ai/assistant
 * (using Google Gemini 2.5/3.8 Flash) with rule-based fallback.
 */
export const assistantService = {
  /**
   * Generates a context-aware styling response from backend AI assistant.
   */
  sendMessage: async (
    userText: string,
    context: AssistantContext
  ): Promise<AssistantMessage> => {
    // Attempt backend AI assistant call
    try {
      const res = await apiFetch<{
        reply: string;
        conversationId?: string;
        message?: { id: string; content: string; createdAt: string };
      }>('/api/ai/assistant', {
        method: 'POST',
        body: JSON.stringify({
          message: userText,
          selectedItemId: context.attachedItem?.id,
          weatherCity: context.currentWeather || 'Paris',
          conversationId: context.conversationId,
        }),
      });

      if (res.ok && res.data && (res.data.reply || res.data.message?.content)) {
        const text = res.data.reply || res.data.message!.content;
        return {
          id: res.data.message?.id || `msg-assistant-${Date.now()}`,
          sender: 'assistant',
          content: text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestedAction: { type: 'open_matcher', label: 'View in Smart Matcher', href: '/smart-match' },
        };
      }
    } catch (e) {
      console.warn('Backend /api/ai/assistant call failed, using local stylist fallback:', e);
    }

    // Local rule-based styling fallback
    await new Promise((res) => setTimeout(res, 400));

    const query = userText.toLowerCase().trim();
    const { attachedItem, collection } = context;

    const tops = collection.filter((i) => i.category.toLowerCase().includes('top'));
    const bottoms = collection.filter((i) => i.category.toLowerCase().includes('bottom'));
    const outerwear = collection.filter((i) => i.category.toLowerCase().includes('outer'));
    const footwear = collection.filter((i) => i.category.toLowerCase().includes('footwear'));
    const dresses = collection.filter((i) => i.category.toLowerCase().includes('dress'));

    let reply = '';
    let suggestedAction: AssistantMessage['suggestedAction'] = undefined;

    if (attachedItem) {
      if (query.includes('how can i style') || query.includes('three different ways') || query.includes('3 different ways') || query.includes('style this')) {
        reply = `Here are 3 distinct ways to style your "${attachedItem.name}" (${attachedItem.colour}):\n\n` +
          `1. **Quiet Luxury Office**: Pair it with ${bottoms[0]?.name || 'tailored trousers'} and ${outerwear[0]?.name || 'a classic structured coat'}. Add minimalist leather loafers.\n` +
          `2. **Weekend Casual Stroll**: Dress it down with denim jeans and clean white sneakers. Leave cuffs unbuttoned for an effortless drape.\n` +
          `3. **Evening Chic**: Elevate with a monochrome contrast palette, a gold chain necklace, and a statement clutch.`;
        suggestedAction = { type: 'open_matcher', label: 'Open Smart Matcher', href: '/smart-match' };
      } else if (query.includes('match') || query.includes('shoes') || query.includes('trouser') || query.includes('pant')) {
        const matchingBottom = bottoms.find((b) => b.colorFamily !== attachedItem.colorFamily) || bottoms[0];
        const matchingShoe = footwear[0];
        reply = `For your **${attachedItem.name}**, I recommend pairing it with your **${matchingBottom?.name || 'neutral trousers'}** to create a balanced silhouette. Finish the look with **${matchingShoe?.name || 'clean leather footwear'}**.`;
        suggestedAction = { type: 'open_matcher', label: 'View Match in Smart Matcher', href: '/smart-match' };
      } else {
        reply = `Regarding your **${attachedItem.name}** (${attachedItem.colour}, ${attachedItem.fabric}): It’s a versatile piece in your collection! You've worn it ${attachedItem.timesWorn || 0} times. Would you like an outfit pairing for college, office, or an evening event?`;
      }
    } else if (query.includes('what should i wear today') || query.includes('today')) {
      const top = tops[0]?.name || 'Crisp Poplin Shirt';
      const bottom = bottoms[0]?.name || 'Pleated Trousers';
      const outer = outerwear[0]?.name || 'Trench Coat';
      reply = `Based on today's weather and your capsule collection, here is a timeless look for today:\n\n` +
        `• **Top**: ${top}\n` +
        `• **Bottom**: ${bottom}\n` +
        `• **Layering**: ${outer}\n` +
        `• **Why it works**: Clean neutral harmony that keeps you comfortable throughout the day without overdressing.`;
      suggestedAction = { type: 'open_matcher', label: 'See Generated Looks', href: '/smart-match' };
    } else if (query.includes('college')) {
      const casualTop = tops.find((t) => t.category.toLowerCase().includes('t-shirt') || t.name.toLowerCase().includes('breton') || t.name.toLowerCase().includes('knit')) || tops[0];
      const jeans = bottoms.find((b) => b.name.toLowerCase().includes('jean') || b.category.toLowerCase().includes('jean')) || bottoms[0];
      const shoes = footwear[0]?.name || 'Clean Court Sneakers';
      reply = `Here is a relaxed, stylish college combination from your wardrobe:\n\n` +
        `• **${casualTop?.name || 'Relaxed Tee or Knit'}**\n` +
        `• **${jeans?.name || 'Denim Jeans'}**\n` +
        `• **${shoes}**\n\n` +
        `Tip: Throw on a canvas tote or crossbody bag to carry your essentials easily.`;
    } else if (query.includes('party')) {
      if (dresses.length > 0) {
        reply = `For a party, nothing beats your **${dresses[0].name}** (${dresses[0].colour}). Style it with delicate jewellery and your best evening shoes. If it gets chilly, drape ${outerwear[0]?.name || 'a dark blazer'} over your shoulders.`;
      } else {
        reply = `For a night out, elevate your look by pairing **${tops[0]?.name || 'a silk top'}** tucked into **${bottoms[0]?.name || 'dark tailored trousers'}**, anchored with statement footwear.`;
      }
      suggestedAction = { type: 'view_collection', label: 'View Party Dresses', href: '/collection' };
    } else if (query.includes('shoes match this dress') || query.includes('shoes match')) {
      reply = `When styling dresses from your wardrobe:\n\n` +
        `• **Daytime/Casual**: Low-top ecru leather sneakers or flat leather mules create an effortless Parisian contrast.\n` +
        `• **Evening/Formal**: Sleek pointed ankle boots or ankle-strap heels elongate the silhouette and complement the drape of the fabric.`;
    } else if (query.includes('missing') || query.includes('gap') || query.includes('buy')) {
      reply = `Analyzing your ${collection.length} wardrobe pieces:\n\n` +
        `• **High Coverage**: Tops (${tops.length} items) and Bottoms (${bottoms.length} items).\n` +
        `• **Opportunity Gap**: You could benefit from a versatile **Pair of Minimalist Derby Oxford Shoes** or a **Wool Cashmere Scarf** to unlock 8+ new winter/autumn combinations.\n\n` +
        `Check our "Shop Matching Items" tab to review non-duplicate essentials tailored to what you own!`;
      suggestedAction = { type: 'check_shop', label: 'View Wardrobe Gap Fillers', href: '/smart-match' };
    } else if (query.includes('weather')) {
      reply = `For today's mild autumn weather (around 16°C – 18°C):\n\n` +
        `• Wear your **${tops[0]?.name || 'Cotton Poplin Shirt'}** as a base layer.\n` +
        `• Keep your **${outerwear[0]?.name || 'Structured Trench Coat'}** on hand for the morning and evening breeze.\n` +
        `• Choose breathable natural fibers so you stay comfortable indoors.`;
    } else {
      reply = `I evaluated your question against your ${collection.length} saved wardrobe items. You have great foundation pieces in ${tops[0]?.colour || 'White'} and ${bottoms[0]?.colour || 'Neutral'} tones. Let me know if you want to explore a specific occasion (College, Office, Party) or attach an item to see exact pairings!`;
    }

    const now = new Date();
    const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return {
      id: `msg-assistant-${Date.now()}`,
      sender: 'assistant',
      content: reply,
      timestamp: timeFormatted,
      suggestedAction,
    };
  },
};
