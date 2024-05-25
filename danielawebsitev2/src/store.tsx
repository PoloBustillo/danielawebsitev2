"use client";
import { TerapiasResponseType } from "./lib/types";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactElement,
  ReactNode,
} from "react";

interface ContextProps {
  terapias: TerapiasResponseType | [];
  setTerapias: Dispatch<SetStateAction<TerapiasResponseType | []>>;
}

const GlobalContext = createContext<ContextProps>({
  terapias: [],
  setTerapias: (): TerapiasResponseType[] => [],
});

interface WrapperType {
  children: ReactNode | ReactElement;
}
export const GlobalContextProvider = ({ children }: WrapperType) => {
  const [terapias, setTerapias] = useState<[] | TerapiasResponseType>([]);

  return (
    <GlobalContext.Provider value={{ terapias, setTerapias }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
