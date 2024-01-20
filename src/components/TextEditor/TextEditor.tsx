import { FC } from "react";
import { styled } from "../../stitches.config";
import { Box } from "../Box";
import { CURSOR_HEIGHT, CURSOR_WIDTH, Cursor } from "../Cursor";
import { Flex } from "../Flex";
import { Span } from "../Span";
import { useTextEditor } from "./hooks/useTextEditor";
import { EditorMode } from "./types";

export const TextEditorRoot = styled("textarea", {
  width: "100%",
  height: "85vh",
  outline: "none",
  caretColor: "transparent",
  border: "none",
});

export const TextEditor: FC<{}> = () => {
  const initialX = 0;
  const initialY = 0;
  const { state, onKeyDown } = useTextEditor({ initialX, initialY });
  const { text, cursor, mode, files } = state;

  const getStatusLineBackground = () => {
    if (mode === EditorMode.NORMAL) {
      return "$white";
    }

    if (mode === EditorMode.INSERT) {
      return "$green";
    }

    return undefined;
  };

  return (
    <Box css={{ position: "relative", pb: "$5" }}>
      {files.length > 0 && (
        <Flex style={{ border: "1px solid $white", paddingLeft: "$2" }}>
          {files.map((file) => (
            <Span css={{ border: "1px solid $white", p: "$1" }} key={file}>
              {file}
            </Span>
          ))}
        </Flex>
      )}

      <TextEditorRoot
        onChange={() => null}
        onKeyDown={onKeyDown}
        value={text.join("")}
      >
        {text}
      </TextEditorRoot>

      <Cursor
        css={{
          position: "absolute",
          mt: "3px",
          left: cursor.x.end * CURSOR_WIDTH,
          top: cursor.y.end * CURSOR_HEIGHT,

          // left:
          //   cursor.x.end === 0
          //     ? (cursor.x.end + 1) * CURSOR_WIDTH
          //     : cursor.x.end * CURSOR_WIDTH,
          // top: cursor.y.end * CURSOR_HEIGHT,
        }}
      />

      <Box
        css={{
          padding: "0.3rem",
          textAlign: "start",
          fontSize: "0.9rem",
          position: "absolute",
          bottom: -10,
          fontWeight: "500",
          color: "#303030",
          background: getStatusLineBackground(),
          left: 0,
        }}
      >
        {mode}
      </Box>
    </Box>
  );
};
