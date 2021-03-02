import React from "react";
import { find, isEmpty, map } from "lodash";
import { v4 as uuidv4 } from "uuid";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@material-ui/core";
import { SelectProps as MuiSelectProps } from "@material-ui/core/Select";
import { FormControlProps } from "@material-ui/core/FormControl";

import { SelectOption as Option } from "@/lib/types";

interface Props extends Omit<MuiSelectProps, "onChange"> {
  options: Option[];
  onChange: (option: Option) => void;
  formControlProps?: FormControlProps;
}

const Select: React.FC<Props> = ({
  label,
  options,
  value,
  onChange,
  formControlProps,
  ...props
}) => {
  const selectId = uuidv4();

  return (
    <FormControl fullWidth variant="outlined" {...formControlProps}>
      {!isEmpty(label) && <InputLabel id={selectId}>{label}</InputLabel>}
      <MuiSelect
        labelId={selectId}
        label={label}
        value={value ?? ""}
        onChange={(e: React.ChangeEvent<{ value: string }>) =>
          onChange(
            find(
              options,
              ({ value }: Option) => value === e.target.value
            ) as Option
          )
        }
        {...props}
      >
        {map(options, option => (
          <MenuItem key={option.value ?? uuidv4()} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  );
};

export default Select;
