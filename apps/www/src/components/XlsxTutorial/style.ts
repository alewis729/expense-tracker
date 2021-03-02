import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
  },
  image: {
    width: "100%",
    margin: theme.spacing(2, 0),
    cursor: "pointer",
  },
  table: {
    width: "100%",
    minWidth: 560,
  },
}));
