import React from 'react';
import { X, ShieldCheck, Cpu, Database, Lock, CheckCircle2 } from 'lucide-react';

interface MethodologyModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'hi';
}

export const MethodologyModal: React.FC<MethodologyModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  if (!isOpen) return null;
  const isHi = language === 'hi';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 dark:bg-[#070d19]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#0d172c] rounded-3xl max-w-2xl w-full border border-stone-200 dark:border-slate-700/60 shadow-2xl p-6 sm:p-7 relative max-h-[90vh] overflow-y-auto transition-colors">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-lg bg-stone-100 dark:bg-[#14203a] flex items-center justify-center text-stone-500 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 text-amber-700 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-stone-900 dark:text-slate-50">
              {isHi ? 'योजनामित्र कार्यप्रणाली एवं विश्वसनीयता' : 'YojanaMitra Methodology & Trust Architecture'}
            </h2>
            <p className="text-xs text-stone-500 dark:text-slate-400">
              {isHi ? 'सटीक परिणाम, शून्य भ्रामकता (Zero AI Hallucination)' : 'Deterministic matching + Grounded AI explanations'}
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
          {/* Pillar 1 */}
          <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-stone-800 border border-amber-200 dark:border-amber-800/60">
            <div className="flex items-center gap-2 mb-1.5 font-bold text-amber-900 dark:text-amber-300">
              <Database className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              <span>{isHi ? '1. नियम-आधारित मिलान इंजन (Rule-Based Matching)' : '1. Deterministic Rule Matching'}</span>
            </div>
            <p>
              {isHi
                ? 'पात्रता का निर्णय कोई एआई या एलएलएम अपने अनुमान से नहीं करता। योजनामित्र आधिकारिक सरकारी अधिसूचनाओं व myScheme.gov.in के नियमों (आयु सीमा, आय सीमा, लिंग, राज्य, वर्ग) के आधार पर शत-प्रतिशत सटीक गणितीय मिलान करता है।'
                : 'Eligibility is decided purely by deterministic rules verified from official government portals and gazettes. The LLM does NOT guess or decide who qualifies, eliminating hallucinations.'}
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-stone-800 border border-emerald-200 dark:border-emerald-800/60">
            <div className="flex items-center gap-2 mb-1.5 font-bold text-emerald-950 dark:text-emerald-300">
              <Cpu className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
              <span>{isHi ? '2. जेमिनी एआई व्याख्या स्तर (Gemini Explanation Layer)' : '2. Grounded Gemini AI Explanation'}</span>
            </div>
            <p>
              {isHi
                ? 'मिलान होने के बाद जेमिनी एआई केवल पात्र योजनाओं को 8वीं कक्षा के स्तर की सरल व सम्मानजनक हिंदी या अंग्रेजी में समझाता है। एआई कोई नया नियम या दस्तावेज नहीं जोड़ सकता।'
                : 'After deterministic filtering, Google Gemini 3.8 Flash translates the dry legal eligibility criteria into warm, empathetic, Class-8 reading level explanations strictly grounded in the matched data.'}
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-stone-800 border border-blue-200 dark:border-blue-800/60">
            <div className="flex items-center gap-2 mb-1.5 font-bold text-blue-950 dark:text-blue-300">
              <Lock className="w-4 h-4 text-blue-700 dark:text-blue-400" />
              <span>{isHi ? '3. पूर्ण गोपनीयता एवं शून्य डेटा संग्रहण (Privacy by Design)' : '3. Privacy & Zero-Storage Guarantee'}</span>
            </div>
            <p>
              {isHi
                ? 'उपयोगकर्ता का कोई व्यक्तिगत डेटा, नाम, फोन नंबर या आधार किसी सर्वर या डेटाबेस में सेव नहीं किया जाता। प्रत्येक अनुरोध केवल उसी समय प्रोसेस होकर स्वतः समाप्त हो जाता है।'
                : 'No user accounts, logins, or tracking databases. Your profile is processed in-memory per request and immediately discarded. Safe for rural volunteers and common kiosk usage.'}
            </p>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-stone-900 dark:bg-amber-600 text-white text-xs font-bold hover:bg-stone-800 dark:hover:bg-amber-700 transition-colors"
          >
            {isHi ? 'समझ गया' : 'Got It'}
          </button>
        </div>
      </div>
    </div>
  );
};
