import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      width: "80%",
      maxWidth: 650,
    },
  },
  title: {
    marginRight: theme.spacing(4),
  },
  closeButton: {
    position: "absolute",
    top: theme.spacing(3),
    right: theme.spacing(5),
  },
  actions: {
    justifyContent: "center",
    marginTop: theme.spacing(2),
  },
}));
