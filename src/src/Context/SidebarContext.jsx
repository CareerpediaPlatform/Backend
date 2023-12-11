import { useState, createContext } from "react";

export const SideBarContext = createContext();

const SidebarContext = ({ children }) => {
  const [close, setClose] = useState(false);

  const handleSidebarView = () => {
    setClose(!close);
  };

  return (
    <SideBarContext.Provider value={{ close, handleSidebarView }}>
      {children}
    </SideBarContext.Provider>
  );
};

export default SidebarContext;
