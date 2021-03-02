import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  menuIcon: {
    marginRight: theme.spacing(2),
  },
  logoContainer: {
    flexGrow: 1,
  },
  typography: {
    fontWeight: theme.typography.fontWeightBold,
    color: theme.palette.grey.A400,
  },
}));
