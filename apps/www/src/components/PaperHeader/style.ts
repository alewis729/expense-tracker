import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(2, 3),
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(3),
    },
  },
  actions: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    flexGrow: 1,
    justifyContent: "flex-end",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
}));
