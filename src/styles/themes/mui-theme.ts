import { Color } from "@mui/material";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

interface Accent extends Color {
  main: string;
  900: string;
  800: string;
  700: string;
  600: string;
  500: string;
  400: string;
  300: string;
  200: string;
  100: string;
  50: string;
}

const accent: Accent = {
  main: "#D6663C",
  900: "#ab5435",
  800: "#c75f39",
  700: "#D6663C",
  600: "#e46c40",
  500: "#ef7245",
  400: "#f0845e",
  300: "#f1997a",
  200: "#f4b5a0",
  100: "#f7d1c5",
  50: "#f7d1c5",
  A100: "",
  A200: "",
  A400: "",
  A700: "",
};

interface MyPaletteExtensions {
  accent: Accent;
}

declare module "@mui/material/styles" {
  interface Palette extends MyPaletteExtensions {}
  interface PaletteOptions extends MyPaletteExtensions {}
}

const Byekan = {
  fontFamily: "BYekan",
  src: `
    url(/fonts/BYekan-webfont.ttf) format('ttf')
    url(/fonts/BYekan-webfont.eot) format('eot')
    url(/fonts/BYekan-webfont.woff) format('woff')
  `,
  fontStyle: "normal",
  fontWeight: "normal",
};

let muiTheme = createTheme({
  breakpoints: {
    values: {
      xs: 639,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },
  direction: "rtl",
  typography: {
    fontFamily: "BYekan",
  },
  palette: {
    mode: "dark",
    primary: {
      main: "#3D4241",
      900: "#1c2120",
      800: "#3d4241",
      700: "#5c6160",
      600: "#6f7574",
      500: "#989e9d",
      400: "#b7bdbc",
      300: "#dae0df",
      200: "#e8efed",
      100: "#f0f6f5",
    },
    secondary: {
      main: "#0b171d",
      900: "#0b171d",
      800: "#0E1D25",
      700: "#49555c",
      600: "#5c6870",
      500: "#839098",
      400: "#a4b1b9",
      300: "#c8d5de",
      200: "#d9e7ef",
      100: "#e4f2fa",
    },
    accent,
    background: {
      default: "#141921",
    },
  },
  components: {
    MuiFormLabel: {
      styleOverrides: {
        asterisk: {
          color: "#db3131",
          "&$error": {
            color: "#db3131",
          },
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "@media (min-width:425px)": {
          body: {
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: "#141921",
              width: "10px",
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 0,
              backgroundColor: "#6b6b6b",
              minHeight: 24,
            },
            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover":
              {
                backgroundColor: "#959595",
              },
            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
              backgroundColor: "#2b2b2b",
            },
          },
        },
        "@media (min-width:1024px)": {
          body: {
            overflowY: "scroll",
          },
        },
        body: {
          direction: "rtl",
          padding: 0,
          margin: 0,
          boxSizing: "border-box",
          fontFamily:
            "BYekan, -apple-system,BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,Ubuntu ,Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif",
          lineHeight: 1.5,
          caretColor: "#D6663C",
          // minHeight: "100vh",
        },
        "::-moz-selection": {
          background: "#D6663C",
        },
        "::selection": {
          background: "#D6663C",
        },
        a: {
          color: "inherit",
          textDecoration: "none",
        },
        button: {
          all: "unset",
        },
        "*": {
          boxSizing: "border-box",
        },
        "@global": {
          "@font-face": [Byekan],
        },
      },
    },
  },
});

muiTheme.typography.h4 = {
  fontSize: "20px",
  [muiTheme.breakpoints.up("sm")]: {
    fontSize: "24px",
  },
};
muiTheme.typography.h5 = {
  fontSize: "18px",
  [muiTheme.breakpoints.up("sm")]: {
    fontSize: "22px",
  },
};
muiTheme.typography.h6 = {
  fontSize: "14px",
  [muiTheme.breakpoints.up("sm")]: {
    fontSize: "18px",
  },
};
muiTheme.typography.caption = {
  fontSize: "10px",
  [muiTheme.breakpoints.up("sm")]: {
    fontSize: "12px",
  },
};
muiTheme.typography.body1 = {
  fontSize: "14px",
  [muiTheme.breakpoints.up("sm")]: {
    fontSize: "16px",
  },
};
muiTheme.typography.body2 = {
  fontSize: "12px",
  [muiTheme.breakpoints.up("sm")]: {
    fontSize: "14px",
  },
};

// muiTheme = responsiveFontSizes(muiTheme);

export { muiTheme };
