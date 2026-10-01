import React from 'react';
import { Languages, Users, Sparkles, BookOpen, ShieldCheck, HelpCircle, Bookmark, Sun, Moon } from 'lucide-react';
import { TRANSLATIONS } from '../data/translations.ts';

interface HeaderProps {
  language: 'en' | 'hi';
  onToggleLanguage: () => void;
  cscMode: boolean;
  onToggleCscMode: () => void;
  onOpenMethodology: () => void;
  onOpenSubscribe: () => void;
  onScrollToFaqs?: () => void;
  savedCount?: number;
  onScrollToSaved?: () => void;
  theme?: 'light' | 'dark';
  onToggleTheme?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onToggleLanguage,
  cscMode,
  onToggleCscMode,
  onOpenMethodology,
  onOpenSubscribe,
  onScrollToFaqs,
  savedCount = 0,
  onScrollToSaved,
  theme = 'light',
  onToggleTheme
}) => {
  const t = TRANSLATIONS[language];

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-slate-800 shadow-xs transition-colors">
      {/* Top subtle tricolor banner */}
      <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-stone-200 dark:via-stone-700 to-emerald-600"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-md shadow-amber-500/20 shrink-0">
              <span className="font-bold text-lg font-serif tracking-wider">य</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
                  {t.app_name}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  {language === 'hi' ? 'सत्यापित पोर्टल' : 'Official Verified'}
                </span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 hidden md:block">
                {t.app_tagline}
              </p>
            </div>
          </div>

          {/* Action Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Toggle (Dark / Light) with smooth rotation animation and subtle moon-to-sun transition */}
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                className="relative overflow-hidden p-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold rounded-xl transition-all duration-300 border border-stone-200 dark:border-slate-700/80 bg-stone-100/90 dark:bg-slate-800 text-stone-700 dark:text-amber-400 hover:bg-stone-200/80 dark:hover:bg-slate-700 shadow-2xs flex items-center gap-2 cursor-pointer active:scale-95 group/theme-btn select-none hover:shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/50"
                title={theme === 'dark' ? (language === 'hi' ? 'लाइट मोड चालू करें' : 'Switch to Light Mode') : (language === 'hi' ? 'डार्क मोड चालू करें' : 'Switch to Dark Mode')}
                aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <div className="relative w-4 h-4 flex items-center justify-center shrink-0">
                  {/* Sun Icon (Rotates from 180deg to 0deg with spring scale & amber aura in dark mode) */}
                  <Sun
                    className={`w-3.5 h-3.5 text-amber-400 absolute transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                      theme === 'dark'
                        ? 'rotate-0 scale-100 opacity-100 drop-shadow-[0_0_8px_rgba(251,191,36,0.65)]'
                        : 'rotate-180 scale-0 opacity-0 pointer-events-none'
                    }`}
                  />
                  {/* Moon Icon (Rotates from -180deg to 0deg with gentle scale in light mode) */}
                  <Moon
                    className={`w-3.5 h-3.5 text-stone-600 dark:text-stone-400 absolute transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                      theme === 'dark'
                        ? '-rotate-180 scale-0 opacity-0 pointer-events-none'
                        : 'rotate-0 scale-100 opacity-100 group-hover/theme-btn:-rotate-12 transition-transform'
                    }`}
                  />
                </div>
                <span className="hidden xl:inline text-stone-700 dark:text-slate-200 font-bold transition-colors duration-300">
                  {language === 'hi' ? (theme === 'dark' ? 'लाइट' : 'डार्क') : (theme === 'dark' ? 'Light' : 'Dark')}
                </span>
              </button>
            )}

            {/* Saved Schemes Quick Button */}
            {savedCount > 0 && onScrollToSaved && (
              <button
                onClick={onScrollToSaved}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-amber-950 dark:text-amber-200 bg-amber-100 dark:bg-amber-950/60 hover:bg-amber-200 dark:hover:bg-amber-900/60 border border-amber-300 dark:border-amber-700 rounded-lg transition-colors shadow-2xs"
                title="View saved schemes"
              >
                <Bookmark className="w-3.5 h-3.5 fill-amber-600 text-amber-700 dark:fill-amber-400 dark:text-amber-400" />
                <span className="hidden xs:inline">{language === 'hi' ? 'सुरक्षित' : 'Saved'}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-600 dark:bg-amber-500 text-white text-[10px] font-extrabold">
                  {savedCount}
                </span>
              </button>
            )}

            {/* Email Alerts Subscribe Button */}
            <button
              onClick={onOpenSubscribe}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-bold text-amber-900 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/50 border border-amber-300 dark:border-amber-800 rounded-lg transition-colors shadow-2xs"
              title="Subscribe for updates when new matching schemes are launched"
            >
              <span className="text-xs">🔔</span>
              <span className="hidden xs:inline">{language === 'hi' ? 'ईमेल अलर्ट' : 'Get Alerts'}</span>
            </button>

            {/* Methodology / How it works */}
            <button
              onClick={onOpenMethodology}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors border border-stone-200 dark:border-stone-800"
              title="Methodology & Accuracy"
            >
              <BookOpen className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
              <span>{language === 'hi' ? 'कार्यप्रणाली' : 'How It Works'}</span>
            </button>

            {/* FAQs navigation button */}
            {onScrollToFaqs && (
              <button
                onClick={onScrollToFaqs}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors border border-stone-200 dark:border-stone-800"
                title="Frequently Asked Questions & Helplines"
              >
                <HelpCircle className="w-3.5 h-3.5 text-stone-500 dark:text-stone-400" />
                <span>{language === 'hi' ? 'प्रश्न-उत्तर (FAQs)' : 'FAQs'}</span>
              </button>
            )}

            {/* CSC Operator Mode Switch */}
            <button
              onClick={onToggleCscMode}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border ${
                cscMode
                  ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700 ring-2 ring-amber-400/30'
                  : 'bg-stone-50 dark:bg-stone-800 text-stone-600 dark:text-stone-300 border-stone-200 dark:border-stone-700 hover:bg-stone-100 dark:hover:bg-stone-750'
              }`}
              title="Toggle fast evaluation mode for CSC operators / volunteers"
            >
              <Users className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span className="hidden sm:inline">{language === 'hi' ? 'सीएससी मोड' : 'CSC Mode'}</span>
            </button>

            {/* Language Switch Toggle */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-stone-900 dark:bg-stone-800 text-white hover:bg-stone-800 dark:hover:bg-stone-700 border border-transparent dark:border-stone-700 transition-all shadow-xs"
              aria-label="Toggle Language"
            >
              <Languages className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.switch_lang_btn}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
