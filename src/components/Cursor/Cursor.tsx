import { keyframes } from "@stitches/react";
import { FC } from "react";
import { styled } from "../../stitches.config";
import { EditorMode } from "../TextEditor/types";
import { CursorProps } from "./types";

const blink = keyframes({
  "50%": {
    background: "transparent",
  },
});

export const CURSOR_WIDTH = 8;
export const CURSOR_HEIGHT = 15;

export const CursorRoot = styled("div", {
  width: `${CURSOR_WIDTH}px`,
  height: `${CURSOR_HEIGHT}px`,
  background: "$white",
  animation: `${blink} 1s infinite`,
  variants: {
    shape: {
      [EditorMode.NORMAL]: {},
      [EditorMode.COMMAND]: {},
      [EditorMode.VISUAL]: {},
      [EditorMode.INSERT]: {
        width: `1px`,
      },
    },
  },
  defaultVariants: {
    shape: "normal",
  },
});

export const Cursor: FC<CursorProps> = (props) => {
  return <CursorRoot {...props}></CursorRoot>;
};
