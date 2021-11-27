import useApiError from '../common/hooks/useApiError';
import Modal from './Modal';
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
    <Modal>
      <Transition
        show={!!error}
        class="fixed top-10"
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
    </Modal>
  );
};

export default ApiErrorNotification;
