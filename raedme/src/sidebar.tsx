import { Box, List, ListItem } from "@chakra-ui/react";
import { useCallback, useContext, useEffect, useRef } from "react";
import { ModalContext } from "./modalContext";
import Note from "./note"

const Sidebar = () => {
  const sidebarWrapRef = useRef<any>();
  const sidebarContentRef = useRef<any>();
  const [modalState] = useContext<any>(ModalContext);

  const updateSidebarContentWidth = useCallback(() => {
    if (!sidebarWrapRef.current) return;

    // get percentage from 0 to 1
    const u = modalState.sidebarWidth / 100;

    // highest width of scrollbar among browsers
    const scrollbarWidth = 1;

    const width = sidebarWrapRef.current.parentElement.clientWidth * u - scrollbarWidth;

    if (width > 0) {
      sidebarContentRef.current.style.width = width + "px";
    }
  }, [modalState.sidebarWidth]);

  useEffect(() => {
    setTimeout(updateSidebarContentWidth, modalState.duration);

    window.addEventListener("resize", updateSidebarContentWidth);

    return () => {
      window.removeEventListener("resize", updateSidebarContentWidth);
    };
  }, [modalState.duration, updateSidebarContentWidth]);

  return (
    <Box
      ref={sidebarWrapRef}
      w={modalState.sidebarIsOpen ? `${modalState.sidebarWidth}%` : "0"}
      transition={`width ${modalState.duration}s ease`}
      overflow="hidden"
    >
      <Box ref={sidebarContentRef} overflow="auto" h="100%">
        <List spacing={3} p={5}>
          <Note url={modalState.currentUrl} />
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
