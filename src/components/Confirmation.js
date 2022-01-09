import Portal from './Portal';
import { Transition } from '@headlessui/react';

const Confirmation = (props) => {
  const {
    confirmationMessage,
    showConfirmation,
    setShowConfirmation,
    handleClick,
  } = props;
  return (
    <Portal>
      <Transition
        show={showConfirmation}
        className="w-max max-w-sm sm:max-w-max rounded fixed top-5 left-2/4 transform -translate-x-1/2 flex flex-col justify-center items-center shadow"
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="flex items-center justify-center bg-gray-500 w-full px-4 py-1.5 text-white font-bold rounded-t gap-2">
          Are you sure?
        </div>
        <div className="bg-white w-full px-4 py-4 text-center">
          {confirmationMessage}
        </div>
        <div className="flex w-full bg-white">
          <button
            className="cursor-pointer w-full px-4 py-1.5 bg-gray-200 hover:text-white hover:bg-red-700 transition-colors duration-300 ease-in-out"
            onClick={handleClick}
          >
            Yes!
          </button>
          <button
            className="cursor-pointer w-full px-4 py-1.5 bg-gray-200 border-l border-gray-300 hover:bg-gray-300 transition-colors duration-300 ease-in-out"
            onClick={() => setShowConfirmation(false)}
          >
            No!
          </button>
        </div>
      </Transition>
    </Portal>
  );
};

export default Confirmation;
