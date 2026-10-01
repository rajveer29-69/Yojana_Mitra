import React from 'react';
import { MatchedSchemeResult } from '../data/schemes.ts';
import { TRANSLATIONS } from '../data/translations.ts';
import { Sparkles, CheckCircle2, ChevronRight, FileText, Check, ShieldCheck, MapPin, Bookmark } from 'lucide-react';

interface SchemeCardProps {
  result: MatchedSchemeResult;
  language: 'en' | 'hi';
  onOpenDetails: (result: MatchedSchemeResult) => void;
  sourceType?: 'gemini' | 'template';
  isSaved?: boolean;
  onToggleSave?: (schemeId: string) => void;
  index?: number;
}

export const SchemeCard: React.FC<SchemeCardProps> = ({
  result,
  language,
  onOpenDetails,
  sourceType = 'gemini',
  isSaved = false,
  onToggleSave,
  index = 0
}) => {
  const { scheme, why_you_qualify, match_reasons } = result;
  const t = TRANSLATIONS[language];
  const isHi = language === 'hi';

  const title = isHi ? scheme.name_hi : scheme.name;
  const ministry = isHi ? scheme.ministry_hi : scheme.ministry;
  const benefitSummary = isHi ? scheme.benefit_summary_hi : scheme.benefit_summary;
  const benefitTag = isHi ? scheme.benefit_amount_tag_hi : scheme.benefit_amount_tag;

  // Category color theme
  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'agriculture':
        return { badge: 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800', dot: 'bg-emerald-500' };
      case 'healthcare':
        return { badge: 'bg-rose-100 dark:bg-rose-950/60 text-rose-900 dark:text-rose-300 border-rose-300 dark:border-rose-800', dot: 'bg-rose-500' };
      case 'education':
        return { badge: 'bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 border-blue-300 dark:border-blue-800', dot: 'bg-blue-500' };
      case 'women_child':
        return { badge: 'bg-purple-100 dark:bg-purple-950/60 text-purple-900 dark:text-purple-300 border-purple-300 dark:border-purple-800', dot: 'bg-purple-500' };
      case 'business_employment':
        return { badge: 'bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800', dot: 'bg-amber-500' };
      case 'housing':
        return { badge: 'bg-orange-100 dark:bg-orange-950/60 text-orange-900 dark:text-orange-300 border-orange-300 dark:border-orange-800', dot: 'bg-orange-500' };
      case 'pension':
        return { badge: 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800', dot: 'bg-indigo-500' };
      default:
        return { badge: 'bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-300 border-stone-300 dark:border-stone-700', dot: 'bg-stone-500' };
    }
  };

  const theme = getCategoryTheme(scheme.category);

  return (
    <div
      style={{
        animationDelay: `${Math.min(index * 50, 400)}ms`
      }}
      className={`animate-scheme-card bg-white dark:bg-[#0d172c] rounded-3xl border transition-all duration-200 ease-out p-5 sm:p-6 flex flex-col justify-between group relative transform-gpu hover:-translate-y-1.5 will-change-transform ${
        isSaved
          ? 'border-amber-400 dark:border-amber-500/80 ring-2 ring-amber-400/20 shadow-md hover:shadow-xl hover:shadow-amber-500/15 hover:ring-amber-400/40 hover:border-amber-500 dark:hover:border-amber-400'
          : 'border-stone-200/90 dark:border-slate-700/60 shadow-xs hover:shadow-xl hover:shadow-stone-200/70 dark:hover:shadow-slate-950/80 hover:border-amber-400/80 dark:hover:border-amber-500/60 dark:hover:bg-[#111e38]'
      }`}
    >
      <div>
        {/* Top Badges & Pin Action */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${theme.badge} transition-transform duration-200 group-hover:scale-[1.02]`}>
              <span className={`w-1.5 h-1.5 rounded-full ${theme.dot} transition-transform duration-200 group-hover:scale-125`}></span>
              {t.categories_filter[scheme.category] || scheme.category}
            </span>

            {/* Sector / Provider Badge */}
            {scheme.sector === 'private' ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-indigo-900 dark:text-indigo-200 bg-indigo-50 dark:bg-indigo-950/70 px-2 py-0.5 rounded-md border border-indigo-200 dark:border-indigo-800 shadow-2xs">
                <span>🏦</span>
                <span>{isHi ? 'निजी बैंक / ट्रस्ट' : 'Private Bank / CSR'}</span>
              </span>
            ) : scheme.provider_type === 'state_government' || (!scheme.eligibility.states.includes('all')) ? (
              <span className="inline-flex items-center text-[10px] font-bold text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/70 px-1.5 py-0.5 rounded-md border border-teal-300 dark:border-teal-800">
                🏛️ {scheme.eligibility.states[0] || (isHi ? 'राज्य सरकार' : 'State Govt')}
              </span>
            ) : (
              <span className="inline-flex items-center text-[10px] font-semibold text-stone-600 dark:text-slate-300 bg-stone-100 dark:bg-[#14203a] px-1.5 py-0.5 rounded-md border border-stone-200 dark:border-slate-700">
                🇮🇳 {isHi ? 'केंद्र सरकार' : 'Central Govt'}
              </span>
            )}

            {/* Target Group Badge (Students / Elders / Parents) */}
            {scheme.target_group === 'student' && (
              <span className="inline-flex items-center text-[10px] font-bold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-1.5 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
                🎓 {isHi ? 'छात्रवृत्ति' : 'Students'}
              </span>
            )}
            {scheme.target_group === 'elder' && (
              <span className="inline-flex items-center text-[10px] font-bold text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-1.5 py-0.5 rounded-md border border-amber-200 dark:border-amber-800">
                👴 {isHi ? 'वरिष्ठ नागरिक' : 'Seniors'}
              </span>
            )}
            {scheme.target_group === 'parent' && (
              <span className="inline-flex items-center text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                👨‍👩‍👧 {isHi ? 'परिवार' : 'Family'}
              </span>
            )}

            {scheme.csc_supported && (
              <span className="inline-flex items-center text-[10px] font-bold text-stone-600 dark:text-slate-300 bg-stone-100 dark:bg-[#14203a] px-2 py-0.5 rounded-md border border-stone-200 dark:border-slate-700">
                {isHi ? 'सीएससी उपलब्ध' : 'CSC Apply'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-1 bg-amber-50 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 font-extrabold text-xs sm:text-sm rounded-xl border border-amber-200/80 dark:border-amber-800 shadow-2xs transition-all duration-200 group-hover:scale-105 group-hover:bg-amber-100 dark:group-hover:bg-amber-900/50 group-hover:border-amber-300 dark:group-hover:border-amber-700">
              {benefitTag}
            </span>

            {/* Pin / Save Scheme Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleSave?.(scheme.id);
              }}
              className={`p-1.5 rounded-xl border transition-all duration-150 active:scale-90 hover:scale-110 cursor-pointer ${
                isSaved
                  ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700 shadow-2xs hover:bg-amber-200 dark:hover:bg-amber-900'
                  : 'bg-stone-50 dark:bg-[#14203a] text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-[#1a2846] border-stone-200 dark:border-slate-700'
              }`}
              title={isSaved ? (isHi ? 'सुरक्षित सूची से हटाएं' : 'Unpin scheme') : (isHi ? 'योजना पिन/सुरक्षित करें' : 'Pin/Save scheme')}
              aria-label="Save scheme"
            >
              <Bookmark className={`w-4 h-4 transition-transform duration-150 ${isSaved ? 'fill-amber-600 text-amber-700 dark:fill-amber-400 dark:text-amber-400 scale-105' : 'group-hover:text-stone-600 dark:group-hover:text-stone-300'}`} />
            </button>
          </div>
        </div>

        {/* Scheme Title & Ministry */}
        <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-slate-50 mb-1 leading-snug group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors duration-150">
          {title}
        </h3>
        <p className="text-xs text-stone-600 dark:text-slate-400 font-medium mb-3">
          {ministry}
        </p>

        {/* Benefit Summary Description */}
        <p className="text-xs sm:text-sm text-stone-700 dark:text-slate-300 mb-4 leading-relaxed line-clamp-2">
          {benefitSummary}
        </p>

        {/* "Why You Qualify" Explanation Callout */}
        <div className="bg-amber-50/70 dark:bg-[#14203a] border border-amber-200/90 dark:border-amber-800/60 rounded-2xl p-3.5 mb-4 transition-all duration-200 group-hover:border-amber-300 dark:group-hover:border-amber-600/70 group-hover:bg-amber-50/90 dark:group-hover:bg-[#172544]">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-900 dark:text-amber-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />
              <span>{t.why_qualify_badge}</span>
            </div>
            <span className="text-[10px] font-semibold text-amber-800 dark:text-amber-300 bg-amber-100/80 dark:bg-amber-950/80 px-2 py-0.5 rounded-md transition-colors duration-200">
              {sourceType === 'gemini' ? t.ai_explained_badge : t.rule_verified_badge}
            </span>
          </div>
          <p className="text-xs text-stone-900 dark:text-slate-200 font-medium leading-relaxed">
            {why_you_qualify}
          </p>
        </div>

        {/* Rule match checkmarks (first 3) */}
        <div className="space-y-1.5 mb-4">
          <span className="text-[11px] font-bold text-stone-700 dark:text-slate-400 uppercase tracking-wider block">
            {t.rule_reasons_title}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {match_reasons.slice(0, 3).map((r, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-900 dark:text-emerald-300 bg-emerald-50/90 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/80 transition-colors duration-150 hover:bg-emerald-100 dark:hover:bg-emerald-950/90"
              >
                <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="line-clamp-1">{isHi ? r.text_hi : r.text_en}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 border-t border-stone-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
        <span className="text-[11px] text-stone-600 dark:text-slate-400 font-medium flex items-center gap-1">
          <FileText className="w-3 h-3 text-stone-400 dark:text-slate-500" />
          <span>{scheme.documents.length} {isHi ? 'दस्तावेज आवश्यक' : 'docs required'}</span>
        </span>

        <button
          onClick={() => onOpenDetails(result)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 dark:bg-amber-500 dark:hover:bg-amber-600 text-white dark:text-slate-950 font-extrabold text-xs hover:bg-stone-800 transition-all duration-150 shadow-xs hover:shadow-md active:scale-95 group/btn cursor-pointer"
        >
          <span>{t.view_details_btn}</span>
          <ChevronRight className="w-3.5 h-3.5 text-amber-300 dark:text-slate-950 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </div>
  );
};
