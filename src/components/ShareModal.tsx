import React, { useState } from 'react';
import { MatchedSchemeResult, UserProfile } from '../data/schemes.ts';
import { TRANSLATIONS } from '../data/translations.ts';
import { X, Share2, Copy, Check, Printer, MessageCircle, Link2, ExternalLink } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'hi';
  results: MatchedSchemeResult[];
  profile: UserProfile;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  language,
  results,
  profile
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[language];
  const isHi = language === 'hi';
  const [copiedText, setCopiedText] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Generate direct link to this specific matched schemes evaluation
  const shareUrl = (() => {
    try {
      const base = `${window.location.origin}${window.location.pathname}`;
      const params = new URLSearchParams();
      if (profile.state) params.set('state', profile.state);
      if (profile.age !== undefined) params.set('age', String(profile.age));
      if (profile.income !== undefined) params.set('income', String(profile.income));
      if (profile.occupation) params.set('occupation', profile.occupation);
      if (profile.gender) params.set('gender', profile.gender);
      if (profile.category) params.set('category', profile.category);
      if (language) params.set('lang', language);
      return `${base}?${params.toString()}#results-section`;
    } catch {
      return `${window.location.href.split('#')[0]}#results-section`;
    }
  })();

  // Build clean text summary for clipboard & WhatsApp
  const topSchemes = results.slice(0, 5);
  const schemesListText = topSchemes
    .map((r, i) => `${i + 1}. *${isHi ? r.scheme.name_hi : r.scheme.name}*\n   💰 ${isHi ? r.scheme.benefit_amount_tag_hi : r.scheme.benefit_amount_tag}`)
    .join('\n\n');

  const extraCount = results.length - topSchemes.length;

  const prefilledWhatsAppMessage = isHi
    ? `🇮🇳 *योजनामित्र (YojanaMitra) - सरकारी योजना रिपोर्ट*\n\nनमस्ते! मैंने अपनी पात्रता जांची और मुझे *${results.length} सरकारी योजनाओं* के लिए पात्र पाया गया:\n\n${schemesListText}${extraCount > 0 ? `\n\n➕ ...और ${extraCount} अन्य सरकारी योजनाएं!` : ''}\n\n📋 *मेरी पूरी योजना सूची एवं आवेदन प्रक्रिया देखने के लिए नीचे दिए गए लिंक पर क्लिक करें:*\n👉 ${shareUrl}\n\n(आप भी 2 मिनट में अपनी पात्रता मुफ्त में जांच सकते हैं)`
    : `🇮🇳 *YojanaMitra - Government Welfare Schemes Report*\n\nHello! I checked my eligibility and qualified for *${results.length} government schemes*:\n\n${schemesListText}${extraCount > 0 ? `\n\n➕ ...and ${extraCount} more schemes!` : ''}\n\n📋 *View my full matched schemes list & application guide here:*\n👉 ${shareUrl}\n\n(You can also check your own eligibility for free in 2 minutes)`;

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(prefilledWhatsAppMessage)}`;

  const handleCopyText = () => {
    navigator.clipboard.writeText(prefilledWhatsAppMessage);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 dark:bg-[#070d19]/85 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#0d172c] rounded-3xl max-w-lg w-full border border-stone-200 dark:border-slate-700/60 shadow-2xl p-6 relative transition-colors">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 w-8 h-8 rounded-lg bg-stone-100 dark:bg-[#14203a] flex items-center justify-center text-stone-500 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-stone-900 dark:text-stone-100">
              {t.share_title}
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              {isHi ? 'व्हाट्सएप पर शेयर करें, लिंक कॉपी करें या प्रिंट निकालें' : 'Share to WhatsApp, copy direct link, or print for CSC visit'}
            </p>
          </div>
        </div>

        {/* Direct Link Box */}
        <div className="mb-4 bg-amber-50/70 dark:bg-amber-950/30 p-3 rounded-2xl border border-amber-200/80 dark:border-amber-800/60">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              {isHi ? 'पात्र योजनाओं की सीधी लिंक:' : 'Direct Link to Matched Schemes:'}
            </span>
            <button
              type="button"
              onClick={handleCopyLink}
              className="text-[11px] font-bold text-amber-800 dark:text-amber-300 hover:text-amber-950 dark:hover:text-amber-100 flex items-center gap-1 transition-colors"
            >
              {copiedLink ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedLink ? (isHi ? 'लिंक कॉपी हो गई!' : 'Link Copied!') : (isHi ? 'लिंक कॉपी करें' : 'Copy Link')}</span>
            </button>
          </div>
          <div className="text-[11px] font-mono text-stone-600 dark:text-stone-400 truncate bg-white/80 dark:bg-stone-850 px-2.5 py-1.5 rounded-lg border border-amber-200/60 dark:border-amber-900/50">
            {shareUrl}
          </div>
        </div>

        {/* WhatsApp Message Preview Box */}
        <div className="mb-4">
          <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
            {isHi ? 'व्हाट्सएप संदेश पूर्वावलोकन:' : 'WhatsApp Pre-filled Message Preview:'}
          </label>
          <div className="bg-stone-50 dark:bg-stone-800/80 p-3.5 rounded-2xl border border-stone-200 dark:border-stone-750 max-h-40 overflow-y-auto font-mono text-xs text-stone-700 dark:text-stone-300 whitespace-pre-wrap leading-relaxed">
            {prefilledWhatsAppMessage}
          </div>
        </div>

        {/* Share buttons */}
        <div className="space-y-2.5">
          {/* WhatsApp Share Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold text-sm transition-all shadow-md shadow-emerald-600/25 active:scale-[0.99] group"
          >
            <MessageCircle className="w-5 h-5 fill-current shrink-0 group-hover:scale-110 transition-transform" />
            <span>{t.whatsapp_share_btn}</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-70 ml-1" />
          </a>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-bold text-xs hover:bg-stone-100 dark:hover:bg-stone-800 transition-all"
            >
              {copiedText ? <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-4 h-4 text-stone-600 dark:text-stone-400" />}
              <span>{copiedText ? (isHi ? 'संदेश कॉपी हो गया!' : 'Message Copied!') : (isHi ? 'पूरा संदेश कॉपी करें' : 'Copy Message')}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-bold text-xs hover:bg-stone-100 dark:hover:bg-stone-800 transition-all"
            >
              <Printer className="w-4 h-4 text-stone-600 dark:text-stone-400" />
              <span>{t.print_results_btn}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

