import { registerSW } from 'virtual:pwa-register';

registerSW({
  immediate: true,
  onRegisteredSW(swScriptUrl) {
    console.log('SW registered swScriptUrl: ', swScriptUrl);
  },
  onOfflineReady() {
    console.log('PWA application ready to work offline');
  },
  onNeedRefresh() {
    if (confirm('Une nouvelle version est disponible. Voulez-vous mettre à jour?')) {
      location.reload();
    }
  },
});
