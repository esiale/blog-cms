import { useState, useMemo, useEffect } from 'react';
import { ax } from '../config/axios/axiosConfig';
import useModal from './useModal';

const useInterceptAxiosErrors = () => {
  const [counter, setCounter] = useState(0);
  const { addMessage } = useModal();

  const interceptors = useMemo(() => {
    const inc = () => setCounter((counter) => counter + 1);
    const dec = () => setCounter((counter) => counter - 1);

    const responseError = (error) => {
      dec();
      if (error.response) {
        addMessage({
          type: 'error',
          message: error.response.data.message || error.response.statusText,
        });
      } else if (error.request) {
        addMessage({
          type: 'error',
          message:
            'There was an error connecting to the API. Please try again later.',
        });
      } else {
        addMessage({
          type: 'error',
          message: 'There was an error setting up the request.',
        });
      }
      return Promise.reject(error);
    };

    const requestError = (error) => {
      dec();
      addMessage({
        type: 'error',
        message: 'There was an error handling the request.',
      });
      return Promise.reject(error);
    };

    return {
      request: (config) => {
        inc();
        return config;
      },
      response: (response) => {
        dec();
        return response;
      },
      responseError,
      requestError,
    };
  }, [addMessage]);

  useEffect(() => {
    const reqInterceptor = ax.interceptors.request.use(
      interceptors.request,
      interceptors.requestError
    );
    const resInterceptor = ax.interceptors.response.use(
      interceptors.response,
      interceptors.responseError
    );
    return () => {
      ax.interceptors.request.eject(reqInterceptor);
      ax.interceptors.response.eject(resInterceptor);
    };
  }, [interceptors]);
  return [counter > 0];
};

export default useInterceptAxiosErrors;
