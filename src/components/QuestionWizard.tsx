import React, { useState, useEffect } from 'react';
import { INDIAN_STATES } from '../data/states.ts';
import { UserProfile } from '../data/schemes.ts';
import { TRANSLATIONS } from '../data/translations.ts';
import { Mic, MicOff, ArrowRight, ArrowLeft, CheckCircle2, Sparkles, Building2, Wallet, UserCircle, Briefcase, AlertCircle, Check } from 'lucide-react';
import { useSpeechRecognition } from '../utils/useSpeechRecognition.ts';

interface QuestionWizardProps {
  language: 'en' | 'hi';
  initialProfile?: Partial<UserProfile>;
  onSubmit: (profile: UserProfile) => void;
  isLoading: boolean;
  compactMode?: boolean;
}

export const QuestionWizard: React.FC<QuestionWizardProps> = ({
  language,
  initialProfile,
  onSubmit,
  isLoading,
  compactMode = false
}) => {
  const t = TRANSLATIONS[language];

  // Wizard state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [age, setAge] = useState<string>(initialProfile?.age ? String(initialProfile.age) : '35');
  const [state, setState] = useState<string>(initialProfile?.state || 'Uttar Pradesh');
  const [income, setIncome] = useState<string>(initialProfile?.income ? String(initialProfile.income) : '150000');
  const [occupation, setOccupation] = useState<UserProfile['occupation']>(initialProfile?.occupation || 'farmer');
  const [gender, setGender] = useState<UserProfile['gender']>(initialProfile?.gender || 'male');
  const [category, setCategory] = useState<UserProfile['category']>(initialProfile?.category || 'obc');

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Sync when initialProfile updates (e.g. from preset click)
  useEffect(() => {
    if (initialProfile) {
      if (initialProfile.age !== undefined) setAge(String(initialProfile.age));
      if (initialProfile.state) setState(initialProfile.state);
      if (initialProfile.income !== undefined) setIncome(String(initialProfile.income));
      if (initialProfile.occupation) setOccupation(initialProfile.occupation);
      if (initialProfile.gender) setGender(initialProfile.gender);
      if (initialProfile.category) setCategory(initialProfile.category);
    }
  }, [initialProfile]);

  // Voice speech recognition for current step
  const handleVoiceTranscript = (text: string) => {
    const clean = text.toLowerCase();
    
    // Check for numbers (Age or Income)
    const numbersMatch = clean.match(/\d+/g);
    if (numbersMatch && numbersMatch.length > 0) {
      const num = parseInt(numbersMatch[0], 10);
      if (currentStep === 1 && num > 0 && num <= 120) {
        setAge(String(num));
      } else if (currentStep === 2) {
        // e.g. "one lakh" or numbers
        if (clean.includes('lakh') || clean.includes('लाख')) {
          setIncome(String(num * 100000));
        } else {
          setIncome(String(num));
        }
      }
    }

    // Check for States
    const matchedState = INDIAN_STATES.find(s => 
      clean.includes(s.name.toLowerCase()) || clean.includes(s.name_hi)
    );
    if (matchedState) {
      setState(matchedState.name);
    }

    // Check for occupation keywords
    if (clean.includes('farmer') || clean.includes('किसान') || clean.includes('kisan') || clean.includes('kheti')) {
      setOccupation('farmer');
    } else if (clean.includes('student') || clean.includes('विद्यार्थी') || clean.includes('छात्र') || clean.includes('padhai')) {
      setOccupation('student');
    } else if (clean.includes('business') || clean.includes('vyapar') || clean.includes('दुकान') || clean.includes('artisan')) {
      setOccupation('self_employed');
    } else if (clean.includes('unemployed') || clean.includes('बेरोजगार') || clean.includes('berozgar')) {
      setOccupation('unemployed');
    } else if (clean.includes('retired') || clean.includes('बुजुर्ग') || clean.includes('senior')) {
      setOccupation('retired');
    } else if (clean.includes('homemaker') || clean.includes('गृहिणी')) {
      setOccupation('homemaker');
    }

    // Check for gender
    if (clean.includes('female') || clean.includes('महिला') || clean.includes('aurat') || clean.includes('ladki')) {
      setGender('female');
    } else if (clean.includes('male') || clean.includes('पुरुष') || clean.includes('aadmi')) {
      setGender('male');
    }
  };

  const { isListening, isSupported, startListening, stopListening, errorMessage: voiceError } = useSpeechRecognition({
    language,
    onResult: handleVoiceTranscript
  });

  const validateStep = (step: number): boolean => {
    setErrorMsg(null);
    if (step === 1) {
      const a = Number(age);
      if (isNaN(a) || a < 0 || a > 120) {
        setErrorMsg(language === 'hi' ? 'कृपया 0 से 120 के बीच वैध आयु भरें।' : 'Please enter a valid age between 0 and 120.');
        return false;
      }
      if (!state) {
        setErrorMsg(language === 'hi' ? 'कृपया अपना राज्य चुनें।' : 'Please select your state.');
        return false;
      }
    } else if (step === 2) {
      const inc = Number(income);
      if (isNaN(inc) || inc < 0) {
        setErrorMsg(language === 'hi' ? 'कृपया वैध वार्षिक पारिवारिक आय भरें।' : 'Please enter a valid non-negative income amount.');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleFinalSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateStep(1) || !validateStep(2)) return;

    const profile: UserProfile = {
      language,
      age: Number(age),
      state,
      income: Number(income),
      occupation,
      gender,
      category
    };

    onSubmit(profile);
  };

  const steps = [
    {
      id: 1,
      title: language === 'hi' ? 'आयु व राज्य' : 'Age & State',
      subtitle: language === 'hi' ? 'मूल विवरण' : 'Basic Info',
    },
    {
      id: 2,
      title: language === 'hi' ? 'वार्षिक आय' : 'Income',
      subtitle: language === 'hi' ? 'वित्तीय स्थिति' : 'Financial',
    },
    {
      id: 3,
      title: language === 'hi' ? 'पेशा' : 'Occupation',
      subtitle: language === 'hi' ? 'आजीविका' : 'Livelihood',
    },
    {
      id: 4,
      title: language === 'hi' ? 'वर्ग व लिंग' : 'Demographics',
      subtitle: language === 'hi' ? 'आरक्षण श्रेणी' : 'Category',
    }
  ];

  // Section completion checks
  const isStep1Done = Boolean(age && Number(age) >= 0 && Number(age) <= 120 && state);
  const isStep2Done = Boolean(income !== '' && !isNaN(Number(income)) && Number(income) >= 0);
  const isStep3Done = Boolean(occupation);
  const isStep4Done = Boolean(gender && category);

  // Completed steps calculation:
  // In wizard mode, past steps that were validated and passed:
  // When currentStep = 1, completed = 0 (or 4 if isLoading)
  // In compact CSC mode, count the validly filled sections.
  const completedStepsCount = compactMode
    ? [isStep1Done, isStep2Done, isStep3Done, isStep4Done].filter(Boolean).length
    : isLoading
    ? totalSteps
    : Math.max(0, currentStep - 1);

  const progressPercent = compactMode
    ? Math.round((completedStepsCount / totalSteps) * 100)
    : isLoading
    ? 100
    : Math.round((currentStep / totalSteps) * 100);

  // Steps remaining calculation
  const stepsRemaining = compactMode
    ? Math.max(0, totalSteps - completedStepsCount)
    : isLoading
    ? 0
    : Math.max(0, totalSteps - currentStep);

  const getMotivationText = () => {
    if (compactMode) {
      const remainingSec = totalSteps - completedStepsCount;
      if (remainingSec === 0) return language === 'hi' ? 'सभी 4 भाग पूर्ण • मूल्यांकन हेतु तैयार!' : 'All 4 sections filled • Ready to evaluate!';
      return language === 'hi' 
        ? `${remainingSec} भाग भरने शेष हैं` 
        : `${remainingSec} section${remainingSec > 1 ? 's' : ''} left to complete`;
    }
    if (isLoading) {
      return language === 'hi' ? 'मूल्यांकन जारी है...' : 'Evaluating eligibility...';
    }
    switch (currentStep) {
      case 1:
        return t.form.retention_step1 || (language === 'hi' ? 'केवल 3 छोटे प्रश्न शेष • 1 मिनट से भी कम' : 'Only 3 short questions left • Takes under 1 minute');
      case 2:
        return t.form.retention_step2 || (language === 'hi' ? 'आधा सफर पूरा! 2 त्वरित प्रश्न बाकी' : 'Halfway done! 2 quick questions remaining');
      case 3:
        return t.form.retention_step3 || (language === 'hi' ? 'लगभग पूरा! बस 1 कदम बाकी' : 'Almost there! Just 1 step remaining');
      case 4:
      default:
        return t.form.retention_step4 || (language === 'hi' ? 'अंतिम चरण! भरते ही तुरंत सभी योजनाएं अनलॉक होंगी' : 'Final step! Schemes will be unlocked immediately');
    }
  };

  const handleStepClick = (stepId: number) => {
    if (compactMode || isLoading) return;
    // Allow jumping to already completed steps to review or edit
    if (stepId < currentStep) {
      setCurrentStep(stepId);
    }
  };

  return (
    <div className="bg-white dark:bg-[#0d172c] rounded-3xl border border-stone-200 dark:border-slate-700/60 shadow-sm overflow-hidden mb-8 transition-colors">
      {/* Top Visual Multi-Segment Progress Bar with Steps Remaining Indicator */}
      <div className="bg-stone-50/95 dark:bg-[#101b33]/95 border-b border-stone-200 dark:border-slate-800 px-4 sm:px-6 py-3.5 space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Progress Percent & Step Status */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-lg text-xs font-black bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 shadow-2xs">
              {progressPercent}%
            </span>
            <span className="text-xs sm:text-sm font-extrabold text-stone-800 dark:text-slate-100">
              {compactMode
                ? (language === 'hi' ? 'सीएससी प्रोफाइल पूर्णता' : 'CSC Evaluation Progress')
                : t.form.step_indicator.replace('{current}', String(currentStep)).replace('{total}', String(totalSteps))}
            </span>
          </div>

          {/* Eye-Catching Steps Remaining Retention Callout */}
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <div
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                stepsRemaining === 0 || isLoading
                  ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 ring-2 ring-emerald-500/20'
                  : stepsRemaining === 1
                  ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 border-amber-300 dark:border-amber-700 ring-2 ring-amber-500/20'
                  : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 border-indigo-200 dark:border-indigo-800'
              }`}
            >
              {stepsRemaining === 0 || isLoading ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>{t.form.final_step_ready}</span>
                </>
              ) : (
                <>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping inline-block" />
                  <span>
                    {language === 'hi'
                      ? `${stepsRemaining} चरण शेष`
                      : `${stepsRemaining} step${stepsRemaining > 1 ? 's' : ''} remaining`}
                  </span>
                </>
              )}
            </div>

            <span className="text-[11px] text-stone-500 dark:text-slate-400 font-medium hidden md:inline">
              • {getMotivationText()}
            </span>
          </div>
        </div>

        {/* Visual 4-Segment Progress Bar Track */}
        <div
          className="grid grid-cols-4 gap-1.5 sm:gap-2"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t.form.progress_completed.replace('{completed}', String(completedStepsCount)).replace('{total}', String(totalSteps))}
        >
          {steps.map((st) => {
            const isCompleted = compactMode
              ? (st.id === 1 && isStep1Done) || (st.id === 2 && isStep2Done) || (st.id === 3 && isStep3Done) || (st.id === 4 && isStep4Done)
              : st.id < currentStep || isLoading;
            const isCurrent = compactMode ? false : st.id === currentStep && !isLoading;

            return (
              <div key={st.id} className="relative group">
                <div
                  className={`h-2.5 rounded-full overflow-hidden transition-all duration-300 relative ${
                    isCompleted
                      ? 'bg-emerald-500 shadow-2xs'
                      : isCurrent
                      ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 shadow-2xs ring-2 ring-amber-400/40'
                      : 'bg-stone-200 dark:bg-[#1e293b]'
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute inset-0 bg-white/30 animate-pulse" />
                  )}
                </div>
                {/* Micro step label under segment */}
                <div className="flex items-center justify-between mt-1 px-0.5">
                  <span
                    className={`text-[10px] font-bold truncate ${
                      isCompleted
                        ? 'text-emerald-700 dark:text-emerald-400'
                        : isCurrent
                        ? 'text-amber-700 dark:text-amber-400 font-extrabold'
                        : 'text-stone-400 dark:text-slate-400'
                    }`}
                  >
                    {st.title}
                  </span>
                  {isCompleted && (
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 stroke-[3]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Wizard Header & Progress */}
      <div className="p-5 sm:p-6 bg-gradient-to-b from-stone-50/80 to-white dark:from-[#101b33] dark:to-[#0d172c] border-b border-stone-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center font-extrabold text-sm shadow-sm shrink-0">
              {compactMode ? '★' : currentStep}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-slate-50">
                  {compactMode
                    ? (language === 'hi' ? 'त्वरित आवेदन विवरण (सीएससी मोड)' : 'Quick Evaluation Profile (CSC Mode)')
                    : t.form.step_indicator.replace('{current}', String(currentStep)).replace('{total}', String(totalSteps))}
                </h2>
                {/* Completed steps badge */}
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-bold border transition-colors inline-flex items-center gap-1 ${
                    completedStepsCount === totalSteps
                      ? 'bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                      : completedStepsCount > 0
                      ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700'
                      : 'bg-stone-100 dark:bg-[#1a2846] text-stone-600 dark:text-slate-300 border-stone-300 dark:border-slate-700'
                  }`}
                >
                  {completedStepsCount === totalSteps ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>{t.form.progress_all_done.replace('{total}', String(totalSteps))}</span>
                    </>
                  ) : (
                    <span>
                      {t.form.progress_completed
                        .replace('{completed}', String(completedStepsCount))
                        .replace('{total}', String(totalSteps))}
                    </span>
                  )}
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 font-medium mt-0.5">
                {compactMode
                  ? (language === 'hi' ? 'सीएससी ऑपरेटरों के लिए एकल पृष्ठ मूल्यांकन' : 'Single-page evaluation for CSC operators and volunteers')
                  : `${progressPercent}% ${language === 'hi' ? 'पूर्ण' : 'completed'} • ${getMotivationText()}`}
              </p>
            </div>
          </div>

          {/* Voice Input Button */}
          {isSupported && (
            <button
              type="button"
              onClick={isListening ? stopListening : startListening}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all self-start sm:self-center ${
                isListening
                  ? 'bg-red-500 text-white animate-pulse shadow-md'
                  : 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/60 border border-amber-300 dark:border-amber-700'
              }`}
              title="Speak answer using microphone"
            >
              {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-amber-800 dark:text-amber-300" />}
              <span>{isListening ? t.voice_btn_listening : t.voice_btn_start}</span>
            </button>
          )}
        </div>

        {/* Step Progress Stepper Bar (visible when !compactMode) */}
        {!compactMode && (
          <div className="mt-3 pt-2">
            <div className="relative">
              {/* Connecting background line */}
              <div className="absolute top-4 left-6 right-6 h-1 bg-stone-200 dark:bg-[#1e293b] rounded-full" />
              {/* Connecting filled line */}
              <div
                className="absolute top-4 left-6 h-1 bg-gradient-to-r from-amber-500 to-emerald-500 rounded-full transition-all duration-500 ease-out"
                style={{
                  width:
                    completedStepsCount === 0
                      ? '0%'
                      : completedStepsCount === 1
                      ? '28%'
                      : completedStepsCount === 2
                      ? '61%'
                      : completedStepsCount >= 3
                      ? '94%'
                      : '0%'
                }}
              />

              {/* Stepper Nodes */}
              <div className="grid grid-cols-4 gap-1 relative z-10">
                {steps.map((st) => {
                  const isCompleted = st.id < currentStep || isLoading;
                  const isCurrent = st.id === currentStep && !isLoading;

                  return (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => handleStepClick(st.id)}
                      disabled={!isCompleted || isLoading}
                      className={`flex flex-col items-center text-center group transition-all ${
                        isCompleted ? 'cursor-pointer' : 'cursor-default'
                      }`}
                      title={
                        isCompleted
                          ? (language === 'hi' ? 'वापस इस चरण पर जाने के लिए क्लिक करें' : 'Click to review step')
                          : undefined
                      }
                    >
                      {/* Circle node indicator */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          isCompleted
                            ? 'bg-emerald-600 text-white shadow-sm ring-4 ring-emerald-500/20 group-hover:scale-110'
                            : isCurrent
                            ? 'bg-amber-600 text-white shadow-md ring-4 ring-amber-500/25 scale-105'
                            : 'bg-white dark:bg-[#14203a] border-2 border-stone-300 dark:border-slate-700 text-stone-400 dark:text-slate-400'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : (
                          st.id
                        )}
                      </div>

                      {/* Step Title & Subtitle */}
                      <div className="mt-1.5 px-0.5">
                        <span
                          className={`text-xs font-bold block truncate max-w-[80px] sm:max-w-none transition-colors ${
                            isCurrent
                              ? 'text-amber-700 dark:text-amber-400 font-extrabold'
                              : isCompleted
                              ? 'text-emerald-700 dark:text-emerald-400'
                              : 'text-stone-500 dark:text-slate-400'
                          }`}
                        >
                          {st.title}
                        </span>
                        <span className="text-[10px] text-stone-400 dark:text-slate-500 hidden sm:block">
                          {isCompleted
                            ? (language === 'hi' ? 'पूर्ण ✓' : 'Done ✓')
                            : isCurrent
                            ? (language === 'hi' ? 'सक्रिय' : 'Current')
                            : st.subtitle}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Compact Mode Progress Bar */}
        {compactMode && (
          <div className="mt-2 pt-1">
            <div className="flex items-center justify-between text-xs text-stone-600 dark:text-slate-300 mb-1.5 font-semibold">
              <span>{language === 'hi' ? 'फार्म प्रविष्टि प्रगति' : 'Form Completion Progress'}</span>
              <span className="font-bold text-amber-700 dark:text-amber-400">
                {completedStepsCount} / {totalSteps} {language === 'hi' ? 'खंड पूर्ण' : 'sections filled'} ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-stone-200 dark:bg-[#1e293b] h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {voiceError && (
          <p className="mt-2 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 p-2 rounded-lg border border-amber-200 dark:border-amber-800 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            {voiceError}
          </p>
        )}
      </div>

      <form onSubmit={handleFinalSubmit} className="p-5 sm:p-7 space-y-6">
        {/* Step 1: Age & State */}
        {(compactMode || currentStep === 1) && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Age Field */}
              <div className="bg-stone-50/60 dark:bg-[#101b33] p-4 rounded-2xl border border-stone-200 dark:border-slate-700/60">
                <label className="block text-sm font-bold text-stone-900 dark:text-white mb-1">
                  {t.form.age_label}
                </label>
                <p className="text-xs text-stone-500 dark:text-slate-400 mb-3">{t.form.age_sub}</p>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder={t.form.age_placeholder}
                    className="w-full px-4 py-3 bg-white dark:bg-[#14203a] rounded-xl border border-stone-300 dark:border-slate-600/70 text-stone-900 dark:text-white text-base font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                    required
                  />
                  <span className="absolute right-3.5 top-3.5 text-xs font-semibold text-stone-500 dark:text-slate-400 uppercase">
                    {language === 'hi' ? 'वर्ष' : 'Years'}
                  </span>
                </div>
              </div>

              {/* State Field */}
              <div className="bg-stone-50/60 dark:bg-[#101b33] p-4 rounded-2xl border border-stone-200 dark:border-slate-700/60">
                <label className="block text-sm font-bold text-stone-900 dark:text-white mb-1">
                  {t.form.state_label}
                </label>
                <p className="text-xs text-stone-500 dark:text-slate-400 mb-3">{t.form.state_sub}</p>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-[#14203a] rounded-xl border border-stone-300 dark:border-slate-600/70 text-stone-900 dark:text-white text-base font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all cursor-pointer"
                  required
                >
                  <option value="" disabled>{t.form.state_select}</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s.name} value={s.name}>
                      {language === 'hi' ? `${s.name_hi} (${s.name})` : s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Family Income */}
        {(compactMode || currentStep === 2) && (
          <div className="space-y-4">
            <div className="bg-stone-50/60 dark:bg-[#101b33] p-4 sm:p-5 rounded-2xl border border-stone-200 dark:border-slate-700/60">
              <label className="block text-sm font-bold text-stone-900 dark:text-white mb-1">
                {t.form.income_label}
              </label>
              <p className="text-xs text-stone-500 dark:text-slate-400 mb-3">{t.form.income_sub}</p>

              <div className="relative mb-3">
                <span className="absolute left-4 top-3 text-stone-500 dark:text-slate-400 font-bold text-lg">₹</span>
                <input
                  type="number"
                  min="0"
                  step="5000"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder={t.form.income_placeholder}
                  className="w-full pl-9 pr-4 py-3 bg-white dark:bg-[#14203a] rounded-xl border border-stone-300 dark:border-slate-600/70 text-stone-900 dark:text-white text-lg font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Quick Select Income Chips */}
              <div>
                <span className="text-xs font-semibold text-stone-500 dark:text-slate-400 block mb-2">
                  {t.form.income_quick_chips}
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: t.form.income_less_1l, value: '80000' },
                    { label: t.form.income_1_5l, value: '150000' },
                    { label: t.form.income_2_5l, value: '250000' },
                    { label: t.form.income_5l, value: '500000' },
                    { label: t.form.income_above_8l, value: '850000' }
                  ].map((chip) => (
                    <button
                      key={chip.value}
                      type="button"
                      onClick={() => setIncome(chip.value)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                        income === chip.value
                          ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                          : 'bg-white dark:bg-[#14203a] text-stone-700 dark:text-slate-300 border-stone-300 dark:border-slate-700 hover:bg-stone-100 dark:hover:bg-[#1a2948]'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Occupation */}
        {(compactMode || currentStep === 3) && (
          <div className="space-y-4">
            <div className="bg-stone-50/60 dark:bg-[#101b33] p-4 sm:p-5 rounded-2xl border border-stone-200 dark:border-slate-700/60">
              <label className="block text-sm font-bold text-stone-900 dark:text-white mb-1">
                {t.form.occupation_label}
              </label>
              <p className="text-xs text-stone-500 dark:text-slate-400 mb-4">{t.form.occupation_sub}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {[
                  { key: 'farmer', emoji: '🌾', label: t.form.occupation_options.farmer },
                  { key: 'student', emoji: '🎓', label: t.form.occupation_options.student },
                  { key: 'self_employed', emoji: '🏪', label: t.form.occupation_options.self_employed },
                  { key: 'unemployed', emoji: '💼', label: t.form.occupation_options.unemployed },
                  { key: 'retired', emoji: '👴', label: t.form.occupation_options.retired },
                  { key: 'homemaker', emoji: '🏡', label: t.form.occupation_options.homemaker },
                  { key: 'salaried', emoji: '🏢', label: t.form.occupation_options.salaried }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setOccupation(item.key as any)}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                      occupation === item.key
                        ? 'bg-amber-500/15 dark:bg-amber-500/20 border-amber-500 ring-2 ring-amber-500/20 shadow-xs text-amber-950 dark:text-amber-200 font-bold'
                        : 'bg-white dark:bg-[#14203a] border-stone-200 dark:border-slate-700 hover:border-stone-300 dark:hover:border-slate-500 text-stone-800 dark:text-slate-200'
                    }`}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-xs sm:text-sm font-semibold leading-tight">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Gender & Social Category */}
        {(compactMode || currentStep === 4) && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Gender */}
              <div className="bg-stone-50/60 dark:bg-[#101b33] p-4 rounded-2xl border border-stone-200 dark:border-slate-700/60">
                <label className="block text-sm font-bold text-stone-900 dark:text-white mb-1">
                  {t.form.gender_label}
                </label>
                <p className="text-xs text-stone-500 dark:text-slate-400 mb-3">{t.form.gender_sub}</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { key: 'male', label: t.form.gender_options.male },
                    { key: 'female', label: t.form.gender_options.female },
                    { key: 'other', label: t.form.gender_options.other }
                  ].map((g) => (
                    <button
                      key={g.key}
                      type="button"
                      onClick={() => setGender(g.key as any)}
                      className={`p-2.5 rounded-xl border text-center transition-all text-xs font-bold cursor-pointer ${
                        gender === g.key
                          ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                          : 'bg-white dark:bg-[#14203a] border-stone-200 dark:border-slate-700 hover:border-stone-300 dark:hover:border-slate-500 text-stone-800 dark:text-slate-200'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="bg-stone-50/60 dark:bg-[#101b33] p-4 rounded-2xl border border-stone-200 dark:border-slate-700/60">
                <label className="block text-sm font-bold text-stone-900 dark:text-white mb-1">
                  {t.form.category_label}
                </label>
                <p className="text-xs text-stone-500 dark:text-slate-400 mb-3">{t.form.category_sub}</p>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-4 py-3 bg-white dark:bg-[#14203a] rounded-xl border border-stone-300 dark:border-slate-600/70 text-stone-900 dark:text-white text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="general">{t.form.category_options.general}</option>
                  <option value="obc">{t.form.category_options.obc}</option>
                  <option value="sc">{t.form.category_options.sc}</option>
                  <option value="st">{t.form.category_options.st}</option>
                  <option value="ews">{t.form.category_options.ews}</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Error notification */}
        {errorMsg && (
          <div className="p-3 bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 rounded-xl text-xs font-semibold flex items-center gap-2 border border-red-200 dark:border-red-800">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Action Buttons */}
        <div className="pt-2 flex items-center justify-between gap-3 border-t border-stone-100 dark:border-slate-800">
          {!compactMode && currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              disabled={isLoading}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 dark:border-slate-700 bg-stone-100 dark:bg-[#14203a] text-stone-700 dark:text-slate-200 font-bold text-xs sm:text-sm hover:bg-stone-200 dark:hover:bg-[#1a2948] transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.back_btn}</span>
            </button>
          ) : (
            <div />
          )}

          {!compactMode && currentStep < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-stone-900 dark:bg-amber-500 dark:hover:bg-amber-600 text-white dark:text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-sm ml-auto cursor-pointer"
            >
              <span>{t.next_btn}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading}
              className="flex items-center gap-2 px-7 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white font-extrabold text-sm sm:text-base hover:from-amber-700 hover:to-amber-800 transition-all shadow-md shadow-amber-600/25 ml-auto disabled:opacity-50 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{isLoading ? t.searching_schemes : t.submit_btn}</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
