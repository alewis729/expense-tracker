import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100vw",
    minHeight: "100vh",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
  },
  imageContainerSmall: {
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    maxWidth: `${theme.breakpoints.values.sm * 0.75}px`,
    zIndex: -1,
    ...imageOverlay(theme.palette.primary.dark),
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      zIndex: -1,
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "none",
      width: "75%",
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  paper: {
    display: "flex",
    alignItems: "stretch",
    overflow: "hidden",
    maxWidth: 400,
    margin: "0 auto",
    [theme.breakpoints.up("md")]: {
      maxWidth: "none",
    },
  },
  imageContainer: {
    display: "none",
    position: "relative",
    ...imageOverlay(theme.palette.primary.dark),
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      zIndex: -1,
    },
    [theme.breakpoints.up("md")]: {
      display: "block",
      width: "70%",
    },
  },
  formContainer: {
    padding: theme.spacing(6, 4),
    [theme.breakpoints.up("md")]: {
      flexShrink: 0,
      width: "30%",
      minWidth: 350,
      maxWidth: 400,
    },
  },
  form: {
    textAlign: "center",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));

const imageOverlay = (background = "black") => ({
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background,
    opacity: 0.4,
  },
});
