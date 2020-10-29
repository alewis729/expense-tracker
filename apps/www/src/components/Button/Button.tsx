import React from "react";
import { Button as MuiButton, CircularProgress } from "@material-ui/core";
import { ButtonProps as MuiButtonProps } from "@material-ui/core/Button";

import { useStyles } from "./style";

interface Props extends MuiButtonProps {
  pending?: boolean;
}

const Button: React.FC<Props> = ({ pending, children, ...props }) => {
  const progressWidth = 20;
  const classes = useStyles({ progressWidth, pending });

  return (
    <MuiButton {...props} disabled={pending}>
      <div className={classes.content}>
        <div className={classes.progress}>
          {pending && <CircularProgress size={progressWidth} color="inherit" />}
        </div>
        <div>{children}</div>
      </div>
    </MuiButton>
  );
};

export default Button;
