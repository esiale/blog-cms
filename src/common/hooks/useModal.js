import { useContext } from 'react';
import { ModalContext } from '../providers/ModalProvider';

const useModal = () => {
  const { message, addMessage, removeMessage } = useContext(ModalContext);
  return { message, addMessage, removeMessage };
};

export default useModal;
