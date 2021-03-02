import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
  },
  amount: {
    [theme.breakpoints.up("md")]: {
      width: `calc(50% - ${theme.spacing(2)}px)`,
      marginRight: theme.spacing(2),
    },
  },
  currency: {
    [theme.breakpoints.up("md")]: {
      width: "50%",
    },
  },
}));
