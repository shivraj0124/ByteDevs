import React, { createContext, useContext, useEffect, useState } from "react";
const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [siteMode, setSiteMode] = useState(
    localStorage.getItem("siteMode") || "dark"
  );
  const [locationDetails, setLocationDetails] = useState();
  const [eventDetails, setEventDetails] = useState();

  const value = {
    siteMode,
    setSiteMode,
    locationDetails,
    setLocationDetails,eventDetails,setEventDetails
  };

  useEffect(() => {
    localStorage.setItem("siteMode", siteMode);
  }, [siteMode]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

const myHook = () => {
  const context = useContext(Context);
  return context;
};

export default myHook;
