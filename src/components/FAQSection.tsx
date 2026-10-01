import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  FileText, 
  CheckCircle2, 
  ExternalLink, 
  PhoneCall, 
  ShieldCheck, 
  Building,
  Users,
  AlertCircle
} from 'lucide-react';
import { FAQS_DATA, FAQItem } from '../data/faqs.ts';

interface FAQSectionProps {
  language: 'en' | 'hi';
}

export const FAQSection: React.FC<FAQSectionProps> = ({ language }) => {
  const isHi = language === 'hi';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('faq_1'); // Open first by default

  const toggleAccordion = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const categories = [
    { key: 'all', label: isHi ? 'सभी प्रश्न' : 'All FAQs' },
    { key: 'application', label: isHi ? 'आवेदन प्रक्रिया' : 'Application Process' },
    { key: 'eligibility', label: isHi ? 'पात्रता व दस्तावेज' : 'Eligibility & Docs' },
    { key: 'csc', label: isHi ? 'सीएससी व ऑफलाइन' : 'CSC & Offline Help' },
    { key: 'platform', label: isHi ? 'प्लेटफॉर्म व सुरक्षा' : 'Platform & Privacy' }
  ];

  // Filter FAQs
  const filteredFaqs = FAQS_DATA.filter((faq) => {
    const matchesCat = selectedCategory === 'all' || faq.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCat;

    const questionMatch = (isHi ? faq.question_hi : faq.question).toLowerCase().includes(q);
    const answerMatch = (isHi ? faq.answer_hi : faq.answer).toLowerCase().includes(q);
    return matchesCat && (questionMatch || answerMatch);
  });

  return (
    <section id="faqs-section" className="scroll-mt-20 my-12">
      <div className="bg-white dark:bg-[#0d172c] rounded-3xl border border-stone-200/90 dark:border-slate-700/60 shadow-xs overflow-hidden transition-colors">
        {/* Top Header Banner */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-stone-50 to-white dark:from-[#101b33] dark:to-[#0d172c] border-b border-stone-200 dark:border-slate-800">
          <div className="max-w-3xl mx-auto text-center space-y-2.5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 text-xs font-bold border border-amber-300 dark:border-amber-800">
              <HelpCircle className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              <span>{isHi ? 'मार्गदर्शन एवं सहायता केंद्र' : 'Guidance & Help Center'}</span>
            </div>

            <h2 className="text-xl sm:text-3xl font-extrabold text-stone-900 dark:text-slate-50 tracking-tight font-serif">
              {isHi ? 'अक्सर पूछे जाने वाले प्रश्न (FAQs)' : 'Frequently Asked Questions'}
            </h2>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-slate-400 font-medium leading-relaxed max-w-xl mx-auto">
              {isHi
                ? 'सरकारी योजनाओं की आवेदन प्रक्रिया, सामान्य पात्रता समस्याएं, डीबीटी बैंक खाता, और योजनामित्र के उपयोग से जुड़े सभी उत्तर।'
                : 'Clear answers on scheme applications, offline CSC support, Aadhaar DBT requirements, and how to verify your benefits.'}
            </p>

            {/* Quick Search within FAQs */}
            <div className="pt-2 max-w-md mx-auto">
              <div className="relative">
                <Search className="w-4 h-4 text-stone-400 dark:text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isHi ? 'प्रश्न खोजें (जैसे: आधार, डीबीटी, सीएससी, शुल्क)...' : 'Search questions (e.g., Aadhaar, DBT, fees, offline)...'}
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#14203a] rounded-xl border border-stone-300 dark:border-slate-700 text-stone-900 dark:text-slate-100 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all shadow-2xs placeholder:text-stone-400 dark:placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-xs text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-6 pt-4 border-t border-stone-100 dark:border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-amber-600 text-white border-amber-700 shadow-2xs'
                    : 'bg-white dark:bg-[#14203a] text-stone-700 dark:text-slate-300 border-stone-200 dark:border-slate-700 hover:bg-stone-50 dark:hover:bg-[#1e293b]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion List */}
        <div className="p-5 sm:p-8 max-w-3xl mx-auto space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedId === faq.id;
              const question = isHi ? faq.question_hi : faq.question;
              const answer = isHi ? faq.answer_hi : faq.answer;
              const keyPoints = isHi ? faq.key_points_hi : faq.key_points;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isExpanded
                      ? 'bg-amber-50/40 dark:bg-[#14203a] border-amber-300 dark:border-amber-800/80 shadow-2xs'
                      : 'bg-stone-50/50 dark:bg-[#101b33]/60 border-stone-200 dark:border-slate-800 hover:border-stone-300 dark:hover:border-slate-700'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 select-none cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${
                        isExpanded ? 'bg-amber-600 text-white' : 'bg-stone-200 dark:bg-[#1e293b] text-stone-700 dark:text-slate-300'
                      }`}>
                        ?
                      </span>
                      <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-slate-100 leading-snug">
                        {question}
                      </h3>
                    </div>

                    <span className="w-7 h-7 rounded-lg bg-white dark:bg-[#1e293b] border border-stone-200 dark:border-slate-700 flex items-center justify-center text-stone-500 dark:text-slate-400 shrink-0">
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-amber-700 dark:text-amber-400" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-amber-200/60 dark:border-slate-800 space-y-3">
                      <p className="text-xs sm:text-sm text-stone-700 dark:text-slate-300 leading-relaxed font-medium">
                        {answer}
                      </p>

                      {/* Bullet Highlights if available */}
                      {keyPoints && keyPoints.length > 0 && (
                        <div className="bg-white dark:bg-[#101b33] p-3.5 rounded-xl border border-amber-200/80 dark:border-slate-750 space-y-1.5">
                          <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300 uppercase tracking-wider block">
                            {isHi ? 'मुख्य बातें / सुझाव:' : 'Important Tips:'}
                          </span>
                          <ul className="space-y-1">
                            {keyPoints.map((pt, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-xs text-stone-700 dark:text-slate-300">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                                <span>{pt}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Helpful official link if available */}
                      {faq.helpful_link && (
                        <div className="pt-1">
                          <a
                            href={faq.helpful_link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 dark:text-amber-400 hover:text-amber-950 dark:hover:text-amber-300 underline"
                          >
                            <span>{isHi ? faq.helpful_link.text_hi : faq.helpful_link.text}</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-8">
              <AlertCircle className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-xs font-semibold text-stone-500 dark:text-stone-400">
                {isHi ? 'आपके खोजे गए शब्द से कोई प्रश्न नहीं मिला।' : 'No FAQs matched your search term.'}
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs font-bold text-amber-800 dark:text-amber-400 underline"
              >
                {isHi ? 'सभी प्रश्न देखें' : 'Reset Search'}
              </button>
            </div>
          )}
        </div>

        {/* National Welfare Helplines Footer Card */}
        <div className="p-5 sm:p-7 bg-stone-100/80 dark:bg-[#101b33] border-t border-stone-200 dark:border-slate-800">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-slate-100">
                  {isHi ? 'राष्ट्रीय सरकारी सहायता हेल्पलाइन नंबर' : 'National Official Scheme Helplines'}
                </h4>
                <p className="text-[11px] text-stone-500 dark:text-slate-400">
                  {isHi ? 'किसी भी कठिनाई या शिकायत के लिए टोल-फ्री संपर्क करें' : 'Toll-free government helplines for citizen assistance'}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px] font-semibold text-stone-800 dark:text-slate-200">
              <span className="px-2.5 py-1 bg-white dark:bg-[#1a2846] rounded-lg border border-stone-300 dark:border-slate-700">
                🏥 Ayushman Bharat: <strong>14555</strong>
              </span>
              <span className="px-2.5 py-1 bg-white dark:bg-[#1a2846] rounded-lg border border-stone-300 dark:border-slate-700">
                🌾 PM-KISAN: <strong>155261</strong>
              </span>
              <span className="px-2.5 py-1 bg-white dark:bg-[#1a2846] rounded-lg border border-stone-300 dark:border-slate-700">
                🎓 Scholarship: <strong>0120-6619540</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
