import { registerSW } from 'virtual:pwa-register';

registerSW({
  immediate: true,
  onRegisteredSW(swScriptUrl) {
    console.log('SW registered: ', swScriptUrl);
  },
  onOfflineReady() {
    console.log('PWA application ready to work offline');

    // Exemple de notification
    showNotification('PWA Prête', 'L\'application est prête à fonctionner hors ligne!');
  },
});

function showNotification(title: string, message: string) {
  // Vérifier si le navigateur prend en charge les notifications
  if ('Notification' in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification(title, { body: message });
      }
    });
  }
}
