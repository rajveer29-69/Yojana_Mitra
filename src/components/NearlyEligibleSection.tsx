import React, { useState } from 'react';
import { MatchedSchemeResult } from '../data/schemes.ts';
import { TRANSLATIONS } from '../data/translations.ts';
import { AlertCircle, ChevronDown, ChevronUp, ArrowRight, Bookmark } from 'lucide-react';

interface NearlyEligibleSectionProps {
  schemes: MatchedSchemeResult[];
  language: 'en' | 'hi';
  onOpenDetails: (result: MatchedSchemeResult) => void;
  savedSchemeIds?: string[];
  onToggleSave?: (schemeId: string) => void;
}

export const NearlyEligibleSection: React.FC<NearlyEligibleSectionProps> = ({
  schemes,
  language,
  onOpenDetails,
  savedSchemeIds = [],
  onToggleSave
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const t = TRANSLATIONS[language];
  const isHi = language === 'hi';

  if (!schemes || schemes.length === 0) return null;

  return (
    <div className="bg-amber-50/50 dark:bg-[#0d172c] border border-amber-300/80 dark:border-amber-800/80 rounded-3xl p-5 sm:p-6 mb-8 shadow-xs transition-colors">
      <div
        className="flex items-center justify-between gap-3 cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
            <AlertCircle className="w-5 h-5 text-amber-700 dark:text-amber-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base font-extrabold text-amber-950 dark:text-amber-200">
                {t.nearly_eligible_title}
              </h3>
              <span className="text-xs font-bold bg-amber-200 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 px-2 py-0.5 rounded-full border border-amber-300 dark:border-amber-800/60">
                {schemes.length}
              </span>
            </div>
            <p className="text-xs text-amber-800 dark:text-amber-400 font-medium">
              {t.nearly_eligible_sub}
            </p>
          </div>
        </div>

        <button
          type="button"
          className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-[#1a2846] hover:bg-amber-200 dark:hover:bg-[#24355a] text-amber-900 dark:text-amber-300 flex items-center justify-center transition-all shrink-0 border border-transparent dark:border-slate-700"
          aria-label="Toggle section"
        >
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-5 space-y-3 pt-4 border-t border-amber-200 dark:border-slate-800">
          {schemes.map((res) => {
            const missingCondition = res.missing_conditions?.[0];
            const title = isHi ? res.scheme.name_hi : res.scheme.name;
            const benefitTag = isHi ? res.scheme.benefit_amount_tag_hi : res.scheme.benefit_amount_tag;
            const isSaved = savedSchemeIds.includes(res.scheme.id);

            return (
              <div
                key={res.scheme.id}
                className="bg-white dark:bg-[#14203a] rounded-2xl p-4 border border-amber-200/90 dark:border-slate-700/60 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-900 dark:text-slate-100 line-clamp-1">
                      {title}
                    </span>
                    <span className="text-[11px] font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/70 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-800/40">
                      {benefitTag}
                    </span>
                  </div>

                  {missingCondition && (
                    <p className="text-xs text-stone-600 dark:text-slate-400 font-medium flex items-center gap-1.5">
                      <span className="text-red-700 dark:text-red-400 font-bold">{t.missing_label}</span>
                      <span>{isHi ? missingCondition.text_hi : missingCondition.text_en}</span>
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {onToggleSave && (
                    <button
                      type="button"
                      onClick={() => onToggleSave(res.scheme.id)}
                      className={`p-1.5 rounded-lg border transition-all ${
                        isSaved
                          ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700'
                          : 'bg-stone-50 dark:bg-[#1a2846] text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-[#24355a] border-stone-200 dark:border-slate-700'
                      }`}
                      title={isSaved ? (isHi ? 'सुरक्षित सूची से हटाएं' : 'Unpin scheme') : (isHi ? 'पिन/सुरक्षित करें' : 'Pin scheme')}
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-600 text-amber-700 dark:fill-amber-400 dark:text-amber-400' : ''}`} />
                    </button>
                  )}

                  <button
                    onClick={() => onOpenDetails(res)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-300 hover:text-amber-950 dark:hover:text-amber-200 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-[#1a2846] hover:bg-amber-100 dark:hover:bg-[#24355a] border border-amber-200 dark:border-slate-700 transition-all cursor-pointer"
                  >
                    <span>{isHi ? 'विवरण देखें' : 'View Requirements'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
