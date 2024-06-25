"use client";

import React, { useContext, ReactNode } from "react";
import ReactDOM from "react-dom";
import { GroupsContext } from "@/store/groups-context";

interface ModalProps {
  children?: ReactNode;
  content: React.ComponentType<any>;
  modalProps: any;
}

export const Background = () => {
  const groupsCtx = useContext(GroupsContext);

  return (
    <div
      className="absolute top-0 left-0 w-full h-screen bg-modal z-10"
      onClick={groupsCtx.showModalAction}
    ></div>
  );
};

export const Overlay = ({
  content: ContentComponent,
  modalProps,
}: ModalProps) => {
  const groupsCtx = useContext(GroupsContext);

  return (
    <div>
      <ContentComponent {...modalProps} group={groupsCtx.selectedGroup} />
    </div>
  );
};

const GroupsModal = ({ content: ContentComponent, modalProps }: ModalProps) => {
  const groupsCtx = useContext(GroupsContext);

  const modalRoot =
    document.getElementById("modal-root") ?? document.createElement("div");

  if (!groupsCtx.modalIsActive) {
    return null;
  }

  return (
    <>
      {ReactDOM.createPortal(<Background />, modalRoot)}
      {ReactDOM.createPortal(
        <Overlay content={ContentComponent} modalProps={modalProps} />,
        modalRoot
      )}
    </>
  );
};

export default GroupsModal;
