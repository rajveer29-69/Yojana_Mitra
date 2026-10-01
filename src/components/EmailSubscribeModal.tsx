import React, { useState, useEffect } from 'react';
import { 
  X, 
  Mail, 
  BellRing, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  AlertCircle, 
  Loader2,
  LogIn,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import type { UserProfile } from '../data/schemes.ts';
import { saveEmailSubscription, signInWithGoogle, logOut, auth } from '../services/firebase.ts';
import { onAuthStateChanged, User } from 'firebase/auth';

interface EmailSubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'hi';
  profile?: UserProfile | null;
}

export const EmailSubscribeModal: React.FC<EmailSubscribeModalProps> = ({
  isOpen,
  onClose,
  language,
  profile
}) => {
  const [email, setEmail] = useState('');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const isHi = language === 'hi';

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user && user.email) {
        setEmail(user.email);
      }
    });
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  const handleGoogleSignIn = async () => {
    setErrorMsg(null);
    setIsSigningIn(true);
    try {
      const user = await signInWithGoogle();
      if (user.email) {
        setEmail(user.email);
      }
    } catch (err: any) {
      console.warn('Google sign in error:', err);
      setErrorMsg(
        isHi
          ? 'गूगल साइन-इन विफल रहा, आप नीचे सीधे ईमेल दर्ज कर सकते हैं।'
          : 'Google sign-in was cancelled or failed. You can enter your email directly below.'
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
      setEmail('');
    } catch (err) {
      console.warn('Sign out error:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmed = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed || !emailRegex.test(trimmed)) {
      setErrorMsg(
        isHi
          ? 'कृपया एक वैध ईमेल पता दर्ज करें।'
          : 'Please enter a valid email address.'
      );
      return;
    }

    setIsSubmitting(true);
    try {
      await saveEmailSubscription(trimmed, profile, currentUser);
      setIsSuccess(true);
    } catch (err: any) {
      console.error('Subscription error:', err);
      setErrorMsg(
        isHi
          ? 'सब्सक्रिप्शन सहेजने में त्रुटि हुई। कृपया पुनः प्रयास करें।'
          : 'Failed to save subscription. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setIsSuccess(false);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/70 dark:bg-[#070d19]/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white dark:bg-[#0d172c] rounded-3xl max-w-lg w-full border border-stone-200 dark:border-slate-700/60 shadow-2xl overflow-hidden relative transition-all">
        {/* Close Button */}
        <button
          onClick={handleModalClose}
          className="absolute right-4 top-4 z-10 w-9 h-9 rounded-xl bg-stone-100/80 dark:bg-[#14203a] hover:bg-stone-200 dark:hover:bg-[#1e293b] flex items-center justify-center text-stone-500 dark:text-slate-400 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Content */}
        {!isSuccess ? (
          <div className="p-6 sm:p-7 space-y-5">
            {/* Header with Icon */}
            <div className="flex items-start gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 shadow-xs border border-amber-200 dark:border-amber-800">
                <BellRing className="w-6 h-6 text-amber-700 dark:text-amber-400 animate-bounce duration-1000" />
              </div>
              <div className="pr-6">
                <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 dark:text-stone-100 tracking-tight">
                  {isHi ? 'नई सरकारी योजनाओं की सूचना पाएं' : 'Get Matching Scheme Alerts'}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mt-0.5 leading-relaxed">
                  {isHi
                    ? 'जब भी आपके प्रोफाइल के अनुसार नई कल्याणकारी योजनाएं या आवेदन तिथियां घोषित होंगी, हम आपको ईमेल पर सूचित करेंगे।'
                    : 'Receive instant email updates whenever new central or state welfare schemes matching your profile are launched.'}
                </p>
              </div>
            </div>

            {/* Profile Criteria Badge Summary */}
            {profile && (
              <div className="bg-amber-50/70 dark:bg-stone-800 border border-amber-200/80 dark:border-stone-700 rounded-2xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-300">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>{isHi ? 'आपके प्रोफाइल के आधार पर अलर्ट:' : 'Alerts tailored for:'}</span>
                  </span>
                  <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-400">
                    {profile.state}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  <span className="px-2 py-0.5 bg-white dark:bg-stone-800 rounded-md border border-amber-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-medium">
                    {isHi ? 'आयु:' : 'Age:'} {profile.age}
                  </span>
                  <span className="px-2 py-0.5 bg-white dark:bg-stone-800 rounded-md border border-amber-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-medium capitalize">
                    {profile.occupation.replace('_', ' ')}
                  </span>
                  <span className="px-2 py-0.5 bg-white dark:bg-stone-800 rounded-md border border-amber-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-medium uppercase">
                    {profile.category}
                  </span>
                  <span className="px-2 py-0.5 bg-white dark:bg-stone-800 rounded-md border border-amber-200 dark:border-stone-700 text-stone-800 dark:text-stone-200 font-medium">
                    ₹{profile.income.toLocaleString('en-IN')}/yr
                  </span>
                </div>
              </div>
            )}

            {/* Google Sign-in Fast Option */}
            <div className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-2xl p-3.5 flex items-center justify-between gap-3">
              {currentUser ? (
                <div className="flex items-center gap-2.5 min-w-0">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName || 'User'}
                      className="w-8 h-8 rounded-full border border-stone-300 dark:border-stone-600 shrink-0"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs font-bold shrink-0">
                      <UserIcon className="w-4 h-4" />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-stone-900 dark:text-stone-100 truncate">
                      {currentUser.displayName || currentUser.email}
                    </p>
                    <p className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      {isHi ? 'गूगल सत्यापित' : 'Google Verified'}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="min-w-0">
                  <p className="text-xs font-bold text-stone-900 dark:text-stone-100">
                    {isHi ? '1-क्लिक गूगल साइन-इन' : 'Fast 1-Click with Google'}
                  </p>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">
                    {isHi ? 'सुरक्षित प्रमाणीकरण व स्वतः ईमेल' : 'Secure auth with Firebase'}
                  </p>
                </div>
              )}

              {currentUser ? (
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="px-2.5 py-1 text-[11px] font-semibold text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200 dark:hover:bg-stone-700 rounded-lg transition-colors border border-stone-300 dark:border-stone-700 shrink-0"
                >
                  {isHi ? 'लॉगआउट' : 'Switch'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isSigningIn}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-stone-800 hover:bg-stone-100 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-300 dark:border-stone-700 transition-all shadow-2xs shrink-0 disabled:opacity-60"
                >
                  {isSigningIn ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  )}
                  <span>{isHi ? 'गूगल से जारी रखें' : 'Sign in'}</span>
                </button>
              )}
            </div>

            {/* Email Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-800 dark:text-stone-200 uppercase tracking-wider mb-1.5">
                  {isHi ? 'आपका ईमेल पता:' : 'Your Email Address:'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-stone-800 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-stone-400 dark:placeholder:text-stone-500"
                    required
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-50 dark:bg-red-950/50 text-red-700 dark:text-red-300 rounded-xl text-xs font-semibold flex items-center gap-2 border border-red-200 dark:border-red-800">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-extrabold text-sm transition-all shadow-md shadow-amber-600/25 flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-amber-200" />
                    <span>{isHi ? 'सहेजा जा रहा है...' : 'Saving Subscription...'}</span>
                  </>
                ) : (
                  <>
                    <BellRing className="w-4 h-4 text-amber-200" />
                    <span>{isHi ? 'सूचनाएं सक्रिय करें' : 'Subscribe to Scheme Alerts'}</span>
                  </>
                )}
              </button>
            </form>

            <p className="text-[11px] text-stone-600 dark:text-stone-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>
                {isHi
                  ? 'शून्य स्पैम। केवल वास्तविक व सत्यापित सरकारी सूचनाएं। कभी भी अनसब्सक्राइब करें।'
                  : 'Zero spam. Verified notifications only. Unsubscribe at any time.'}
              </span>
            </p>
          </div>
        ) : (
          /* Success Screen */
          <div className="p-7 sm:p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-300 flex items-center justify-center mx-auto border border-emerald-300 dark:border-emerald-800 shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-extrabold text-stone-900 dark:text-stone-100">
              {isHi ? 'सदस्यता सफलतापूर्वक सक्रिय!' : 'Subscribed Successfully!'}
            </h3>

            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 max-w-sm mx-auto leading-relaxed">
              {isHi ? (
                <>
                  हमने <strong className="text-stone-900 dark:text-stone-100">{email}</strong> को पंजीकृत कर लिया है। जब भी आपके राज्य ({profile?.state || 'भारत'}) व वर्ग के लिए कोई नई योजना शुरू होगी, आपको तुरंत सूचना मिलेगी।
                </>
              ) : (
                <>
                  We have registered <strong className="text-stone-900 dark:text-stone-100">{email}</strong> in Firestore. You will receive updates as soon as new schemes matching your state ({profile?.state || 'India'}) and occupation are announced.
                </>
              )}
            </p>

            <div className="pt-2">
              <button
                onClick={handleModalClose}
                className="px-6 py-2.5 rounded-xl bg-stone-900 dark:bg-amber-600 text-white font-bold text-xs sm:text-sm hover:bg-stone-800 dark:hover:bg-amber-700 transition-all shadow-xs"
              >
                {isHi ? 'पूर्ण / बंद करें' : 'Done & Close'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
