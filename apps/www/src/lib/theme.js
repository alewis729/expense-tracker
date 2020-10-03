import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const options = {
  palette: {
    primary: {
      main: "#2196f3",
    },
    secondary: {
      main: "#00e676",
    },
    background: {
      default: "#fff",
    },
  },
};

export const theme = responsiveFontSizes(createMuiTheme(options));
