"use client";

import React, { useState, useEffect } from "react";

export const UIContext = React.createContext({
  showModalAction: () => {},
  modalIsActive: false,
  changeThemeHandler: () => {},
  darkMode: false,
});

const UIContextProvider = (props) => {
  const [darkMode, setDarkMode] = useState(false);

  const changeThemeHandler = () => {
    setDarkMode(!darkMode);
  };

  //Store users preferred theme

  useEffect(() => {
    const preferredTheme = localStorage.getItem("theme");

    if (preferredTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  //Add theme

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");

    const htmlClasses = document.querySelector("html").classList;
    if (darkMode) {
      htmlClasses.add("dark");
    } else {
      htmlClasses.remove("dark");
    }
  }, [darkMode]);

  //Show Modal

  const [modalIsActive, setModalIsActive] = useState(false);

  const showModalHandler = () => {
    setModalIsActive(!modalIsActive);
  };

  const authCtx = {
    darkMode,
    changeThemeHandler,
    modalIsActive,
    showModalAction: showModalHandler,
  };

  return (
    <UIContext.Provider value={authCtx}>{props.children}</UIContext.Provider>
  );
};

export default UIContextProvider;
