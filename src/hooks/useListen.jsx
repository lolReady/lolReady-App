import { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import useRequest from './useRequest';

export default function useListen(
  token,
  endpoint,
  wait = false
) {
  const [response, setResponse] = useState(null);

  const [subscribeResponse, subscribeCallback] = useRequest('subscribe');

  const [unsubscribeResponse, unsubscribeCallback] = useRequest('unsubscribe');

  const unsubscribe = async () => {
    unsubscribeCallback({
      room: token,
      data: Object.values(endpoint),
    });
  };

  const subscribe = async () => {
    subscribeCallback({
      room: token,
      data: Object.values(endpoint),
    });
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await subscribe();
      })();

      return async () => {
        if (wait) return
        await unsubscribe();
      };
    }, [])
  );

  useEffect(() => {
    if (subscribeResponse) {
      const uri = subscribeResponse['endpoint'] || subscribeResponse['uri'];
      const keys = Object.keys(endpoint);
      const vals = Object.values(endpoint);

      if (vals.includes(uri)) {
        let i = vals.indexOf(uri);
        setResponse({ ...response, [keys[i]]: subscribeResponse });
      }
    }
  }, [subscribeResponse]);

  return [response, setResponse, subscribe, unsubscribe];
}
