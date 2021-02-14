import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  list: {
    paddingTop: theme.spacing(2),
  },
  item: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(8),

    "& .MuiSvgIcon-root": {
      fill: theme.palette.primary.main,
    },
    "&#expenses .MuiSvgIcon-root": {
      fill: theme.palette.error.main,
    },
    "&#income .MuiSvgIcon-root": {
      fill: theme.palette.success.main,
    },
  },
}));
