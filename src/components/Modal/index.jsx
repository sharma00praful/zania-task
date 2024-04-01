import { useEffect } from "react";
import "./style.css";
const Modal = ({ children, onClose }) => {
  const handleOutsideClick = () => {
    onClose && onClose();
  };
  const handleBodyClick = (e) => {
    e.stopPropagation();
  };
  useEffect(() => {
    const close = (e) => {
      const ESC_KEY_CODE = 27;
      if (e.keyCode === ESC_KEY_CODE) {
        onClose();
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  return (
    <div className="modal-container" onClick={handleOutsideClick}>
      <div className="modal-body" onClick={handleBodyClick}>
        {onClose ? (
          <div className="modal-close-button" onClick={onClose}>
            &times;
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
};
export default Modal;

