import { makeStyles, Theme } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) => ({
  button: {
    width: "100%",
  },
  content: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: ({ progressWidth }: { progressWidth: number }) =>
      `translateX(${(-theme.spacing(1) - progressWidth) / 2}px)`,
  },
  progress: ({
    progressWidth,
    pending,
  }: {
    progressWidth: number;
    pending: boolean;
  }) => ({
    width: progressWidth,
    height: progressWidth,
    opacity: pending ? 1 : 0,
    marginRight: theme.spacing(1),
  }),
  children: {
    display: "flex",
    alignItems: "center",
    "& > *:first-child": {
      marginRight: theme.spacing(1),
    },
  },
}));
