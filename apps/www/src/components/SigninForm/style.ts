import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
  },
  submit: {
    marginTop: theme.spacing(3),
  },
}));
