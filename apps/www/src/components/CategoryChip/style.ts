import { makeStyles } from "@material-ui/core/styles";
import { getColor } from "@/lib/utils";

export const useStyles = makeStyles({
  root: {
    backgroundColor: ({ color }: { color: string | null }) =>
      getColor(color).hex,
  },
});
