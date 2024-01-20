import { PropertyValue, createStitches } from "@stitches/react";

export const { styled, css } = createStitches({
  theme: {
    colors: {
      white: "rgba(255, 255, 255, 0.87)",
      black: "#242424",
      green: "#98C379",
    },
    space: {
      1: "5px",
      2: "10px",
      3: "15px",
      4: "20px",
      5: "25px",
      6: "30px",
      7: "35px",
      8: "40px",
    },
    fontSizes: {
      1: "12px",
      2: "13px",
      3: "15px",
      4: "20px",
      5: "25px",
      6: "30px",
      7: "35px",
      8: "40px",
    },
    fonts: {
      untitled: "Untitled Sans, apple-system, sans-serif",
      mono: "Söhne Mono, menlo, monospace",
    },
    fontWeights: {},
    lineHeights: {},
    letterSpacings: {},
    sizes: {},
    borderWidths: {},
    borderStyles: {},
    radii: {},
    shadows: {},
    zIndices: {},
    transitions: {},
  },
  utils: {
    b: (value: PropertyValue<"background">) => ({
      background: value,
    }),

    p: (value: PropertyValue<"padding">) => ({
      padding: value,
    }),

    pt: (value: PropertyValue<"paddingTop">) => ({
      paddingTop: value,
    }),

    pr: (value: PropertyValue<"paddingRight">) => ({
      paddingRight: value,
    }),

    pb: (value: PropertyValue<"paddingBottom">) => ({
      paddingBottom: value,
    }),

    pl: (value: PropertyValue<"paddingLeft">) => ({
      paddingLeft: value,
    }),

    px: (value: PropertyValue<"paddingLeft">) => ({
      paddingLeft: value,
      paddingRight: value,
    }),

    py: (value: PropertyValue<"paddingTop">) => ({
      paddingTop: value,
      paddingBottom: value,
    }),

    m: (value: PropertyValue<"margin">) => ({
      margin: value,
    }),

    mt: (value: PropertyValue<"marginTop">) => ({
      marginTop: value,
    }),

    mr: (value: PropertyValue<"marginRight">) => ({
      marginRight: value,
    }),

    mb: (value: PropertyValue<"marginBottom">) => ({
      marginBottom: value,
    }),

    ml: (value: PropertyValue<"marginLeft">) => ({
      marginLeft: value,
    }),

    mx: (value: PropertyValue<"marginLeft">) => ({
      marginLeft: value,
      marginRight: value,
    }),

    my: (value: PropertyValue<"marginTop">) => ({
      marginTop: value,
      marginBottom: value,
    }),

    ta: (value: PropertyValue<"textAlign">) => ({ textAlign: value }),

    fw: (value: PropertyValue<"fontWeight">) => ({
      fontWeight: value,
    }),

    w: (value: PropertyValue<"width">) => ({
      width: value,
    }),

    h: (value: PropertyValue<"width">) => ({
      height: value,
    }),

    size: (value: PropertyValue<"width">) => ({
      width: value,
      height: value,
    }),
  },
});
