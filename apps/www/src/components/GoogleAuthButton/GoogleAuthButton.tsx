import React from "react";
import {
  Button as MuiButton,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { ButtonProps as MuiButtonProps } from "@material-ui/core/Button";

import { useStyles } from "./style";
import { IconGoogle } from "@/components/Icons";

interface Props extends MuiButtonProps {
  pending?: boolean;
  label?: string;
}

const GoogleAuthButton: React.FC<Props> = ({
  pending = false,
  label = "Authenticate with Google",
  ...props
}) => {
  const progressWidth = 20;
  const classes = useStyles({ progressWidth, pending });

  return (
    <MuiButton
      {...props}
      variant="outlined"
      disabled={pending}
      className={classes.button}
    >
      <div className={classes.content}>
        <div className={classes.progress}>
          {pending && <CircularProgress size={progressWidth} color="inherit" />}
        </div>
        <div className={classes.children}>
          <IconGoogle fontSize="small" />
          <Typography variant="button">{label}</Typography>
        </div>
      </div>
    </MuiButton>
  );
};

export default GoogleAuthButton;
