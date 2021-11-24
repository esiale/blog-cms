import useApiError from '../../common/hooks/useApiError';
import Modal from '../Modal';

const ApiErrorNotification = () => {
  const { error, removeError } = useApiError();

  const handleClick = () => removeError();

  return (
    <Modal open={!!error}>
      <div>{error && error.message}</div>
      <button onClick={handleClick}>Close Modal</button>
    </Modal>
  );
};

export default ApiErrorNotification;
