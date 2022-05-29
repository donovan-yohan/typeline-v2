import { createContext } from "react";

interface ContextState {
  shade: number;
}

const InitialContextState: ContextState = {
  shade: 5
};

const Context = createContext<ContextState>(InitialContextState);

export default Context;
