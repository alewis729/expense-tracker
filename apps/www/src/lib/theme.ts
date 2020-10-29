import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeOptions,
} from "@material-ui/core/styles";

const options: ThemeOptions = {
  palette: {
    primary: {
      dark: "#2196f3",
      main: "#03a9f4",
      light: "#26BCFF",
      contrastText: "#fff",
    },
    secondary: {
      main: "#673ab7",
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
  props: {
    MuiButton: {
      color: "primary",
      variant: "contained",
      disableElevation: true,
      size: "large",
    },
    MuiTextField: {
      variant: "outlined",
    },
  },
};

export const theme = responsiveFontSizes(createMuiTheme(options));
