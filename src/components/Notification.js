import Portal from './Portal';
import tickIcon from '../images/tick.png';
import useModal from '../common/hooks/useModal';
import alertIcon from '../images/alert.png';
import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';

const Notification = () => {
  const { message, removeMessage } = useModal();
  const handleClick = () => removeMessage();

  const [messageToDisplay, setMessageToDisplay] = useState({});

  useEffect(() => {
    if (!message) return;
    setMessageToDisplay(message);
  }, [message]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeMessage();
    }, 3000);
    return () => clearTimeout(timeout);
  });

  return (
    <Portal>
      <Transition
        show={!!message}
        className="w-max max-w-sm sm:max-w-max rounded fixed top-5 left-2/4 transform -translate-x-1/2 flex flex-col justify-center items-center shadow"
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {messageToDisplay.type === 'success' ? (
          <div className="flex items-center self-start bg-green-600 w-full px-4 py-1.5 text-white font-bold rounded-t gap-2">
            <img className="w-8 h-8" src={tickIcon} alt="Tick icon" />
            Success!
          </div>
        ) : (
          <div className="flex items-center self-start bg-red-500 w-full px-4 py-1.5 text-white font-bold rounded-t gap-2">
            <img className="w-8 h-8" src={alertIcon} alt="Warning icon" />
            An error has occured!
          </div>
        )}
        <div className="bg-white w-full px-4 py-4 text-center">
          {messageToDisplay.message}
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

export default Notification;
