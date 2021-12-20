import useInterceptAxiosErrors from '../common/hooks/useInterceptAxiosErrors';
import Portal from './Portal';
import { useState, useEffect } from 'react';

const ApiLoader = () => {
  const [loading] = useInterceptAxiosErrors();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!loading) return setShow(false);
    const timeout = setTimeout(() => {
      setShow(true);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [loading]);

  return show ? (
    <Portal>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
          style={{ borderTopColor: 'transparent' }}
          className="w-12 h-12 border-4 border-blue-400 border-solid rounded-full animate-spin"
        ></div>
      </div>
    </Portal>
  ) : null;
};

export default ApiLoader;
