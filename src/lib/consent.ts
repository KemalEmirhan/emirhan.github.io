export type Consent = 'granted' | 'denied';
// 'unset' = visitor hasn't chosen yet; 'pending' = server render, we can't know yet.
export type ConsentState = Consent | 'unset' | 'pending';

const STORAGE_KEY = 'consent-analytics';
const listeners = new Set<() => void>();

const read = (): ConsentState => {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'granted' || value === 'denied' ? value : 'unset';
  } catch {
    return 'unset';
  }
};

let current: ConsentState = typeof window === 'undefined' ? 'pending' : read();

type GtagWindow = Window & { dataLayer?: unknown[] };

// gtag.js only accepts real `arguments` objects in the dataLayer, not arrays.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(command: string, action: string, params: object) {
  const w = window as GtagWindow;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(arguments);
}

const consentFields = (value: Consent) => ({
  analytics_storage: value,
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
});

let primed = false;

/** Queue consent defaults before gtag.js reads its config. Safe to call more than once. */
export const primeGoogleConsent = () => {
  if (primed || typeof window === 'undefined') return;
  primed = true;
  gtag('consent', 'default', consentFields('granted'));
};

const updateGoogleConsent = (value: Consent) => {
  if (typeof window === 'undefined') return;
  gtag('consent', 'update', consentFields(value));
};

// Withdrawing consent must also remove what was stored (GDPR art. 7(3)).
const clearAnalyticsCookies = () => {
  const host = window.location.hostname;
  const domains = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`];
  document.cookie
    .split(';')
    .map(c => c.split('=')[0].trim())
    .filter(name => name === '_ga' || name.startsWith('_ga_'))
    .forEach(name => {
      domains.forEach(domain => {
        document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ''}`;
      });
    });
};

export const consentStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: () => current,
  getServerSnapshot: (): ConsentState => 'pending',
};

export const setConsent = (value: Consent) => {
  current = value;
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Private mode: the choice holds for this visit.
  }
  updateGoogleConsent(value);
  if (value === 'denied') clearAnalyticsCookies();
  listeners.forEach(listener => listener());
};
