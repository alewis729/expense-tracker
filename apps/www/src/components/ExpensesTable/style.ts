import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  table: {
    width: "100%",
  },
  grey: {
    color: theme.palette.grey[500],
  },
  actions: {
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(0.5),
    },
  },
}));
