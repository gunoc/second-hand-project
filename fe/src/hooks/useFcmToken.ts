import { useEffect, useState } from 'react';
import { getMessaging, getToken } from 'firebase/messaging';
import { firebaseApp } from '@utils/fcm';
import { useAuth } from './useAuth';

export const useFcmToken = () => {
  const { isLogin } = useAuth();
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState<NotificationPermission>('default'); // TODO 꼭 있어야하는지?

  useEffect(() => {
    if (!isLogin) return;
    // if (!isLogin || isSubscribed) return;

    const retrieveToken = async () => {
      try {
        const messaging = getMessaging(firebaseApp);
        const permission = await Notification.requestPermission();

        if (permission === 'granted') {
          setNotificationPermissionStatus(permission);
          const token = await getToken(messaging, {
            vapidKey: import.meta.env.VITE_VAPID_KEY,
          });
          if (token) {
            setFcmToken(token);
          } else {
            console.log(
              'No registration token available. Request permission to generate one.',
            );
          }
        }
      } catch (error) {
        console.log('An error occurred while retrieving token. ', error);
        // TODO 에러처리
        // 토큰 만료시 삭제? 재요청? 
      }
    };

    retrieveToken();
  }, [isLogin]);

  return { fcmToken, notificationPermissionStatus };
};
