import { useEffect, useState } from 'preact/hooks';

interface Consent {
  necessary: boolean;
  analytics: boolean;
  preferences: boolean;
  marketing: boolean;
}

enum ConsentStatus {
  Granted = 'granted',
  Denied = 'denied',
}

const CookieConsentBanner = () => {
  const [hideBanner, setHideBanner] = useState(true);
  const [analyticsChecked, setAnalyticsChecked] = useState(true);
  const [preferencesChecked, setPreferencesChecked] = useState(true);
  const [marketingChecked, setMarketingChecked] = useState(false);

  useEffect(() => {
    !localStorage.getItem('consentMode') && setHideBanner(false);
  }, []);

  const setConsent = (
    consent: Consent
  ) => {
    const consentMode: Record<string, ConsentStatus> = {
      functionality_storage: consent.necessary ? ConsentStatus.Granted : ConsentStatus.Denied,
      security_storage: consent.necessary ? ConsentStatus.Granted : ConsentStatus.Denied,
      ad_storage: consent.marketing ? ConsentStatus.Granted : ConsentStatus.Denied,
      analytics_storage: consent.analytics ? ConsentStatus.Granted : ConsentStatus.Denied,
      personalization: consent.preferences ? ConsentStatus.Granted : ConsentStatus.Denied,
    };
    setHideBanner(true);

    // @ts-ignore
    gtag('consent', 'update', consentMode);
    localStorage.setItem('consentMode', JSON.stringify(consentMode));
  };

  const handleAcceptAll = () => {
    setConsent({
      necessary: true,
      analytics: true,
      preferences: true,
      marketing: true,
    });
  };

  const handleAcceptSome = () => {
    setConsent({
      necessary: true,
      analytics: analyticsChecked,
      preferences: preferencesChecked,
      marketing: marketingChecked,
    });
  };

  const handleRejectAll = () => {
    setConsent({
      necessary: false,
      analytics: false,
      preferences: false,
      marketing: false,
    });
  };

  return (
    <div class={`bottom-0 left-0 right-0 bg-gray-100 shadow-md text-black p-4 text-center z-50 transform transition-transform duration-300 ${hideBanner ? 'translate-y-0' : '-translate-y-full'}`}>
      <h3 class="m-1 text-lg font-semibold">Paramètres des cookies</h3>
      <p class="m-2 text-sm">
        Nous utilisons des cookies pour vous offrir la meilleure expérience possible. Ils nous permettent également d’analyser le comportement des utilisateurs afin d’améliorer constamment le site Web pour vous.
      </p>
      <button
        onClick={handleAcceptAll}
        class="bg-green-500 m-1 px-2 py-1 rounded text-sm text-white hover:bg-green-600"
      >
        Tout accepter
      </button>
      <button
        onClick={handleAcceptSome}
        class="bg-green-50 m-1 px-2 py-1 rounded text-sm text-green-500 hover:bg-green-100"
      >
        Accepter la sélection
      </button>
      <button
        onClick={handleRejectAll}
        class="bg-gray-300 m-1 px-2 py-1 rounded text-sm text-black hover:bg-gray-400"
      >
        Tout refuser
      </button>
      <div class="flex justify-center flex-wrap mt-4">
        <label class="flex items-center justify-center m-2 gap-1 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={true}
            disabled={true}
          />
          Nécessaire
        </label>
        <label class="flex items-center justify-center m-2 gap-1 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={analyticsChecked}
            onChange={() => setAnalyticsChecked(!analyticsChecked)}
          />
          Analytiques
        </label>
        <label class="flex items-center justify-center m-2 gap-1 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={preferencesChecked}
            onChange={() => setPreferencesChecked(!preferencesChecked)}
          />
          Préférences
        </label>
        <label class="flex items-center justify-center m-2 gap-1 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={marketingChecked}
            onChange={() => setMarketingChecked(!marketingChecked)}
          />
          Marketing
        </label>
      </div>
    </div>
  );
};

export default CookieConsentBanner;
