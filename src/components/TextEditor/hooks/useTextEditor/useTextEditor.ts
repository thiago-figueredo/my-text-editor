import { KeyboardEvent, useState } from "react";
import { BRACKETS, OPEN_BRACKETS, OPEN_TAGS, TAGS } from "../../contants";
import { EditorMode, TextEditorState } from "../../types";
import { UseTextEditorResult, useTextEditorProps } from "./types";

export const useTextEditor = ({
  initialX,
  initialY,
}: useTextEditorProps): UseTextEditorResult => {
  const [state, setState] = useState<TextEditorState>({
    mode: EditorMode.NORMAL,
    files: [],
    text: [],
    lines: [],
    currentLine: 0,
    cursor: {
      x: { start: initialX, end: initialX },
      y: { start: initialY, end: initialY },
    },
  });

  const { text, cursor, mode, lines, currentLine } = state;

  const handleBackspace = () => {
    let currentText = text.slice(0, text.length - 1);

    const currentCursor = {
      ...cursor,
      x: {
        start: Math.max(cursor.x.end - 1, 0),
        end: Math.max(cursor.x.end - 1, 0),
      },
    };

    if (cursor.x.start === initialX && cursor.x.end === initialX) {
      return setState({
        ...state,
        lines: lines.splice(currentLine, 1),
        text: currentText,
      });
    } else if (cursor.x.start !== cursor.x.end) {
      return setState({
        ...state,
        lines: lines.splice(currentLine, 1),
        cursor: {
          ...cursor,
          x: {
            start: cursor.x.start,
            end: cursor.x.start,
          },
        },
        text: text.slice(0, currentCursor.x.start),
      });
    }

    setState({
      ...state,
      text: currentText,
      cursor: currentCursor,
    });
  };

  const handleInsertMode = (event: KeyboardEvent) => {
    if (
      event.key === "Escape" ||
      event.code === "Escape" ||
      event.key === "["
    ) {
      return setState({ ...state, mode: EditorMode.NORMAL });
    }

    if (event.key.length !== 1) {
      return;
    }

    if (event.key === "Enter") {
      return setState({
        ...state,
        lines: [...lines, { length: 0 }],
        currentLine: currentLine + 1,
        cursor: {
          x: { start: 0, end: 0 },
          y: { start: cursor.y.start + 1, end: cursor.y.start + 1 },
        },
      });
    }

    if (OPEN_BRACKETS.includes(event.key)) {
      return setState({
        ...state,
        text: [
          ...text,
          event.key,
          BRACKETS[event.key as keyof typeof BRACKETS],
        ],
        lines:
          lines.length > 0
            ? lines.map((line, index) => {
                return index === currentLine
                  ? { length: line.length + 2 }
                  : line;
              })
            : [{ length: 2 }],
        cursor: {
          ...cursor,
          x: { start: cursor.x.start + 1, end: cursor.x.end + 1 },
        },
      });
    }

    if (OPEN_TAGS.includes(event.key)) {
      return setState({
        ...state,
        text: [...text, event.key, TAGS[event.key as keyof typeof TAGS]],
        lines:
          lines.length > 0
            ? lines.map((line, index) => {
                return index === currentLine
                  ? { length: line.length + 2 }
                  : line;
              })
            : [{ length: 2 }],
        cursor: {
          ...cursor,
          x: { start: cursor.x.start + 1, end: cursor.x.end + 1 },
        },
      });
    }

    const newText = cursor.x.end < text.length ? [] : [...text];

    if (cursor.x.end < text.length) {
      for (let i = 0; i < text.length; ++i) {
        const c = text[i];

        if (i === cursor.x.end) {
          newText.splice(i, 0, event.key);
          newText.push(c);
        } else {
          newText.push(c);
        }
      }
    } else {
      newText.push(event.key);
    }

    setState({
      ...state,
      text: newText,
      lines:
        lines.length > 0
          ? lines.map((line, index) => {
              return index === currentLine ? { length: line.length + 1 } : line;
            })
          : [{ length: 1 }],
      cursor: {
        ...cursor,
        x: { start: cursor.x.start + 1, end: cursor.x.end + 1 },
      },
    });
  };

  const handleNormalMode = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "i") {
      return setState({
        ...state,
        mode: EditorMode.INSERT,
      });
    }

    if (event.key === "a") {
      return setState({
        ...state,
        mode: EditorMode.INSERT,
        cursor: {
          ...cursor,
          x: { start: cursor.x.start + 1, end: cursor.x.end + 1 },
        },
      });
    }

    if (event.key === "A") {
      return setState({
        ...state,
        mode: EditorMode.INSERT,
        cursor: {
          ...cursor,
          x: { start: cursor.x.start + 1, end: cursor.x.end + 1 },
        },
      });
    }

    if (event.key === "o") {
      return setState({
        ...state,
        cursor: {
          ...cursor,
          x: { start: 0, end: 0 },
          y: { start: cursor.y.start + 1, end: cursor.y.end + 1 },
        },
      });
    }

    if (event.key === "0") {
      return setState({
        ...state,
        cursor: { ...cursor, x: { start: 0, end: 0 } },
      });
    }

    if (event.key === "$") {
      return setState({
        ...state,
        cursor: { ...cursor, x: { start: text.length, end: text.length } },
      });
    }

    switch (event.key) {
      case "h":
        return setState({
          ...state,
          cursor: {
            ...cursor,
            x: {
              start: Math.max(cursor.x.start - 1, initialX),
              end: Math.max(cursor.x.end - 1, initialX),
            },
          },
        });
      case "j":
        return setState({
          ...state,
          cursor: {
            ...cursor,
            y: {
              start: Math.min(cursor.x.start + 1, lines.length),
              end: Math.min(cursor.x.end + 1, lines.length),
            },
          },
        });
      case "k":
        return setState({
          ...state,
          cursor: {
            ...cursor,
            y: {
              start: Math.max(cursor.y.start - 1, initialY),
              end: Math.max(cursor.y.end - 1, initialY),
            },
          },
        });
      case "l":
        return setState({
          ...state,
          cursor: {
            ...cursor,
            x: {
              start: Math.min(cursor.x.start + 1, text.length + 1),
              end: Math.min(cursor.x.end + 1, text.length + 1),
            },
          },
        });
    }

    if (event.key === "V") {
      return setState({
        ...state,
        mode: EditorMode.VISUAL,
      });
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Backspace") {
      return handleBackspace();
    }

    if (mode === EditorMode.NORMAL) {
      return handleNormalMode(event);
    }

    if (mode === EditorMode.INSERT) {
      handleInsertMode(event);
    }
  };

  console.log(JSON.stringify({ state }));

  return {
    state,
    onKeyDown,
  };
};
