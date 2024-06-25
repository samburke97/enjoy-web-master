"use client";

import React, { useContext, ReactNode } from "react";
import ReactDOM from "react-dom";
import { UIContext } from "../../store/ui-context";

interface ModalProps {
  children?: ReactNode;
  content: React.ComponentType<any>; // Component type for the modal content
}

export const Background = () => {
  const UICtx = useContext(UIContext);

  return (
    <div
      className="absolute top-0 left-0 w-full h-screen bg-modal z-10"
      onClick={UICtx.showModalAction}
    ></div>
  );
};

export const Overlay = ({ content: ContentComponent }: ModalProps) => {
  return (
    <div>
      <ContentComponent />
    </div>
  );
};

const Modal = ({ content: ContentComponent, children }: ModalProps) => {
  const UICtx = useContext(UIContext);

  const modalRoot =
    document.getElementById("modal-root") ?? document.createElement("div");

  if (!UICtx.modalIsActive) {
    return null;
  }

  return (
    <>
      {ReactDOM.createPortal(<Background />, modalRoot)}
      {ReactDOM.createPortal(<Overlay content={ContentComponent} />, modalRoot)}
    </>
  );
};

export default Modal;
