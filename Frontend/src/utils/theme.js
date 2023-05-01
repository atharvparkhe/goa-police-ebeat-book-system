import { createTheme } from "@mui/material/styles";

// MUI theme object
let theme = createTheme({
  palette: {
    primary: {
      main: "#0008C1",
      contrastText: "#ffffff",
    },
    contrastThreshold: 4.5,
    tonalOffset: 0.2,
    secondary: {
      main: "#2146C7",
      contrastText: "#ffffff",
    },
    ocean: {
      main: "#99B5FF",
      light: "#DEE7FF",
      background: "#EEF8FF",
    },
    neutral: {
      main: "#c9a37c",
      shade: "#E3BD96",
      light: "#F7F7F2",
    },
    warning: {
      main: "#ffca28",
      light: "#fff59d",
      dark: "#fdd835",
    },
  },
  typography: {
    fontFamily: [
      "Poppins",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

theme = createTheme({
  ...theme,
  components: {
    MuiCard: {
      variants: [
        {
          props: { variant: "blue-elevate" },
          style: {
            boxShadow: `0px 1px 4px 0 ${theme.palette.ocean.light}`,
            borderRadius: 8,
          },
        },
      ],
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgb(230, 242, 255, 0.3)"
        },
      },
    }
  },
});

export default theme;
