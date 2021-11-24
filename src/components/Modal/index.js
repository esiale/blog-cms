import ReactDOM from 'react-dom';

const Modal = ({ children, open }) => {
  if (!open) return null;
  return ReactDOM.createPortal(
    <>{children}</>,
    document.getElementById('portal')
  );
};

export default Modal;
