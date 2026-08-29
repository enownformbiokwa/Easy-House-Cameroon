import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Cookie,
  SlidersHorizontal,
  Check,
  X,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Info,
  Lock,
  Sparkles,
} from 'lucide-react';
import { AppPage } from '../types';

export interface CookiePreferences {
  essential: boolean;
  preferences: boolean;
  analytics: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'easyhouse_cookie_consent_v1';

interface CookieConsentModalProps {
  onNavigateLegal?: (page: AppPage) => void;
  isOpenExternal?: boolean;
  onCloseExternal?: () => void;
}

export const CookieConsentModal: React.FC<CookieConsentModalProps> = ({
  onNavigateLegal,
  isOpenExternal,
  onCloseExternal,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    preferences: true,
    analytics: true,
    timestamp: new Date().toISOString(),
  });

  // Check on mount if consent has already been given
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) {
        // Small entrance delay for smooth user experience
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 800);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          setPreferences(parsed);
        }
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  // Handle external trigger (e.g., from Footer "Cookie Settings")
  useEffect(() => {
    if (isOpenExternal) {
      setIsVisible(true);
      setShowPreferences(true);
    }
  }, [isOpenExternal]);

  const saveConsent = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) {
      console.warn('Could not save cookie preferences to localStorage:', e);
    }
    setPreferences(prefs);
    setIsVisible(false);
    setShowPreferences(false);
    if (onCloseExternal) {
      onCloseExternal();
    }
  };

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      essential: true,
      preferences: true,
      analytics: true,
      timestamp: new Date().toISOString(),
    };
    saveConsent(allAccepted);
  };

  const handleAcceptEssential = () => {
    const essentialOnly: CookiePreferences = {
      essential: true,
      preferences: false,
      analytics: false,
      timestamp: new Date().toISOString(),
    };
    saveConsent(essentialOnly);
  };

  const handleSaveCustomPreferences = () => {
    saveConsent({
      ...preferences,
      essential: true,
      timestamp: new Date().toISOString(),
    });
  };

  if (!isVisible) return null;

  return (
    <div
      id="cookie-consent-overlay"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-300"
    >
      <div
        id="cookie-consent-card"
        className="w-full max-w-xl bg-white text-zinc-900 rounded-3xl shadow-2xl border border-zinc-200/90 overflow-hidden relative animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-300"
      >
        {/* Subtle Top Accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-amber-500 via-zinc-900 to-amber-600 w-full" />

        <div className="p-6 sm:p-7 space-y-5">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-zinc-950 tracking-tight">
                  Cookie & Privacy Consent
                </h3>
                <p className="text-xs text-zinc-500 font-medium">
                  Easy House Cameroon values your privacy & browsing experience
                </p>
              </div>
            </div>

            {isOpenExternal && (
              <button
                onClick={() => {
                  setIsVisible(false);
                  if (onCloseExternal) onCloseExternal();
                }}
                className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 flex items-center justify-center transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Body description */}
          <div className="text-xs sm:text-sm text-zinc-600 leading-relaxed space-y-2">
            <p>
              We use essential cookies and browser storage to keep our real estate platform secure, remember your saved properties and currency settings (FCFA), and provide seamless tour scheduling in Buea, Douala, Limbe, and Yaoundé.
            </p>
            <p className="text-zinc-500 text-[11px]">
              You can choose to accept all cookies or customize your preferences below. Learn more in our{' '}
              <button
                type="button"
                onClick={() => {
                  if (onNavigateLegal) {
                    onNavigateLegal('privacy');
                    setIsVisible(false);
                  }
                }}
                className="text-amber-700 font-semibold underline underline-offset-2 hover:text-zinc-950 inline-flex items-center gap-0.5 cursor-pointer"
              >
                <span>Privacy & Cookie Policy</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </button>
              .
            </p>
          </div>

          {/* Granular Preferences Accordion */}
          {showPreferences && (
            <div
              id="cookie-preference-toggles"
              className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-4 space-y-3.5 animate-in fade-in duration-200"
            >
              <div className="text-xs font-bold text-zinc-800 uppercase tracking-wider flex items-center gap-1.5 pb-1 border-b border-zinc-200">
                <SlidersHorizontal className="w-3.5 h-3.5 text-zinc-600" />
                <span>Customize Storage Categories</span>
              </div>

              {/* 1. Strictly Necessary (Always On) */}
              <div className="flex items-start justify-between gap-3 pt-1">
                <div className="space-y-0.5 pr-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900">
                    <Lock className="w-3.5 h-3.5 text-zinc-700" />
                    <span>Strictly Necessary & Security</span>
                    <span className="text-[10px] uppercase px-1.5 py-0.2 bg-zinc-200 text-zinc-700 rounded-md font-semibold">
                      Required
                    </span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Essential for secure administrative access, preventing fraud, and ensuring core website functionality. Cannot be disabled.
                  </p>
                </div>
                <div className="shrink-0 pt-0.5">
                  <div className="w-10 h-6 bg-zinc-900 rounded-full flex items-center justify-end px-1 cursor-not-allowed opacity-90">
                    <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-zinc-950" />
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Preferences & Favorites */}
              <div className="flex items-start justify-between gap-3 pt-2 border-t border-zinc-200/70">
                <div className="space-y-0.5 pr-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>User Preferences & Saved Listings</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Stores your favorite properties, search budget filters, and FCFA currency preferences so you don&apos;t have to reconfigure them every visit.
                  </p>
                </div>
                <div className="shrink-0 pt-0.5">
                  <button
                    type="button"
                    onClick={() =>
                      setPreferences((prev) => ({
                        ...prev,
                        preferences: !prev.preferences,
                      }))
                    }
                    className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 cursor-pointer ${
                      preferences.preferences ? 'bg-amber-600 justify-end' : 'bg-zinc-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-xs" />
                  </button>
                </div>
              </div>

              {/* 3. Analytics & Speed Optimization */}
              <div className="flex items-start justify-between gap-3 pt-2 border-t border-zinc-200/70">
                <div className="space-y-0.5 pr-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-900">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Performance & Diagnostic Analytics</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 leading-normal">
                    Helps us understand platform loading performance across Cameroon network providers and optimize listing image deliveries.
                  </p>
                </div>
                <div className="shrink-0 pt-0.5">
                  <button
                    type="button"
                    onClick={() =>
                      setPreferences((prev) => ({
                        ...prev,
                        analytics: !prev.analytics,
                      }))
                    }
                    className={`w-10 h-6 rounded-full transition-colors flex items-center px-1 cursor-pointer ${
                      preferences.analytics ? 'bg-amber-600 justify-end' : 'bg-zinc-300 justify-start'
                    }`}
                  >
                    <div className="w-4 h-4 bg-white rounded-full shadow-xs" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 pt-1">
            {!showPreferences ? (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowPreferences(true)}
                  className="px-4 py-2.5 rounded-xl border border-zinc-300 hover:border-zinc-400 hover:bg-zinc-50 text-zinc-700 text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5 order-3 sm:order-1"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>Customize</span>
                </button>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2.5 order-1 sm:order-2">
                  <button
                    type="button"
                    onClick={handleAcceptEssential}
                    className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-colors cursor-pointer text-center"
                  >
                    Essential Only
                  </button>

                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer text-center flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Accept All Cookies</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowPreferences(false)}
                  className="px-4 py-2.5 rounded-xl border border-zinc-200 text-zinc-600 hover:text-zinc-900 text-xs font-semibold transition-colors cursor-pointer text-center"
                >
                  Hide Details
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="px-4 py-2.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Accept All
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveCustomPreferences}
                    className="px-5 py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5 text-amber-400" />
                    <span>Save My Choices</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
