import useInterceptAxiosErrors from '../common/hooks/useInterceptAxiosErrors';
import Portal from './Portal';
import { useState, useEffect } from 'react';

const ApiLoader = () => {
  const [loading] = useInterceptAxiosErrors();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!loading) return;
    const timeout = setTimeout(() => {
      setShow(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [loading]);

  return show ? (
    <Portal>
      <div className="absolute h-screen w-screen z-10 inset-y-0 flex justify-center items-center">
        <div
          style={{ 'border-top-color': 'transparent' }}
          className="w-12 h-12 border-4 border-blue-400 border-solid rounded-full animate-spin"
        ></div>
      </div>
    </Portal>
  ) : null;
};

export default ApiLoader;
