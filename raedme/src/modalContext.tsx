import { createContext, useState } from "react";

export const ModalContext = createContext<any>(null);

const Provider = ({ children } : any) => {
  const [modalState, setModalState] = useState({
    mainWidth: 50, // %
    sidebarWidth: 50, // %
    duration: 0.5, // transition
    sidebarIsOpen: false, // on start
    currentUrl: "",
  });
  return (
    <ModalContext.Provider value={[modalState, setModalState]}>
      {children}
    </ModalContext.Provider>
  );
};

export default Provider;
