import { KeyboardEvent } from "react";
import { TextEditorState } from "../../types";

export interface UseTextEditorResult {
  state: TextEditorState;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}

export interface useTextEditorProps {
  initialX: number;
  initialY: number;
}
