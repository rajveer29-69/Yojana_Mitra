import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { SCHEMES } from './src/data/schemes.ts';
import type { UserProfile } from './src/data/schemes.ts';
import { matchSchemes } from './src/services/matcher.ts';
import { generateExplanationsWithGemini } from './src/services/llm.ts';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Quick health check as required by PRD Section 6.5
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', schemes_count: SCHEMES.length, timestamp: new Date().toISOString() });
});

// Full schemes list endpoint
app.get('/api/schemes', (_req: Request, res: Response) => {
  res.json({ total: SCHEMES.length, schemes: SCHEMES });
});

// Core matching endpoint (supporting both /api/match and /match as per PRD)
const handleMatch = async (req: Request, res: Response) => {
  try {
    const {
      language = 'en',
      age,
      state = 'All India',
      income = 0,
      occupation = 'unemployed',
      gender = 'other',
      category = 'general'
    } = req.body;

    const parsedAge = Number(age);
    const parsedIncome = Number(income);

    // Basic validation (PRD FR-5)
    if (isNaN(parsedAge) || parsedAge < 0 || parsedAge > 120) {
      res.status(400).json({ error: 'Please enter a valid age between 0 and 120.' });
      return;
    }
    if (isNaN(parsedIncome) || parsedIncome < 0) {
      res.status(400).json({ error: 'Income must be a non-negative number.' });
      return;
    }

    const profile: UserProfile = {
      language: language === 'hi' ? 'hi' : 'en',
      age: parsedAge,
      state: String(state),
      income: parsedIncome,
      occupation,
      gender,
      category
    };

    // 1. Rule-based matching engine
    const { exactMatches, nearlyEligible } = matchSchemes(profile);

    // 2. LLM explanation layer for matched schemes
    const { results, usedGemini } = await generateExplanationsWithGemini(profile, exactMatches);

    res.json({
      count: results.length,
      results,
      nearly_eligible: nearlyEligible,
      source: usedGemini ? 'gemini' : 'template',
      user_profile: profile
    });
  } catch (error: any) {
    console.error('Error processing /match request:', error);
    res.status(500).json({ error: 'Internal server error while matching schemes.' });
  }
};

app.post('/api/match', handleMatch);
app.post('/match', handleMatch);

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
    console.log('[Dev] Vite middleware mounted');
  } else {
    const distPath = path.resolve('dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log('[Prod] Static assets served from dist');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
