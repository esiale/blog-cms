import { useState, useMemo, useEffect } from 'react';
import useApiError from './useApiError';
import ax from '../config/axios/axiosConfig';

const useInterceptAxiosErrors = () => {
  const [counter, setCounter] = useState(0);
  const { addError } = useApiError();

  const interceptors = useMemo(() => {
    const inc = () => setCounter((counter) => counter + 1);
    const dec = () => setCounter((counter) => counter - 1);

    const responseError = (error) => {
      dec();
      if (error.message) addError(error.message);
      if (error.request) {
        addError(
          'There was an error connecting to the API. Please try again later.'
        );
      }
      if (error.response) {
        addError(error.response.data.message);
        const err = new Error(error.response.data.message);
        err.status = error.response.status;
        throw err;
      }
      Promise.reject(error);
    };

    const requestError = (error) => {
      dec();
      addError('There was an error handling the request.');
      Promise.reject(error);
    };

    return {
      request: (config) => (inc(), config),
      response: (response) => (dec(), response),
      responseError,
      requestError,
    };
  }, []);

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
