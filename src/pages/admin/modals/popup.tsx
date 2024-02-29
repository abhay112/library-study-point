
import  { ReactNode } from "react";

interface ModalType {
  children?: ReactNode;
  isOpen?: boolean;
  toggle: () => void;
}

export default function Modal(props: ModalType) {
  return (
    <>
      {props.isOpen && (
        <div className="modal-overlay" onClick={props.toggle}>
          <div onClick={(e) => e.stopPropagation()} className="modal-box">
            <button className="modal-close-btn" onClick={props.toggle}>X</button>
            <div className="modal-overlay-content">
              {props.children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
