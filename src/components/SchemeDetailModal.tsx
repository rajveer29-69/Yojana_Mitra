import React, { useState } from 'react';
import { MatchedSchemeResult } from '../data/schemes.ts';
import { TRANSLATIONS } from '../data/translations.ts';
import { X, CheckSquare, Square, ExternalLink, Printer, ShieldCheck, MapPin, Building, Calendar, AlertCircle, Bookmark, Download, FileText, Check } from 'lucide-react';

interface SchemeDetailModalProps {
  result: MatchedSchemeResult | null;
  language: 'en' | 'hi';
  onClose: () => void;
  isSaved?: boolean;
  onToggleSave?: (schemeId: string) => void;
}

export const SchemeDetailModal: React.FC<SchemeDetailModalProps> = ({
  result,
  language,
  onClose,
  isSaved = false,
  onToggleSave
}) => {
  if (!result) return null;

  const { scheme, why_you_qualify, match_reasons } = result;
  const t = TRANSLATIONS[language];
  const isHi = language === 'hi';

  const title = isHi ? scheme.name_hi : scheme.name;
  const ministry = isHi ? scheme.ministry_hi : scheme.ministry;
  const documents = isHi ? scheme.documents_hi : scheme.documents;
  const steps = isHi ? scheme.apply_steps_hi : scheme.apply_steps;

  // Interactive Document Checklist state
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({});
  const [downloaded, setDownloaded] = useState<boolean>(false);

  const toggleDoc = (index: number) => {
    setCheckedDocs(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const readyCount = Object.values(checkedDocs).filter(Boolean).length;
  const totalDocs = documents.length;
  const readinessPercent = Math.round((readyCount / totalDocs) * 100);

  const handleDownloadChecklist = () => {
    try {
      const content = `================================================================================
YOJANAMITRA (योजनामित्र) - OFFICIAL SCHEME DOCUMENT CHECKLIST & APPLICATION GUIDE
================================================================================
Scheme Name:        ${scheme.name}
हिंदी में नाम:      ${scheme.name_hi}
Category:           ${scheme.category.toUpperCase()}
Ministry / Dept:    ${scheme.ministry} (${scheme.ministry_hi})
Financial Benefit:  ${scheme.benefit_amount_tag} (${scheme.benefit_amount_tag_hi})
Official Portal:    ${scheme.source}
Application Portal: ${scheme.apply_link}
Verified Criteria:  ${scheme.last_verified}
CSC Supported:      ${scheme.csc_supported ? 'Yes (Can be processed at any Village Panchayat / CSC)' : 'Direct Online Portal'}
Your Readiness:     ${readyCount} of ${totalDocs} documents ready (${readinessPercent}%)
Downloaded On:      ${new Date().toLocaleString()}
================================================================================

WHY YOU QUALIFY:
--------------------------------------------------------------------------------
${why_you_qualify}

================================================================================
REQUIRED DOCUMENTS CHECKLIST:
--------------------------------------------------------------------------------
${documents
  .map((doc, idx) => {
    const isChecked = !!checkedDocs[idx];
    return `[${isChecked ? '✓ READY' : '  PENDING'}] ${idx + 1}. ${doc}`;
  })
  .join('\n')}

================================================================================
HOW TO APPLY (STEP-BY-STEP PROCEDURE):
--------------------------------------------------------------------------------
${steps.map((step, idx) => `Step ${idx + 1}: ${step}`).join('\n')}

================================================================================
CSC & JAN SEVA KENDRA OPERATOR NOTES:
--------------------------------------------------------------------------------
1. Take this checklist along with your original documents and 2 passport-size
   photographs to your nearest CSC centre or Jan Seva Kendra.
2. Ensure your name and Date of Birth match exactly across your Aadhaar card,
   Ration card, and Bank Passbook.
3. For schemes requiring income certification, keep your Tehsil/Revenue
   income certificate updated.

Powered by YojanaMitra - Welfare Schemes, Made Simple
================================================================================`;

      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${scheme.id}_document_checklist.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    } catch (e) {
      console.error('Failed to download checklist file', e);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 dark:bg-[#070d19]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white dark:bg-[#0d172c] rounded-3xl max-w-3xl w-full border border-stone-200 dark:border-slate-700/60 shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col transition-colors">
        {/* Modal Top Header */}
        <div className="p-5 sm:p-6 bg-stone-50 dark:bg-[#101b33] border-b border-stone-200 dark:border-slate-800 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                {t.categories_filter[scheme.category] || scheme.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                {isHi ? scheme.benefit_amount_tag_hi : scheme.benefit_amount_tag}
              </span>
              {scheme.sector === 'private' ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-800">
                  🏦 {isHi ? 'निजी बैंक / ट्रस्ट' : 'Private Bank / CSR'}
                </span>
              ) : scheme.provider_type === 'state_government' || (!scheme.eligibility.states.includes('all')) ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-100 dark:bg-teal-950/70 text-teal-900 dark:text-teal-300 border border-teal-300 dark:border-teal-800">
                  🏛️ {scheme.eligibility.states[0] ? `${scheme.eligibility.states[0]} ${isHi ? 'राज्य योजना' : 'State Scheme'}` : (isHi ? 'राज्य सरकारी योजना' : 'State Government Scheme')}
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-100 dark:bg-[#1a2846] text-stone-700 dark:text-slate-200 border border-stone-200 dark:border-slate-700">
                  🇮🇳 {isHi ? 'केंद्रीय सरकारी योजना' : 'Central Government Scheme'}
                </span>
              )}
              {scheme.target_group === 'student' && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950/60 text-blue-900 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  🎓 {isHi ? 'छात्रवृत्ति' : 'Students'}
                </span>
              )}
              {scheme.target_group === 'elder' && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  👴 {isHi ? 'वरिष्ठ नागरिक व पेंशन' : 'Seniors & Pension'}
                </span>
              )}
              {scheme.target_group === 'parent' && (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  👨‍👩‍👧 {isHi ? 'माता-पिता व परिवार' : 'Family & Parents'}
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-slate-50">
              {title}
            </h2>
            <p className="text-xs text-stone-600 dark:text-slate-400 font-medium">
              {ministry}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onToggleSave?.(scheme.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                isSaved
                  ? 'bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700'
                  : 'bg-white dark:bg-[#1a2846] text-stone-700 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-[#24355a] border-stone-200 dark:border-slate-700'
              }`}
              title={isSaved ? (isHi ? 'सुरक्षित सूची से हटाएं' : 'Unpin scheme') : (isHi ? 'पिन/सुरक्षित करें' : 'Pin scheme')}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-600 text-amber-700 dark:fill-amber-400 dark:text-amber-400' : ''}`} />
              <span>{isSaved ? (isHi ? 'सुरक्षित है' : 'Pinned') : (isHi ? 'सुरक्षित करें' : 'Pin Scheme')}</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-white dark:bg-[#1a2846] border border-stone-200 dark:border-slate-700 flex items-center justify-center text-stone-500 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-[#24355a] transition-all shrink-0 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6">
          {/* Personalized "Why you qualify" Box */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-[#14203a] dark:to-amber-950/30 border border-amber-200 dark:border-amber-800/70 rounded-2xl p-4 sm:p-5">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-1.5 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              <span>{t.why_qualify_badge}</span>
            </h3>
            <p className="text-sm text-stone-900 dark:text-slate-100 font-medium leading-relaxed">
              {why_you_qualify}
            </p>
          </div>

          {/* Document Checklist with Interactive Checkboxes & Readiness Bar */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <span>{t.documents_needed_title}</span>
              </h3>
              <div className="flex flex-wrap items-center gap-2">
                {/* Quick Download Checklist Button */}
                <button
                  type="button"
                  onClick={handleDownloadChecklist}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold border transition-all cursor-pointer shadow-2xs ${
                    downloaded
                      ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-300'
                      : 'bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                  }`}
                  title={isHi ? 'चेकलिस्ट टेक्स्ट फाइल डाउनलोड करें' : 'Download checklist as text file'}
                >
                  {downloaded ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                      <span>{t.checklist_downloaded}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                      <span>{isHi ? 'चेकलिस्ट सेव करें' : 'Download Checklist'}</span>
                    </>
                  )}
                </button>

                <span className="text-xs font-bold text-amber-900 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/70 px-2.5 py-1 rounded-lg border border-amber-200 dark:border-amber-800/50">
                  {readyCount} / {totalDocs} {isHi ? 'तैयार' : 'Ready'} ({readinessPercent}%)
                </span>
              </div>
            </div>

            {/* Readiness progress bar */}
            <div className="w-full bg-stone-100 dark:bg-[#1a2846] h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  readinessPercent === 100 ? 'bg-emerald-600' : 'bg-amber-600'
                }`}
                style={{ width: `${readinessPercent}%` }}
              />
            </div>

            <p className="text-xs text-stone-500 dark:text-slate-400">
              {readinessPercent === 100 ? t.ready_to_visit : t.missing_docs_notice}
            </p>

            {/* Checklist items */}
            <div className="space-y-2 pt-1">
              {documents.map((doc, idx) => {
                const isChecked = !!checkedDocs[idx];
                return (
                  <div
                    key={idx}
                    onClick={() => toggleDoc(idx)}
                    className={`p-3 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                      isChecked
                        ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 font-semibold'
                        : 'bg-stone-50/70 dark:bg-[#14203a] border-stone-200 dark:border-slate-700 text-stone-800 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-[#1e293b]'
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    ) : (
                      <Square className="w-5 h-5 text-stone-400 dark:text-slate-500 shrink-0" />
                    )}
                    <span className="text-xs sm:text-sm">{doc}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step-by-step How to Apply */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-stone-900 dark:text-slate-100">
              {t.steps_to_apply_title}
            </h3>

            <div className="space-y-2.5">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-stone-50 dark:bg-[#14203a] rounded-xl border border-stone-200 dark:border-slate-700">
                  <span className="w-6 h-6 rounded-full bg-stone-900 dark:bg-amber-600 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-xs sm:text-sm text-stone-800 dark:text-slate-200 leading-relaxed font-medium">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Verification, CSC & Sources */}
          <div className="p-4 bg-stone-100/80 dark:bg-[#14203a] rounded-2xl border border-stone-200 dark:border-slate-700 space-y-2 text-xs text-stone-600 dark:text-slate-300">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 font-semibold text-stone-700 dark:text-slate-200">
                <Calendar className="w-3.5 h-3.5 text-stone-500 dark:text-slate-400" />
                <span>{t.last_verified_on} {scheme.last_verified}</span>
              </span>
              <span className="font-semibold text-stone-700 dark:text-slate-200">
                {scheme.csc_supported ? `✓ ${t.csc_supported_note}` : ''}
              </span>
            </div>
            <div>
              <span className="font-bold">{isHi ? 'आधिकारिक स्रोत: ' : 'Official Source: '}</span>
              <a
                href={scheme.source}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-800 dark:text-amber-400 underline hover:text-amber-900 dark:hover:text-amber-300 break-all"
              >
                {scheme.source}
              </a>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-5 bg-stone-50 dark:bg-[#101b33] border-t border-stone-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Download Checklist File Button */}
            <button
              type="button"
              onClick={handleDownloadChecklist}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all shadow-xs cursor-pointer ${
                downloaded
                  ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200'
                  : 'bg-white dark:bg-[#1a2846] hover:bg-stone-100 dark:hover:bg-[#24355a] border-stone-300 dark:border-slate-700 text-stone-800 dark:text-slate-200'
              }`}
            >
              {downloaded ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                  <span>{t.checklist_downloaded}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>{t.download_checklist_btn}</span>
                </>
              )}
            </button>

            {/* Print / PDF Option */}
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-stone-300 dark:border-slate-700 text-stone-700 dark:text-slate-200 text-xs font-bold hover:bg-stone-100 dark:hover:bg-[#24355a] transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4 text-stone-600 dark:text-slate-400" />
              <span>{isHi ? 'प्रिंट / PDF' : 'Print / PDF'}</span>
            </button>
          </div>

          <a
            href={scheme.apply_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white text-xs sm:text-sm font-bold hover:from-emerald-700 hover:to-emerald-800 transition-all shadow-md shadow-emerald-700/20 ml-auto"
          >
            <span>
              {scheme.sector === 'private'
                ? (isHi ? 'आधिकारिक बैंक/संस्थान पोर्टल पर जाएं' : 'Visit Official Bank / Portal')
                : t.apply_official_btn}
            </span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
