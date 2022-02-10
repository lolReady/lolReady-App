import { useFocusEffect } from '@react-navigation/native';
import { useState, useCallback } from 'react';

import Socket from "../../Socket"

const useRequest = (event, initialParams = {}) => {
  const [response, setResponse] = useState();

  useFocusEffect(
    useCallback(() => {
      (async () => {
        await callback(initialParams);
      })();

      return () => {
        setResponse(null);
      };
    }, [])
  );

  const callback = async (params) => {
    setResponse(null);
    if (
      Object.keys(initialParams).length === 0 &&
      Object.keys(params).length === 0
    )
      return;

    if (event === 'subscribe') {
      Socket.on(event + '_resp', (params) => {
        setResponse(params);
      });
    } else {
      Socket.once(event + '_resp', (params) => {
        setResponse(params);
      });
    }

    Socket.emit(event, {
      ...initialParams,
      ...params,
    });
  };

  return [response, callback, setResponse];
};

export default useRequest;
