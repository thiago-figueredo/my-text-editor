export enum EditorMode {
  NORMAL = "NORMAL",
  INSERT = "INSERT",
  COMMAND = "COMMAND",
  VISUAL = "VISUAL",
}

export type EditorCursor = {
  x: { start: number; end: number };
  y: { start: number; end: number };
};

export interface TextEditorState {
  mode: EditorMode;
  cursor: EditorCursor;
  text: string[];
  files: string[];
  currentLine: number;
  lines: { length: number }[];
}
