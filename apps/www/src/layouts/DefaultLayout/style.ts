import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    minHeight: "100vh",
    padding: 0,
    margin: 0,
    maxWidth: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  appBar: {
    boxShadow: "0px 4px 8px 0px rgba(0,0,0,0.1)",
  },
  main: {
    flexGrow: 1,
  },
  children: {
    padding: theme.spacing(6),
    visibility: "visible",
    opacity: 1,
    transition: theme.transitions.create("opacity"),
    "&.hide": {
      visibility: "hidden",
      opacity: 0,
      pointerEvents: "none !important",
    },
  },
}));
