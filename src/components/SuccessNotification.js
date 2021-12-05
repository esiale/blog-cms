import Portal from './Portal';
import tickIcon from '../images/tick.png';
import useModal from '../common/hooks/useModal';
import { useEffect, useRef } from 'react';
import { Transition } from '@headlessui/react';

const SuccessNotification = () => {
  const { message, removeMessage } = useModal();
  const handleClick = () => removeMessage();

  const messageRef = useRef('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeMessage();
    }, 3000);
    return () => clearTimeout(timeout);
  });

  useEffect(() => {
    messageRef.current = message;
  }, [message]);

  return (
    <Portal>
      <Transition
        show={!!message && message.type === 'success'}
        class="w-max max-w-sm sm:max-w-max rounded fixed top-5 left-2/4 transform -translate-x-1/2 flex flex-col justify-center items-center shadow"
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex items-center self-start bg-green-600 w-full px-4 py-1.5 text-white font-bold rounded-t gap-2">
          <img className="w-8 h-8" src={tickIcon} alt="Tick icon" />
          Success!
        </div>
        <div className="bg-white px-4 py-4 text-center">
          {message ? message.message : messageRef.current.message}
        </div>
        <button
          className="cursor-pointer w-full px-4 py-1.5 bg-gray-100"
          onClick={handleClick}
        >
          Dismiss
        </button>
      </Transition>
    </Portal>
  );
};

export default SuccessNotification;
