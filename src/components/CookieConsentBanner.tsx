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
    <div class={`fixed bottom-0 inset-x-0 bg-gray-100 text-black p-4 text-center z-50 transform transition-transform duration-300 ${hideBanner ? 'translate-y-full' : 'translate-y-0'}`}>
      <h3 class="m-1 text-lg font-semibold">Paramètres des cookies</h3>
      <p class="m-2 text-sm">
        Nous utilisons des cookies pour vous offrir la meilleure expérience possible. Ils nous permettent également d’analyser le comportement des utilisateurs afin d’améliorer constamment le site Web pour vous.
      </p>
      <button
        onClick={handleAcceptAll}
        class="m-1 px-2 py-1 rounded text-sm bg-green-500 hover:bg-green-600 text-white"
      >
        Tout accepter
      </button>
      <button
        onClick={handleAcceptSome}
        class="m-1 px-2 py-1 rounded text-sm bg-green-50 hover:bg-green-100 text-green-500"
      >
        Accepter la sélection
      </button>
      <button
        onClick={handleRejectAll}
        class="m-1 px-2 py-1 rounded text-sm bg-gray-300 hover:bg-gray-400 text-black"
      >
        Tout refuser
      </button>
      <div class="flex justify-center flex-wrap mt-4">
        <label class="flex items-center justify-center m-2 gap-1 text-sm cursor-pointer">
          <input
            class=""
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
