import { createContext } from "react";

type DropdownContextProps = {
  isOpen: boolean;
  autoClose: boolean;
  closeMenu: () => void;
}

export const DropdownContext = createContext<DropdownContextProps>({
  isOpen: false,
  autoClose: false,
  closeMenu: () => {},
});