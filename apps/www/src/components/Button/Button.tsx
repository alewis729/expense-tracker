import React from "react";
import { Button as MuiButton, CircularProgress } from "@material-ui/core";
import { ButtonProps as MuiButtonProps } from "@material-ui/core/Button";

import { useStyles } from "./style";

interface Props extends MuiButtonProps {
  pending?: boolean;
}

const Button: React.FC<Props> = ({
  pending = false,
  disabled,
  children,
  ...props
}) => {
  const progressSize = 20;
  const classes = useStyles({ progressSize, pending });

  return (
    <MuiButton {...props} disabled={pending || disabled}>
      <div className={classes.content}>
        <div className={classes.progress} data-testid="progress">
          {pending && <CircularProgress size={progressSize} color="inherit" />}
        </div>
        <div>{children}</div>
      </div>
    </MuiButton>
  );
};

export default Button;
