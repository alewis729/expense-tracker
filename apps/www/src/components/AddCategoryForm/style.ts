import { makeStyles, Theme } from "@material-ui/core/styles";
import { isNil } from "lodash";

export const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
  },
  categoryColorField: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  categoryColor: {
    backgroundColor: ({ color }: { color: string }) =>
      isNil(color) ? theme.palette.grey[300] : color,
    transition: "all .25s ease",
    borderRadius: "100%",
    width: theme.spacing(5),
    height: theme.spacing(5),
    flexShrink: 0,
    marginLeft: theme.spacing(2),
  },
}));
