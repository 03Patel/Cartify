import React from "react";
import ReactDOM from "react-dom";

function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <div className="relative bg-neutral-900 text-white rounded-lg w-[90%] h-[90%] p-5 shadow-lg">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-md text-lg hover:bg-red-700"
        >
          ✕
        </button>

        {/* Content */}
        {children}
      </div>
    </div>,
    document.getElementById("cart-root")
  );
}

export default Modal;
