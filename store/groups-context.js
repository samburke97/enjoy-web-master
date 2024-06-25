"use client";

import React, { useState, createContext, useContext } from "react";

export const GroupsContext = createContext({
  modalIsActive: false,
  selectedGroup: null,
  showModalAction: () => {},
  setSelectedGroup: (group) => {},
});

const GroupsContextProvider = (props) => {
  const [modalIsActive, setModalIsActive] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const showModalAction = () => {
    setModalIsActive((prev) => !prev);
  };

  const groupsCtx = {
    modalIsActive,
    selectedGroup,
    showModalAction,
    setSelectedGroup,
  };

  return (
    <GroupsContext.Provider value={groupsCtx}>
      {props.children}
    </GroupsContext.Provider>
  );
};

export default GroupsContextProvider;
