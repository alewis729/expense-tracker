import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: ({ progressSize }: { progressSize: number }) =>
      `translateX(${(-theme.spacing(1) - progressSize) / 2}px)`,
  },
  progress: ({
    progressSize,
    pending,
  }: {
    progressSize: number;
    pending: boolean;
  }) => ({
    width: progressSize,
    height: progressSize,
    opacity: pending ? 1 : 0,
    marginRight: theme.spacing(1),
  }),
}));
