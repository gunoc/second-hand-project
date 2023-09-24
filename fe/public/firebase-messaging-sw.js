importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js',
);
// importScripts('https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js');
// importScripts(
//   'https://www.gstatic.com/firebasejs/10.4.0/firebase-messaging.js',
// );

firebase.initializeApp({
  apiKey: 'api-key',
  authDomain: 'project-id.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'project-id',
  storageBucket: 'project-id.appspot.com',
  messagingSenderId: 'sender-id',
  appId: 'app-id',
  measurementId: 'G-measurement-id',
});

// firebase.initializeApp({
//   apiKey: 'AIzaSyBraaIXz69rBpbciGoCU5xphFg6PPVVaaY',
//   authDomain: 'beemarket-client.firebaseapp.com',
//   projectId: 'beemarket-client',
//   storageBucket: 'beemarket-client.appspot.com',
//   messagingSenderId: '360500748096',
//   appId: '1:360500748096:web:88b429d9d348d50cc9a4a5',
// });

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload,
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: './beez.svg',
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
// 백그라운드 알림은 서비스워커가 전달
