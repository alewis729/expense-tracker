import React, { useState, useEffect } from "react";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import { TextFieldProps as MuiTextFieldProps } from "@material-ui/core/TextField";
import {
  Visibility as IconVisibility,
  VisibilityOff as IconVisibilityOff,
} from "@material-ui/icons";

interface Props {
  visible?: boolean;
  buttonDisabled?: boolean;
}

const PasswordField = React.forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { visible = false, buttonDisabled = false, ...other } = props;
    const [visibleInner, setVisibleInner] = useState(false);

    useEffect(() => {
      setVisibleInner(visible);
    }, [visible]);

    return (
      <TextField
        {...other}
        inputRef={ref}
        type={visibleInner ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setVisibleInner(!visibleInner)}
                onMouseDown={e => e.preventDefault()}
                disabled={buttonDisabled}
                edge="end"
              >
                {visibleInner ? <IconVisibility /> : <IconVisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  }
);

export default PasswordField;
