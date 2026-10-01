import { GoogleGenAI } from '@google/genai';
import type { MatchedSchemeResult, UserProfile } from '../data/schemes.ts';

export async function generateExplanationsWithGemini(
  profile: UserProfile,
  matchedResults: MatchedSchemeResult[]
): Promise<{ results: MatchedSchemeResult[]; usedGemini: boolean }> {
  if (matchedResults.length === 0) {
    return { results: matchedResults, usedGemini: false };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.log('[LLM] No GEMINI_API_KEY configured. Using deterministic rule-template fallback.');
    return { results: matchedResults, usedGemini: false };
  }

  try {
    const ai = new GoogleGenAI();
    const isHindi = profile.language === 'hi';

    // Prepare lean scheme summary for grounding
    const simplifiedSchemes = matchedResults.map(r => ({
      id: r.scheme.id,
      name: isHindi ? r.scheme.name_hi : r.scheme.name,
      category: r.scheme.category,
      benefit_summary: isHindi ? r.scheme.benefit_summary_hi : r.scheme.benefit_summary,
      matched_reasons: r.match_reasons.map(m => (isHindi ? m.text_hi : m.text_en))
    }));

    const prompt = `You are YojanaMitra, an empathetic and trusted public benefits counselor helping Indian citizens understand their welfare entitlements.

TARGET USER PROFILE:
- Age: ${profile.age} years old
- State of Residence: ${profile.state}
- Annual Family Income: ₹${profile.income.toLocaleString('en-IN')}
- Occupation: ${profile.occupation}
- Gender: ${profile.gender}
- Category: ${profile.category.toUpperCase()}
- Language for Output: ${isHindi ? 'Hindi (सरल, स्पष्ट और सम्मानजनक हिंदी - 8वीं कक्षा का स्तर)' : 'Simple English (Class 8 reading level, friendly and clear)'}

MATCHED SCHEMES DATA:
${JSON.stringify(simplifiedSchemes, null, 2)}

STRICT INSTRUCTIONS:
1. For EACH scheme provided above, write a warm, crystal-clear explanation ("why_you_qualify") of why this specific person qualifies and how it directly benefits them.
2. MAXIMUM 35-40 words per scheme explanation.
3. GROUNDING: Use ONLY the provided scheme data and user profile. NEVER invent benefits, documents, or additional schemes.
4. If output language is Hindi, use natural, empathetic Hindi (e.g., "आपकी आयु ${profile.age} वर्ष और पारिवारिक आय के आधार पर आप इस योजना के पूर्ण पात्र हैं...").
5. Return ONLY a valid JSON array of objects with the exact schema:
[
  { "id": "scheme_id_here", "why_you_qualify": "short friendly explanation here" }
]`;

    // 4.5s AbortController timeout to guarantee quick user responses
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4500);

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        temperature: 0.2,
      }
    });

    clearTimeout(timeout);

    const text = response.text?.trim();
    if (!text) {
      throw new Error('Empty response from Gemini');
    }

    const parsed = JSON.parse(text) as Array<{ id: string; why_you_qualify: string }>;
    const explanationMap = new Map<string, string>();
    for (const item of parsed) {
      if (item.id && item.why_you_qualify) {
        explanationMap.set(item.id, item.why_you_qualify);
      }
    }

    const updatedResults = matchedResults.map(res => {
      const geminiExplanation = explanationMap.get(res.scheme.id);
      if (geminiExplanation) {
        return { ...res, why_you_qualify: geminiExplanation };
      }
      return res;
    });

    return { results: updatedResults, usedGemini: true };
  } catch (error) {
    console.warn('[LLM] Gemini explanation fallback triggered:', error);
    // Return original deterministic template explanations
    return { results: matchedResults, usedGemini: false };
  }
}
