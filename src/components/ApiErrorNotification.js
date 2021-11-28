import useApiError from '../common/hooks/useApiError';
import Portal from './Portal';
import { useEffect, useRef } from 'react';
import { Transition } from '@headlessui/react';

const ApiErrorNotification = () => {
  const { error, removeError } = useApiError();
  const handleClick = () => removeError();

  const errorRef = useRef('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeError();
    }, 2000);
    return () => clearTimeout(timeout);
  });

  useEffect(() => {
    errorRef.current = error;
  }, [error]);

  return (
    <Portal>
      <Transition
        show={!!error}
        class="fixed top-5 left-2/4 transform -translate-x-1/2"
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {error ?? errorRef.current}
        <button onClick={handleClick}>Close Modal</button>
      </Transition>
    </Portal>
  );
};

export default ApiErrorNotification;
