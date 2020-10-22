import { makeStyles, Theme } from "@material-ui/core/styles";
import { isNil } from "lodash";

export const useStyles = makeStyles((theme: Theme) => ({
  root: ({ color }: { color: string | null }) => ({
    backgroundColor: !isNil(color) ? color : theme.palette.secondary.light,
  }),
}));
