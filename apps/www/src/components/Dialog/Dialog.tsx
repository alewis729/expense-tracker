import React from "react";
import {
  Dialog as MuiDialog,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { CloseRounded as IconClose } from "@material-ui/icons";

import { Theme } from "@material-ui/core/styles";
import { DialogProps as MuiDialogProps } from "@material-ui/core/Dialog";

import { useStyles } from "./style";
import { Button } from "@/components";

interface Props extends MuiDialogProps {
  title: string;
  onClose?: () => void;
  buttonText: string;
  ButtonProps?: unknown;
}

const Dialog: React.FC<Props> = props => {
  const {
    title,
    onClose = () => {},
    children,
    buttonText,
    ButtonProps,
    ...other
  } = props;
  const classes = useStyles();
  const isSmUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("sm"));

  return (
    <MuiDialog
      maxWidth="md"
      fullScreen={!isSmUp}
      onClose={onClose}
      transitionDuration={350}
      PaperProps={{ className: classes.paper }}
      {...other}
    >
      <DialogContent>
        <IconButton
          className={classes.closeButton}
          size="small"
          onClick={onClose}
        >
          <IconClose fontSize="small" />
        </IconButton>
        <Typography className={classes.title} variant="h6" gutterBottom>
          {title}
        </Typography>
        <div>{children}</div>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Button {...ButtonProps}>{buttonText}</Button>
      </DialogActions>
    </MuiDialog>
  );
};

export default Dialog;
