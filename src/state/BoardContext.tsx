import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type Dispatch,
  type ReactNode
} from "react";
import { boardReducer, type BoardAction } from "./boardReducer";
import { loadBoardState, saveBoardState } from "../utils/storage";
import type { BoardState } from "../types";

interface BoardContextValue {
  state: BoardState;
  dispatch: Dispatch<BoardAction>;
}

const BoardContext = createContext<BoardContextValue | undefined>(undefined);

export function BoardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(boardReducer, undefined, loadBoardState);

  useEffect(() => {
    saveBoardState(state);
  }, [state]);

  const value = useMemo(() => ({ state, dispatch }), [state]);

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
}

export function useBoard() {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error("useBoard must be used within BoardProvider");
  }
  return context;
}
