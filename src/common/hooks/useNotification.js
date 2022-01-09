import { useContext } from 'react';
import { NotificationContext } from '../providers/NotificationProvider';

const useNotification = () => {
  const { message, addMessage, removeMessage } =
    useContext(NotificationContext);
  return { message, addMessage, removeMessage };
};

export default useNotification;
