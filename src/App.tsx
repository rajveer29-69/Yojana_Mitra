import React, { useState, useEffect } from 'react';
import { Header } from './components/Header.tsx';
import { PersonaPresets } from './components/PersonaPresets.tsx';
import { QuestionWizard } from './components/QuestionWizard.tsx';
import { SchemeCard } from './components/SchemeCard.tsx';
import { SchemeDetailModal } from './components/SchemeDetailModal.tsx';
import { NearlyEligibleSection } from './components/NearlyEligibleSection.tsx';
import { ShareModal } from './components/ShareModal.tsx';
import { MethodologyModal } from './components/MethodologyModal.tsx';
import { PrintSummaryView } from './components/PrintSummaryView.tsx';
import { EmailSubscribeModal } from './components/EmailSubscribeModal.tsx';
import { FAQSection } from './components/FAQSection.tsx';
import { TRANSLATIONS } from './data/translations.ts';
import { SCHEMES, UserProfile, MatchedSchemeResult, MatchEngineResponse } from './data/schemes.ts';
import { matchSchemes } from './services/matcher.ts';
import { 
  Sparkles, 
  Search, 
  RotateCcw, 
  Share2, 
  Printer, 
  Building2, 
  ShieldCheck, 
  CheckCircle2, 
  Compass, 
  ExternalLink,
  Award,
  Users,
  ChevronRight,
  BellRing,
  Bookmark,
  Trash2,
  ArrowUp
} from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<'en' | 'hi'>('hi');
  const [cscMode, setCscMode] = useState<boolean>(false);
  const [selectedPersonaId, setSelectedPersonaId] = useState<string | null>(null);

  // Global dark mode theme state with localStorage persistence
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const stored = localStorage.getItem('yojanamitra_theme');
      if (stored === 'light' || stored === 'dark') return stored;
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch {
      // ignore
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('yojanamitra_theme', theme);
    } catch (e) {
      console.warn('Failed to save theme preference', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Saved schemes state persisted in localStorage
  const [savedSchemeIds, setSavedSchemeIds] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem('yojanamitra_saved_schemes');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const handleToggleSave = (schemeId: string) => {
    setSavedSchemeIds(prev => {
      const next = prev.includes(schemeId)
        ? prev.filter(id => id !== schemeId)
        : [...prev, schemeId];
      try {
        localStorage.setItem('yojanamitra_saved_schemes', JSON.stringify(next));
      } catch (e) {
        console.warn('Failed to save schemes to localStorage', e);
      }
      return next;
    });
  };

  const handleClearSaved = () => {
    setSavedSchemeIds([]);
    try {
      localStorage.removeItem('yojanamitra_saved_schemes');
    } catch (e) {
      console.warn(e);
    }
  };

  // Profile and results state
  const [activeProfile, setActiveProfile] = useState<UserProfile | null>(null);
  const [initialFormValues, setInitialFormValues] = useState<Partial<UserProfile> | undefined>(undefined);
  const [matchedResults, setMatchedResults] = useState<MatchedSchemeResult[] | null>(null);
  const [nearlyEligible, setNearlyEligible] = useState<MatchedSchemeResult[]>([]);
  const [sourceType, setSourceType] = useState<'gemini' | 'template'>('gemini');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Category filter, Sector filter, and search within results
  const [selectedSector, setSelectedSector] = useState<'all' | 'state_government' | 'government' | 'private' | 'saved'>('all');
  const [privateSubfilter, setPrivateSubfilter] = useState<'all' | 'students' | 'elders' | 'parents' | 'healthcare'>('all');
  const [stateSubfilter, setStateSubfilter] = useState<'all' | 'students' | 'parents' | 'grandparents'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [activeModalScheme, setActiveModalScheme] = useState<MatchedSchemeResult | null>(null);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isMethodologyOpen, setIsMethodologyOpen] = useState<boolean>(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState<boolean>(false);

  // Scroll to Top floating action button state
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button once user scrolls past 300px (e.g. into questionnaire or results)
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const t = TRANSLATIONS[language];
  const isHi = language === 'hi';

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleSelectPersona = (presetProfile: Omit<UserProfile, 'language'>) => {
    const fullProfile: UserProfile = { ...presetProfile, language };
    setInitialFormValues(fullProfile);
    handleSubmitProfile(fullProfile);
  };

  // Deep-link support for shared links (e.g., from WhatsApp)
  useEffect(() => {
    try {
      if (typeof window === 'undefined' || !window.location.search) return;
      const params = new URLSearchParams(window.location.search);
      const stateParam = params.get('state');
      const ageParam = params.get('age');
      const incomeParam = params.get('income');
      const occParam = params.get('occupation') as UserProfile['occupation'];
      const genParam = params.get('gender') as UserProfile['gender'];
      const catParam = params.get('category') as UserProfile['category'];
      const langParam = params.get('lang');

      if (langParam === 'hi' || langParam === 'en') {
        setLanguage(langParam);
      }

      if (stateParam && ageParam) {
        const sharedProfile: UserProfile = {
          language: (langParam === 'hi' ? 'hi' : language),
          state: stateParam,
          age: Number(ageParam) || 35,
          income: incomeParam !== null ? Number(incomeParam) : 150000,
          occupation: occParam || 'farmer',
          gender: genParam || 'male',
          category: catParam || 'obc'
        };
        setInitialFormValues(sharedProfile);
        handleSubmitProfile(sharedProfile);
      }
    } catch (e) {
      console.warn('Failed to parse shared scheme URL params', e);
    }
  }, []);

  const handleSubmitProfile = async (profile: UserProfile) => {
    setIsLoading(true);
    setActiveProfile(profile);

    try {
      // Primary: Call fullstack server /api/match
      const res = await fetch('/api/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data: MatchEngineResponse = await res.json();
      setMatchedResults(data.results);
      setNearlyEligible(data.nearly_eligible);
      setSourceType(data.source);
    } catch (err) {
      console.warn('Backend match failed, falling back to local client-side matching engine:', err);
      // Offline fallback guarantee
      const { exactMatches, nearlyEligible: clientNearly } = matchSchemes(profile);
      setMatchedResults(exactMatches);
      setNearlyEligible(clientNearly);
      setSourceType('template');
    } finally {
      setIsLoading(false);
      // Smooth scroll to results if on mobile
      setTimeout(() => {
        const resultsEl = document.getElementById('results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  };

  const handleReset = () => {
    setMatchedResults(null);
    setNearlyEligible([]);
    setActiveProfile(null);
    setInitialFormValues(undefined);
    setSelectedPersonaId(null);
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedSector('all');
    setPrivateSubfilter('all');
    setStateSubfilter('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Instant 1-click explorer for Private Sector & Bank Schemes
  const handleExplorePrivate = (subfilter: 'all' | 'students' | 'elders' | 'parents' | 'healthcare' = 'all') => {
    const privateMatches: MatchedSchemeResult[] = SCHEMES.filter(s => s.sector === 'private').map(s => ({
      scheme: s,
      why_you_qualify: isHi
        ? 'यह प्रतिष्ठित निजी बैंक / ट्रस्ट द्वारा संचालित कल्याणकारी कार्यक्रम है। सभी नागरिक पात्रता नियम व प्रत्यक्ष आवेदन लिंक देख सकते हैं।'
        : 'This is a verified private sector / bank CSR welfare initiative. Review eligibility criteria and direct application links below.',
      match_reasons: [
        {
          field: 'sector',
          passed: true,
          text_en: `Offered by ${s.ministry} nationwide`,
          text_hi: `${s.ministry_hi} द्वारा अखिल भारतीय स्तर पर संचालित`
        }
      ],
      is_exact_match: true
    }));
    setMatchedResults(privateMatches);
    setSelectedSector('private');
    setSelectedCategory('all');
    setPrivateSubfilter(subfilter);
    setTimeout(() => {
      const el = document.getElementById('results-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const handleExploreState = (subfilter: 'all' | 'students' | 'parents' | 'grandparents' = 'all') => {
    const stateMatches: MatchedSchemeResult[] = SCHEMES
      .filter((s) => s.provider_type === 'state_government' || (!s.eligibility.states.includes('all') && s.sector !== 'private'))
      .map((scheme) => ({
        scheme,
        why_you_qualify:
          language === 'hi'
            ? `${scheme.eligibility.states.join(', ')} राज्य सरकार द्वारा छात्रों, अभिभावकों व बुजुर्गों हेतु संचालित प्रमुख कल्याणकारी योजना।`
            : `Official state government welfare initiative provided for residents of ${scheme.eligibility.states.join(', ')}.`,
        match_reasons: [
          {
            field: 'state',
            passed: true,
            text_en: `Official state government program across ${scheme.eligibility.states.join(', ')}`,
            text_hi: `${scheme.eligibility.states.join(', ')} राज्य सरकार का कल्याणकारी कार्यक्रम`
          }
        ],
        is_exact_match: true
      }));
    setMatchedResults(stateMatches);
    setSelectedSector('state_government');
    setSelectedCategory('all');
    setStateSubfilter(subfilter);
    setTimeout(() => {
      const el = document.getElementById('results-section');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  // Array of full MatchedSchemeResult objects for currently pinned schemes
  const savedResults: MatchedSchemeResult[] = savedSchemeIds
    .map((id) => {
      const fromMatched = matchedResults?.find((m) => m.scheme.id === id);
      if (fromMatched) return fromMatched;
      const fromCatalog = SCHEMES.find((s) => s.id === id);
      if (fromCatalog) {
        return {
          scheme: fromCatalog,
          why_you_qualify:
            language === 'hi'
              ? 'यह योजना आपने बाद में देखने हेतु पिन/सुरक्षित की है।'
              : 'You pinned this scheme for future reference.',
          match_reasons: [],
          is_exact_match: true
        };
      }
      return null;
    })
    .filter(Boolean) as MatchedSchemeResult[];

  // Counts for Government (State & Central) and Private sectors
  const govtCount = (matchedResults || []).filter((r) => r.scheme.sector !== 'private').length;
  const stateGovtCount = (matchedResults || []).filter((r) => r.scheme.sector !== 'private' && (!r.scheme.eligibility.states.includes('all') || r.scheme.provider_type === 'state_government')).length;
  const privateCount = (matchedResults || []).filter((r) => r.scheme.sector === 'private').length;

  // Filter matched results by Sector, Private Subfilter, Category & Search query
  const baseList = selectedSector === 'saved' || selectedCategory === 'saved' 
    ? savedResults 
    : (matchedResults || []);

  const filteredResults = baseList.filter((r) => {
    // 1. Sector filter
    if (selectedSector === 'state_government') {
      if (r.scheme.sector === 'private') return false;
      if (r.scheme.eligibility.states.includes('all') && r.scheme.provider_type !== 'state_government') return false;

      // State subfilter
      if (stateSubfilter === 'students') {
        if (r.scheme.target_group !== 'student' && r.scheme.category !== 'education') return false;
      } else if (stateSubfilter === 'parents') {
        if (r.scheme.target_group !== 'parent' && r.scheme.category !== 'women_child' && r.scheme.category !== 'healthcare') return false;
      } else if (stateSubfilter === 'grandparents') {
        if (r.scheme.target_group !== 'elder' && r.scheme.category !== 'pension' && r.scheme.category !== 'social_security') return false;
      }
    } else if (selectedSector === 'government') {
      if (r.scheme.sector === 'private') return false;
    } else if (selectedSector === 'private') {
      if (r.scheme.sector !== 'private') return false;

      // 1b. Private subfilter
      if (privateSubfilter === 'students') {
        if (r.scheme.target_group !== 'student' && r.scheme.category !== 'education') return false;
      } else if (privateSubfilter === 'elders') {
        if (r.scheme.target_group !== 'elder' && r.scheme.category !== 'social_security' && r.scheme.category !== 'pension') return false;
      } else if (privateSubfilter === 'parents') {
        if (r.scheme.target_group !== 'parent' && r.scheme.category !== 'women_child' && r.scheme.category !== 'business_employment') return false;
      } else if (privateSubfilter === 'healthcare') {
        if (r.scheme.category !== 'healthcare') return false;
      }
    }

    // 2. Category filter
    if (selectedCategory !== 'all' && selectedCategory !== 'saved') {
      if (selectedCategory === 'private_sector') {
        if (r.scheme.sector !== 'private') return false;
      } else if (selectedCategory === 'pension') {
        if (r.scheme.category !== 'pension' && r.scheme.category !== 'social_security' && r.scheme.target_group !== 'elder') return false;
      } else if (r.scheme.category !== selectedCategory) {
        return false;
      }
    }

    // 3. Search query
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    const titleMatch = r.scheme.name.toLowerCase().includes(q) || r.scheme.name_hi.includes(q);
    const descMatch = r.scheme.benefit_summary.toLowerCase().includes(q) || r.scheme.benefit_summary_hi.includes(q);
    const minMatch = r.scheme.ministry.toLowerCase().includes(q) || r.scheme.ministry_hi.includes(q);
    const tagMatch = r.scheme.tags?.some(tag => tag.toLowerCase().includes(q));
    return titleMatch || descMatch || minMatch || tagMatch;
  });

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-[#070c18] text-stone-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Header */}
      <Header
        language={language}
        onToggleLanguage={toggleLanguage}
        theme={theme}
        onToggleTheme={toggleTheme}
        cscMode={cscMode}
        onToggleCscMode={() => setCscMode(!cscMode)}
        onOpenMethodology={() => setIsMethodologyOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        savedCount={savedSchemeIds.length}
        onScrollToSaved={() => {
          if (matchedResults === null && savedSchemeIds.length > 0) {
            setMatchedResults([]);
            setSelectedCategory('saved');
          }
          setTimeout(() => {
            const el = document.getElementById('saved-schemes-section') || document.getElementById('results-section');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
          }, 50);
        }}
        onScrollToFaqs={() => {
          const el = document.getElementById('faqs-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-100/80 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-bold mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            <span>{t.hero_badge}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-stone-900 dark:text-stone-100 mb-3 leading-tight font-serif">
            {t.app_tagline}
          </h1>

          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-350 font-medium leading-relaxed max-w-2xl mx-auto">
            {t.app_subheading}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-md mx-auto mt-6 pt-5 border-t border-stone-200 dark:border-stone-800">
            <div>
              <p className="text-lg sm:text-xl font-extrabold text-amber-800 dark:text-amber-400">35+</p>
              <p className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase">{isHi ? 'सरकारी व निजी योजनाएं' : 'Govt & Bank Schemes'}</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-extrabold text-emerald-800 dark:text-emerald-400">100%</p>
              <p className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase">{t.hero_stat_2_lbl}</p>
            </div>
            <div>
              <p className="text-lg sm:text-xl font-extrabold text-indigo-700 dark:text-indigo-400">14+</p>
              <p className="text-[11px] font-semibold text-stone-500 dark:text-stone-400 uppercase">{isHi ? 'निजी बैंक छात्रवृत्ति व पेंशन' : 'Bank CSR & Pensions'}</p>
            </div>
          </div>
        </div>

        {/* Demo Persona Quick-Bar */}
        <PersonaPresets
          language={language}
          onSelectPersona={handleSelectPersona}
          activePersonaId={selectedPersonaId}
        />

        {/* Dedicated State Government Schemes Quick-Access Hub */}
        {matchedResults === null && (
          <div className="mb-4 bg-gradient-to-r from-teal-50/90 via-emerald-50/60 to-cyan-50/70 dark:from-[#0a2322] dark:via-[#0c2233] dark:to-[#0a1829] border-2 border-teal-200/90 dark:border-teal-700/60 rounded-3xl p-4 sm:p-5 shadow-xs transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-md text-xl">
                  🏛️
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-sm sm:text-base font-extrabold text-stone-900 dark:text-white">
                      {isHi ? 'राज्य सरकारी योजनाएं (छात्र, अभिभावक व दादा-दादी/बुजुर्ग)' : 'State Government Schemes (Students, Parents & Grandparents)'}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-900 dark:text-teal-300 text-[10px] font-extrabold border border-teal-200 dark:border-teal-800">
                      {isHi ? 'UP • बिहार • दिल्ली • महाराष्ट्र • MP • राजस्थान • कर्नाटक • तमिलनाडु' : 'UP • Bihar • Delhi • Maharashtra • MP • Rajasthan • Karnataka • TN'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-slate-300 font-medium">
                    {isHi
                      ? 'मुफ्त टैबलेट व स्मार्टफोन, कोचिंग, लाड़ली बहना, माझी लाड़की बहिन, गृह लक्ष्मी, बुढ़ापा पेंशन (हरियाणा, दिल्ली, यूपी, बिहार) और चिरंजीवी स्वास्थ्य लाभ।'
                      : 'Free tablets, student scholarships, competitive coaching, Ladli Behna, Gruha Lakshmi, and old age pensions across all states.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleExploreState('students')}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#132238] hover:bg-teal-50 dark:hover:bg-teal-950/70 border border-teal-200 dark:border-teal-700/70 text-teal-900 dark:text-teal-200 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                >
                  🎓 {isHi ? 'छात्र (टैबलेट/कोचिंग)' : 'Students (Tablets)'}
                </button>
                <button
                  type="button"
                  onClick={() => handleExploreState('parents')}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#132238] hover:bg-emerald-50 dark:hover:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-700/70 text-emerald-900 dark:text-emerald-200 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                >
                  👨‍👩‍👧 {isHi ? 'माता-पिता (लाड़ली बहना)' : 'Parents & Families'}
                </button>
                <button
                  type="button"
                  onClick={() => handleExploreState('grandparents')}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#132238] hover:bg-amber-50 dark:hover:bg-amber-950/70 border border-amber-200 dark:border-amber-700/70 text-amber-900 dark:text-amber-200 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                >
                  👴 {isHi ? 'बुजुर्ग (बुढ़ापा पेंशन)' : 'Grandparents (Pensions)'}
                </button>
                <button
                  type="button"
                  onClick={() => handleExploreState('all')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-95 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <span>{isHi ? 'सभी राज्य योजनाएं' : 'View All State Schemes'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dedicated Private Sector & Bank Schemes Quick-Access Hub */}
        {matchedResults === null && (
          <div className="mb-6 bg-gradient-to-r from-indigo-50/90 via-purple-50/60 to-amber-50/70 dark:from-[#171438] dark:via-[#1c1735] dark:to-[#0c162b] border-2 border-indigo-200/90 dark:border-indigo-700/60 rounded-3xl p-4 sm:p-5 shadow-xs transition-colors">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md text-xl">
                  🏦
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-sm sm:text-base font-extrabold text-stone-900 dark:text-white">
                      {isHi ? 'निजी क्षेत्र एवं बैंक योजनाएं (SBI, HDFC, ICICI, Tata, Kotak)' : 'Private Sector & Bank Schemes (SBI, HDFC, ICICI, Tata)'}
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-300 text-[10px] font-extrabold border border-indigo-200 dark:border-indigo-800">
                      {isHi ? 'छात्रवृत्ति • पेंशन • चिकित्सा अनुदान' : 'Scholarships • Pensions • Healthcare'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 dark:text-slate-300 font-medium">
                    {isHi
                      ? 'छात्रों हेतु बैंक छात्रवृत्तियां, बुजुर्गों हेतु मासिक पेंशन आय, और परिवारों हेतु गंभीर बीमारी चिकित्सा अनुदान बिना किसी बाधा के खोजें।'
                      : 'Explore scholarships for students, monthly pensions for senior citizens, and emergency medical grants for families.'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => handleExplorePrivate('students')}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#151f38] hover:bg-indigo-50 dark:hover:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-700/70 text-indigo-900 dark:text-indigo-200 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                >
                  🎓 {isHi ? 'बैंक छात्रवृत्तियां' : 'Scholarships'}
                </button>
                <button
                  type="button"
                  onClick={() => handleExplorePrivate('elders')}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-[#151f38] hover:bg-amber-50 dark:hover:bg-amber-950/70 border border-amber-200 dark:border-amber-700/70 text-amber-900 dark:text-amber-200 text-xs font-bold transition-all shadow-2xs cursor-pointer"
                >
                  👴 {isHi ? 'वरिष्ठ पेंशन' : 'Senior Pensions'}
                </button>
                <button
                  type="button"
                  onClick={() => handleExplorePrivate('all')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                >
                  <span>{isHi ? 'सभी निजी योजनाएं देखें' : 'View All Private'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Persistent Saved Schemes Quick-Access Bar when not in results view */}
        {matchedResults === null && savedSchemeIds.length > 0 && (
          <div id="saved-schemes-preview" className="mb-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-[#231706] dark:via-[#1c1308] dark:to-[#0c162b] border-2 border-amber-300 dark:border-amber-700/60 rounded-3xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-600 text-white flex items-center justify-center shadow-xs shrink-0">
                <Bookmark className="w-5 h-5 fill-current" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-base font-extrabold text-stone-900 dark:text-white">
                    {isHi ? `आपके पास ${savedSchemeIds.length} पिन की गई योजनाएं हैं` : `You have ${savedSchemeIds.length} pinned scheme(s)`}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-amber-200 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 text-[10px] font-extrabold border border-amber-300 dark:border-amber-800">
                    localStorage
                  </span>
                </div>
                <p className="text-xs text-stone-600 dark:text-slate-300 font-medium">
                  {isHi
                    ? 'ये आपके ब्राउज़र में सुरक्षित हैं। आप पात्रता फॉर्म भरे बिना भी सीधे इन्हें देख सकते हैं।'
                    : 'Saved in your local storage for easy reference and CSC visits.'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  setMatchedResults([]);
                  setSelectedCategory('saved');
                  setTimeout(() => {
                    const el = document.getElementById('results-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }, 50);
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                {isHi ? 'सुरक्षित योजनाएं देखें' : 'View Saved Schemes'}
              </button>
              <button
                onClick={handleClearSaved}
                className="p-2 rounded-xl border border-amber-300 dark:border-slate-700 bg-white dark:bg-[#14203a] hover:bg-red-50 dark:hover:bg-red-950/40 text-stone-600 dark:text-slate-300 hover:text-red-700 dark:hover:text-red-400 text-xs font-medium transition-all cursor-pointer"
                title={isHi ? 'सूची खाली करें' : 'Clear all'}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Question Wizard Assessment */}
        <QuestionWizard
          language={language}
          initialProfile={initialFormValues}
          onSubmit={handleSubmitProfile}
          isLoading={isLoading}
          compactMode={cscMode}
        />

        {/* Results Section */}
        {matchedResults !== null && (
          <div id="results-section" className="space-y-6 pt-4">
            {/* Results Title & Action Bar */}
            <div className="bg-white dark:bg-[#0d172c] rounded-3xl p-5 sm:p-6 border border-stone-200 dark:border-slate-700/60 shadow-xs transition-colors space-y-5">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                      {selectedCategory === 'saved' || selectedSector === 'saved' 
                        ? savedResults.length 
                        : filteredResults.length}
                    </span>
                    <h2 className="text-lg sm:text-2xl font-extrabold text-stone-900 dark:text-slate-50">
                      {selectedCategory === 'saved' || selectedSector === 'saved'
                        ? (isHi ? 'आपकी सुरक्षित योजनाएं' : 'Your Saved Schemes')
                        : selectedSector === 'state_government'
                        ? (isHi ? 'राज्य सरकार की कल्याणकारी योजनाएं (छात्र, परिवार, बुजुर्ग)' : 'State Government Welfare Schemes')
                        : selectedSector === 'private'
                        ? (isHi ? 'निजी बैंक व ट्रस्ट कल्याणकारी योजनाएं' : 'Private Sector & Bank Initiatives')
                        : selectedSector === 'government'
                        ? (isHi ? 'सरकारी योजनाएं (केंद्रीय व राज्य)' : 'Government Welfare Schemes')
                        : t.results_heading}
                    </h2>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-500 dark:text-slate-400 font-medium">
                    {selectedCategory === 'saved' || selectedSector === 'saved'
                      ? (isHi ? 'आपके द्वारा बुकमार्क / पिन की गई सभी योजनाएं।' : 'All schemes bookmarked by you for fast reference.')
                      : selectedSector === 'state_government'
                      ? (isHi ? 'विभिन्न राज्यों द्वारा छात्रों (मुफ्त टैबलेट, छात्रवृत्ति), परिवारों व माताओं और बुजुर्गों (पेंशन) हेतु संचालित योजनाएं।' : 'Verified state government schemes for students (tablets, coaching), parents & families, and elderly pensions.')
                      : selectedSector === 'private'
                      ? (isHi ? 'एसबीआई, एचडीएफसी, आईसीआईसीआई, टाटा और रिलायंस द्वारा छात्रों, बुजुर्गों और परिवारों हेतु संचालित कार्यक्रम।' : 'Verified scholarships, elder pensions, and health grants from top private banks & CSR foundations.')
                      : selectedSector === 'government'
                      ? (isHi ? 'केंद्रीय एवं राज्य सरकार द्वारा आपके प्रोफाइल के अनुसार उपलब्ध कल्याणकारी लाभ।' : 'Central and State government welfare entitlements based on your verified criteria.')
                      : (isHi ? 'सरकारी एवं निजी क्षेत्र के सभी कल्याणकारी लाभ जो आपकी पात्रता के अनुकूल हैं।' : 'Government entitlements and private bank CSR initiatives matching your profile.')}
                  </p>
                </div>

                {/* Reset, Share & Subscribe Buttons */}
                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  <button
                    onClick={handleReset}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-[#14203a] text-stone-700 dark:text-slate-200 text-xs font-bold hover:bg-stone-100 dark:hover:bg-[#1a2948] transition-all cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t.reset_btn}</span>
                  </button>

                  <button
                    onClick={() => setIsShareModalOpen(true)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-[#14203a] text-stone-700 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-[#1a2948] text-xs font-bold transition-all shadow-xs cursor-pointer"
                  >
                    <Share2 className="w-3.5 h-3.5 text-stone-600 dark:text-slate-400" />
                    <span>{t.share_results_btn}</span>
                  </button>

                  <button
                    onClick={() => setIsSubscribeOpen(true)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
                    title="Get alerts when new matching schemes are launched"
                  >
                    <BellRing className="w-3.5 h-3.5" />
                    <span>{isHi ? 'नई योजनाओं का अलर्ट' : 'Get Scheme Alerts'}</span>
                  </button>
                </div>
              </div>

              {/* Prominent Sector Navigation Tabs Bar */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 bg-stone-100 dark:bg-[#091122] rounded-2xl border border-stone-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSector('all');
                    if (selectedCategory === 'saved') setSelectedCategory('all');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSector === 'all' && selectedCategory !== 'saved'
                      ? 'bg-white dark:bg-[#14233c] text-stone-900 dark:text-white shadow-sm border border-stone-200/90 dark:border-slate-700'
                      : 'text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-[#14233c]/60'
                  }`}
                >
                  <span>🌐 {isHi ? 'सभी योजनाएं' : 'All Benefits'}</span>
                  <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-stone-200 dark:bg-[#1a2846] font-extrabold text-stone-800 dark:text-slate-200">
                    {matchedResults.length}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedSector('state_government');
                    if (selectedCategory === 'saved') setSelectedCategory('all');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSector === 'state_government' && selectedCategory !== 'saved'
                      ? 'bg-teal-600 text-white shadow-sm ring-2 ring-teal-400/40'
                      : 'text-teal-950 dark:text-teal-300 bg-teal-50/70 dark:bg-teal-950/40 hover:bg-teal-100 dark:hover:bg-teal-900/50'
                  }`}
                >
                  <span>🏛️ {isHi ? 'राज्य सरकार' : 'State Govt'}</span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                    selectedSector === 'state_government' && selectedCategory !== 'saved'
                      ? 'bg-teal-800 text-white'
                      : 'bg-teal-200 dark:bg-teal-900 text-teal-900 dark:text-teal-200'
                  }`}>
                    {stateGovtCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedSector('government');
                    if (selectedCategory === 'saved') setSelectedCategory('all');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSector === 'government' && selectedCategory !== 'saved'
                      ? 'bg-white dark:bg-[#14233c] text-emerald-800 dark:text-emerald-300 shadow-sm border border-emerald-300 dark:border-emerald-700 ring-1 ring-emerald-400/20'
                      : 'text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-[#14233c]/60'
                  }`}
                >
                  <span>🇮🇳 {isHi ? 'सभी सरकारी योजनाएं' : 'All Govt Schemes'}</span>
                  <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-emerald-100 dark:bg-emerald-950/80 text-emerald-900 dark:text-emerald-300 font-extrabold">
                    {govtCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedSector('private');
                    setSelectedCategory('all');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSector === 'private' && selectedCategory !== 'saved'
                      ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-400/40'
                      : 'text-indigo-950 dark:text-indigo-300 bg-indigo-50/70 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'
                  }`}
                >
                  <span>🏦 {isHi ? 'निजी क्षेत्र व बैंक' : 'Private Sector & Banks'}</span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                    selectedSector === 'private' && selectedCategory !== 'saved'
                      ? 'bg-indigo-800 text-white'
                      : 'bg-indigo-200 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-200'
                  }`}>
                    {privateCount}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedSector('saved');
                    setSelectedCategory('saved');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedSector === 'saved' || selectedCategory === 'saved'
                      ? 'bg-amber-600 text-white shadow-sm ring-2 ring-amber-400/40'
                      : 'text-stone-600 dark:text-slate-300 hover:text-stone-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-[#14233c]/60'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5 fill-current" />
                  <span>{isHi ? 'सुरक्षित योजनाएं' : 'Saved'}</span>
                  <span className={`px-1.5 py-0.5 rounded-md text-[10px] font-extrabold ${
                    selectedSector === 'saved' || selectedCategory === 'saved'
                      ? 'bg-amber-800 text-white'
                      : 'bg-stone-200 dark:bg-[#1a2846]'
                  }`}>
                    {savedResults.length}
                  </span>
                </button>
              </div>

              {/* Dedicated State Government Hub Details & Sub-filters when in 'state_government' tab */}
              {selectedSector === 'state_government' && selectedCategory !== 'saved' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-teal-500/10 via-emerald-500/5 to-cyan-500/10 dark:from-[#082220] dark:via-[#091e2b] dark:to-[#0a1829] border border-teal-200 dark:border-teal-700/60 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
                        🏛️
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm sm:text-base font-extrabold text-stone-900 dark:text-white">
                            {isHi ? 'राज्य स्तरीय सरकारी कल्याणकारी योजनाएं' : 'State Government Welfare Initiatives'}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950/80 text-teal-900 dark:text-teal-300 text-[10px] font-extrabold border border-teal-200 dark:border-teal-800">
                            {isHi ? 'छात्र • माता-पिता • दादा-दादी (बुजुर्ग पेंशन)' : 'Students • Parents • Grandparents (Pensions)'}
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 dark:text-slate-300">
                          {isHi
                            ? 'विभिन्न राज्यों (उत्तर प्रदेश, बिहार, दिल्ली, महाराष्ट्र, एमपी, राजस्थान, कर्नाटक, तमिलनाडु, केरल, ओडिशा आदि) की प्रमुख योजनाएं।'
                            : 'Dedicated programs across Indian states for student education, maternal and family welfare, and elder monthly pensions.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sub-filter chips for State Government Section */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {[
                      { key: 'all', label: isHi ? 'सभी राज्य योजनाएं' : 'All State Schemes' },
                      { key: 'students', label: isHi ? '🎓 छात्र (मुफ्त टैबलेट, छात्रवृत्ति, कोचिंग)' : '🎓 Students (Tablets, Coaching)' },
                      { key: 'parents', label: isHi ? '👨‍👩‍👧 माता-पिता व परिवार (लाड़ली बहना, मातृत्व)' : '👨‍👩‍👧 Parents & Families' },
                      { key: 'grandparents', label: isHi ? '👴 दादा-दादी व बुजुर्ग (बुढ़ापा पेंशन, वृद्धावस्था)' : '👴 Grandparents (Pensions)' }
                    ].map((sub) => (
                      <button
                        key={sub.key}
                        type="button"
                        onClick={() => setStateSubfilter(sub.key as any)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          stateSubfilter === sub.key
                            ? 'bg-teal-600 text-white border-teal-700 shadow-2xs'
                            : 'bg-white dark:bg-[#14203a] text-stone-700 dark:text-slate-300 border-stone-200 dark:border-slate-700 hover:bg-teal-50 dark:hover:bg-teal-950/60'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dedicated Private Sector Hub Details & Sub-filters when in 'private' tab */}
              {selectedSector === 'private' && selectedCategory !== 'saved' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/5 to-amber-500/10 dark:from-[#171338] dark:via-[#191535] dark:to-[#0c162b] border border-indigo-200 dark:border-indigo-700/60 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
                        🏦
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm sm:text-base font-extrabold text-stone-900 dark:text-white">
                            {isHi ? 'निजी बैंक, कॉर्पोरेट ट्रस्ट व सीएसआर योजनाएं' : 'Private Sector, Bank & CSR Initiatives'}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/80 text-indigo-900 dark:text-indigo-300 text-[10px] font-extrabold border border-indigo-200 dark:border-indigo-800">
                            SBI • HDFC • ICICI • TATA • KOTAK • RELIANCE
                          </span>
                        </div>
                        <p className="text-xs text-stone-600 dark:text-slate-300">
                          {isHi
                            ? 'छात्रों हेतु बैंक छात्रवृत्तियां, बुजुर्गों हेतु मासिक पेंशन आय, और परिवारों हेतु गंभीर बीमारी चिकित्सा अनुदान।'
                            : 'Verified student scholarships, senior monthly pensions, and emergency healthcare grants.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Sub-filter chips for Private Section */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {[
                      { key: 'all', label: isHi ? 'सभी निजी योजनाएं' : 'All Private & Banks' },
                      { key: 'students', label: isHi ? '🎓 विद्यार्थी छात्रवृत्ति (SBI, HDFC, Tata, Kotak)' : '🎓 Student Scholarships' },
                      { key: 'elders', label: isHi ? '👴 वरिष्ठ नागरिक पेंशन व स्वास्थ्य (SBI, HDFC, ICICI)' : '👴 Senior Pensions & Care' },
                      { key: 'parents', label: isHi ? '👨‍👩‍👧 परिवार व माता-पिता सहायता' : '👨‍👩‍👧 Parents & Family Welfare' },
                      { key: 'healthcare', label: isHi ? '🏥 चिकित्सा अनुदान व इलाज' : '🏥 Medical Grants & Health' }
                    ].map((sub) => (
                      <button
                        key={sub.key}
                        type="button"
                        onClick={() => setPrivateSubfilter(sub.key as any)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                          privateSubfilter === sub.key
                            ? 'bg-indigo-600 text-white border-indigo-700 shadow-2xs'
                            : 'bg-white dark:bg-[#14203a] text-stone-700 dark:text-slate-300 border-stone-200 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-950/60'
                        }`}
                      >
                        {sub.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Category Filter Chips & Search Bar */}
              {(matchedResults.length > 0 || savedResults.length > 0) && (
                <div className="pt-3 border-t border-stone-100 dark:border-slate-800 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {/* All Schemes Chip */}
                      <button
                        key="all"
                        onClick={() => {
                          setSelectedCategory('all');
                          if (selectedSector === 'saved') setSelectedSector('all');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                          selectedCategory === 'all' && selectedSector !== 'saved'
                            ? 'bg-stone-900 dark:bg-amber-500 text-white dark:text-slate-950 font-bold border-stone-900 dark:border-amber-500 shadow-2xs'
                            : 'bg-stone-50 dark:bg-[#14203a] text-stone-700 dark:text-slate-300 border-stone-200 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-[#1a2948]'
                        }`}
                      >
                        {t.categories_filter.all}
                      </button>

                      {/* Saved Schemes Filter Chip */}
                      <button
                        key="saved"
                        onClick={() => {
                          setSelectedCategory('saved');
                          setSelectedSector('saved');
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 cursor-pointer ${
                          selectedCategory === 'saved' || selectedSector === 'saved'
                            ? 'bg-amber-600 text-white border-amber-700 shadow-2xs'
                            : 'bg-amber-50 dark:bg-[#20180a] text-amber-950 dark:text-amber-300 border-amber-300 dark:border-amber-700/70 hover:bg-amber-100 dark:hover:bg-[#281e0e]'
                        }`}
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${selectedCategory === 'saved' || selectedSector === 'saved' ? 'fill-current' : 'fill-amber-600 text-amber-700 dark:text-amber-400'}`} />
                        <span>{isHi ? `सुरक्षित (${savedSchemeIds.length})` : `Saved (${savedSchemeIds.length})`}</span>
                      </button>

                      {[
                        { key: 'education', label: t.categories_filter.education },
                        { key: 'social_security', label: t.categories_filter.social_security },
                        { key: 'pension', label: isHi ? 'पेंशन व सेवानिवृत्ति' : 'Pension & Retirement' },
                        { key: 'healthcare', label: t.categories_filter.healthcare },
                        { key: 'agriculture', label: t.categories_filter.agriculture },
                        { key: 'women_child', label: t.categories_filter.women_child },
                        { key: 'business_employment', label: t.categories_filter.business_employment },
                        { key: 'housing', label: t.categories_filter.housing },
                        { key: 'private_sector', label: isHi ? '🏦 निजी बैंक व ट्रस्ट' : '🏦 Private & Banks' }
                      ].map((cat) => (
                        <button
                          key={cat.key}
                          onClick={() => {
                            setSelectedCategory(cat.key);
                            if (cat.key === 'private_sector') setSelectedSector('private');
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                            selectedCategory === cat.key
                              ? 'bg-stone-900 dark:bg-amber-500 text-white dark:text-slate-950 font-bold border-stone-900 dark:border-amber-500 shadow-2xs'
                              : 'bg-stone-50 dark:bg-[#14203a] text-stone-700 dark:text-slate-300 border-stone-200 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-[#1a2948]'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative sm:w-64">
                      <Search className="w-3.5 h-3.5 text-stone-400 dark:text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={isHi ? 'योजना या बैंक का नाम खोजें...' : 'Search scheme or bank...'}
                        className="w-full pl-8 pr-3 py-1.5 bg-stone-50 dark:bg-[#14203a] rounded-xl border border-stone-200 dark:border-slate-700 text-stone-900 dark:text-white placeholder:text-stone-400 dark:placeholder:text-slate-400 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dedicated Saved Schemes Section (Pinned in Results) */}
            {savedSchemeIds.length > 0 && selectedCategory !== 'saved' && (
              <div id="saved-schemes-section" className="bg-amber-50/70 dark:bg-[#0d172c] border-2 border-amber-300 dark:border-amber-700/60 rounded-3xl p-5 sm:p-6 shadow-xs scroll-mt-24 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-200/90 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-xs shrink-0">
                      <Bookmark className="w-5 h-5 fill-current" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base sm:text-lg font-extrabold text-stone-900 dark:text-white">
                          {isHi ? 'आपकी पिन / सुरक्षित की गई योजनाएं' : 'Your Pinned / Saved Schemes'}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-amber-600 text-white text-xs font-bold">
                          {savedSchemeIds.length} {isHi ? 'सुरक्षित' : 'Saved'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-slate-300 font-medium">
                        {isHi
                          ? 'ब्राउज़र में स्थानीय रूप से सुरक्षित (localStorage)। आप इन्हें बाद में भी देख सकते हैं।'
                          : 'Saved locally in your browser (localStorage) for easy comparison and CSC visits.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleClearSaved}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-amber-300 dark:border-slate-700 bg-white dark:bg-[#14203a] hover:bg-red-50 dark:hover:bg-red-950/40 hover:text-red-700 dark:hover:text-red-400 text-xs font-semibold text-stone-700 dark:text-slate-300 transition-colors shadow-2xs cursor-pointer"
                      title="Clear all saved schemes"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{isHi ? 'सूची खाली करें' : 'Clear All'}</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {savedResults.map((result, idx) => (
                    <SchemeCard
                      key={`saved-panel-${result.scheme.id}`}
                      result={result}
                      language={language}
                      onOpenDetails={(r) => setActiveModalScheme(r)}
                      sourceType={sourceType}
                      isSaved={true}
                      onToggleSave={handleToggleSave}
                      index={idx}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Scheme Cards Grid */}
            {filteredResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredResults.map((result, idx) => (
                  <SchemeCard
                    key={`${selectedCategory}-${result.scheme.id}`}
                    result={result}
                    language={language}
                    onOpenDetails={(r) => setActiveModalScheme(r)}
                    sourceType={sourceType}
                    isSaved={savedSchemeIds.includes(result.scheme.id)}
                    onToggleSave={handleToggleSave}
                    index={idx}
                  />
                ))}
              </div>
            ) : selectedCategory === 'saved' ? (
              <div className="bg-white dark:bg-[#0d172c] rounded-3xl p-8 border border-stone-200 dark:border-slate-700/60 text-center max-w-lg mx-auto shadow-xs space-y-3">
                <Bookmark className="w-10 h-10 text-amber-500 mx-auto" />
                <h3 className="text-base font-bold text-stone-900 dark:text-white">
                  {isHi ? 'अभी तक कोई योजना सुरक्षित नहीं की गई है' : 'No Saved Schemes Yet'}
                </h3>
                <p className="text-xs text-stone-500 dark:text-slate-400 leading-relaxed">
                  {isHi
                    ? 'किसी भी योजना कार्ड के ऊपर दिए गए बुकमार्क (🔖) बटन पर क्लिक करके उसे यहां पिन करें।'
                    : 'Click the bookmark icon on any scheme card to save it here for fast reference.'}
                </p>
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="px-4 py-2 bg-stone-900 dark:bg-amber-500 hover:bg-stone-800 dark:hover:bg-amber-600 text-white dark:text-slate-950 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  {isHi ? 'सभी योजनाएं देखें' : 'View All Schemes'}
                </button>
              </div>
            ) : (
              <div className="bg-white dark:bg-[#0d172c] rounded-3xl p-8 border border-stone-200 dark:border-slate-700/60 text-center max-w-lg mx-auto shadow-xs">
                <Compass className="w-12 h-12 text-stone-400 dark:text-slate-400 mx-auto mb-3" />
                <h3 className="text-base font-bold text-stone-900 dark:text-white mb-1">
                  {t.no_matches_title}
                </h3>
                <p className="text-xs text-stone-500 dark:text-slate-400 mb-4 leading-relaxed">
                  {t.no_matches_desc}
                </p>
                <div className="p-4 bg-stone-50 dark:bg-[#14203a] rounded-2xl border border-stone-200 dark:border-slate-700 text-left space-y-2 text-xs text-stone-700 dark:text-slate-200">
                  <p className="font-bold">{t.csc_advice_title}</p>
                  <p>1. {t.csc_step_1}</p>
                  <p>2. {t.csc_step_2}</p>
                  <p>3. {t.csc_step_3}</p>
                </div>
              </div>
            )}

            {/* Nearly Eligible Section (US-8) */}
            <NearlyEligibleSection
              schemes={nearlyEligible}
              language={language}
              onOpenDetails={(r) => setActiveModalScheme(r)}
              savedSchemeIds={savedSchemeIds}
              onToggleSave={handleToggleSave}
            />

            {/* Email Subscription Banner */}
            <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-emerald-500/10 dark:from-amber-950/30 dark:via-stone-900 dark:to-emerald-950/30 border border-amber-300/80 dark:border-amber-800/60 rounded-3xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-11 h-11 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <BellRing className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100">
                    {isHi
                      ? 'क्या आप भविष्य में नई योजनाओं की जानकारी सीधे पाना चाहते हैं?'
                      : 'Want alerts when new matching government schemes are launched?'}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                    {isHi
                      ? `जब भी ${activeProfile?.state || 'भारत'} या आपके वर्ग के लिए नई छात्रवृत्ति, सब्सिडी या पेंशन शुरू होगी, हम आपको सूचित करेंगे।`
                      : `Receive instant notifications for newly announced subsidies, grants, and pensions tailored to your profile.`}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsSubscribeOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 dark:bg-amber-600 hover:bg-stone-800 dark:hover:bg-amber-700 text-white text-xs sm:text-sm font-bold transition-all shadow-md shrink-0"
              >
                <span>{isHi ? 'निःशुल्क ईमेल अलर्ट सक्रिय करें' : 'Subscribe for Free Alerts'}</span>
                <ChevronRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          </div>
        )}

        {/* FAQs Component */}
        <FAQSection language={language} />
      </main>

      {/* Scheme Detail Modal */}
      <SchemeDetailModal
        result={activeModalScheme}
        language={language}
        onClose={() => setActiveModalScheme(null)}
        isSaved={activeModalScheme ? savedSchemeIds.includes(activeModalScheme.scheme.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* Email Subscription Modal */}
      <EmailSubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
        language={language}
        profile={activeProfile}
      />

      {/* Share / Print Modal */}
      {activeProfile && matchedResults && (
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
          language={language}
          results={matchedResults}
          profile={activeProfile}
        />
      )}

      {/* Methodology Modal */}
      <MethodologyModal
        isOpen={isMethodologyOpen}
        onClose={() => setIsMethodologyOpen(false)}
        language={language}
      />

      {/* Hidden Printable Summary */}
      {activeProfile && matchedResults && (
        <PrintSummaryView
          language={language}
          results={matchedResults}
          profile={activeProfile}
        />
      )}

      {/* Footer */}
      <footer className="bg-white dark:bg-[#0d172c] border-t border-stone-200 dark:border-slate-800 py-8 px-4 text-center mt-12 text-xs text-stone-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-900 dark:text-slate-100 text-sm">
              {t.app_name}
            </span>
            <span>•</span>
            <span>{isHi ? 'नागरिक कल्याण सूचना मंच' : 'Citizen Welfare Information Platform'}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-stone-600 dark:text-slate-400">
            <a
              href="https://www.myscheme.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 dark:hover:text-slate-100 transition-colors"
            >
              myScheme.gov.in
            </a>
            <span>•</span>
            <a
              href="https://www.india.gov.in"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-stone-900 dark:hover:text-slate-100 transition-colors"
            >
              National Portal of India
            </a>
            <span>•</span>
            <button
              onClick={() => {
                const el = document.getElementById('faqs-section');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className="hover:text-stone-900 dark:hover:text-slate-100 transition-colors"
            >
              {isHi ? 'अक्सर पूछे जाने वाले प्रश्न (FAQs)' : 'FAQs & Helplines'}
            </button>
            <span>•</span>
            <button
              onClick={() => setIsMethodologyOpen(true)}
              className="hover:text-stone-900 dark:hover:text-slate-100 transition-colors"
            >
              {isHi ? 'नियम व गोपनीयता' : 'Rules & Privacy'}
            </button>
          </div>

          <p className="text-[11px] text-stone-400 dark:text-stone-500">
            © 2026 YojanaMitra. {isHi ? 'सार्वजनिक हित में विकसित' : 'Built for citizen empowerment.'}
          </p>
        </div>
      </footer>

      {/* Scroll to Top Floating Action Button */}
      <button
        type="button"
        onClick={handleScrollToTop}
        aria-label={isHi ? 'पृष्ठ के शीर्ष पर जाएं' : 'Scroll to top'}
        title={isHi ? 'वापस ऊपर जाएं' : 'Scroll to top'}
        className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 px-3.5 py-3 rounded-full bg-amber-600 hover:bg-amber-700 active:scale-95 text-white font-bold text-xs sm:text-sm shadow-xl shadow-amber-600/35 border border-amber-400/40 backdrop-blur-xs transition-all duration-300 ease-out group cursor-pointer ${
          showScrollTop
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-6 scale-90 pointer-events-none'
        }`}
      >
        <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5] transition-transform duration-200 group-hover:-translate-y-1" />
        <span className="hidden sm:inline font-extrabold tracking-wide">
          {isHi ? 'ऊपर जाएं' : 'Top'}
        </span>
      </button>
    </div>
  );
}
