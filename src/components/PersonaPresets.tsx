import React from 'react';
import { PERSONA_PRESETS, PersonaPreset } from '../data/personas.ts';
import { UserProfile } from '../data/schemes.ts';
import { Zap, Sparkles } from 'lucide-react';

interface PersonaPresetsProps {
  language: 'en' | 'hi';
  onSelectPersona: (profile: Omit<UserProfile, 'language'>) => void;
  activePersonaId?: string | null;
}

export const PersonaPresets: React.FC<PersonaPresetsProps> = ({
  language,
  onSelectPersona,
  activePersonaId
}) => {
  return (
    <div className="bg-amber-50/70 dark:bg-[#0d172c] border border-amber-200/80 dark:border-slate-700/60 rounded-2xl p-3.5 sm:p-4 mb-6 shadow-xs transition-colors">
      <div className="flex items-center justify-between gap-2 mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-amber-500 text-white flex items-center justify-center shrink-0">
            <Zap className="w-3 h-3 fill-current" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
            {language === 'hi' ? 'जज व डेमो टेस्ट प्रोफाइल (1-क्लिक टेस्ट)' : 'Judge Demo Presets (1-Click Instant Test)'}
          </span>
        </div>
        <span className="text-[11px] text-amber-700 dark:text-amber-400 font-medium hidden sm:inline">
          {language === 'hi' ? 'क्लिक करते ही तुरंत योजनाएं दिखेंगी' : 'Instantly evaluates and matches schemes'}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
        {PERSONA_PRESETS.map((preset) => {
          const isActive = activePersonaId === preset.id;
          return (
            <button
              key={preset.id}
              onClick={() => onSelectPersona(preset.profile)}
              className={`text-left p-2.5 rounded-xl border transition-all relative overflow-hidden group ${
                isActive
                  ? 'bg-amber-600 text-white border-amber-700 dark:border-amber-500 shadow-md ring-2 ring-amber-400/40'
                  : 'bg-white dark:bg-[#14203a] hover:bg-amber-100/50 dark:hover:bg-[#1e293b] border-amber-200 dark:border-slate-700/70 text-stone-800 dark:text-slate-200 hover:border-amber-300 dark:hover:border-slate-600'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl group-hover:scale-110 transition-transform">
                  {preset.avatar_emoji}
                </span>
                <span className={`text-xs font-bold line-clamp-1 ${isActive ? 'text-white' : 'text-stone-900 dark:text-slate-100'}`}>
                  {language === 'hi' ? preset.name_hi : preset.name}
                </span>
              </div>
              <p className={`text-[11px] line-clamp-1 font-medium ${isActive ? 'text-amber-100' : 'text-stone-600 dark:text-slate-400'}`}>
                {language === 'hi' ? preset.tagline_hi : preset.tagline}
              </p>
              <div className="mt-1.5 flex items-center">
                <span
                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-md tracking-tight ${
                    isActive
                      ? 'bg-amber-700 dark:bg-amber-800 text-amber-100'
                      : 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/50'
                  }`}
                >
                  {language === 'hi' ? preset.badge_hi : preset.badge}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
