import { useState, useMemo, useEffect } from 'react';
import { ax } from '../config/axios/axiosConfig';
import useApiError from './useApiError';

const useInterceptAxiosErrors = () => {
  const [counter, setCounter] = useState(0);
  const { addError } = useApiError();

  const interceptors = useMemo(() => {
    const inc = () => setCounter((counter) => counter + 1);
    const dec = () => setCounter((counter) => counter - 1);

    const responseError = (error) => {
      dec();
      if (error.response) {
        addError(error.response.data.message || error.response.statusText);
      } else if (error.request) {
        addError(
          'There was an error connecting to the API. Please try again later.'
        );
      } else {
        addError('There was an error setting up the request.');
      }
      return Promise.reject(error);
    };

    const requestError = (error) => {
      dec();
      addError('There was an error handling the request.');
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
  }, [addError]);

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
