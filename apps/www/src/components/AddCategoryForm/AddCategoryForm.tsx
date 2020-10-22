import React, { Fragment, useEffect } from "react";
import { colors } from "@expense-tracker/data";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty, find, map } from "lodash";
import {
  Select,
  TextField,
  FormHelperText,
  InputLabel,
  FormControl,
} from "@material-ui/core";

import { useStyles } from "./style";
import { schema, fields, initialValues } from "./formData";

type FormFields = {
  name: string;
  color: string;
};

interface Props {
  defaultValues?: FormFields;
  onSubmit: (data: FormFields) => void;
}

type Field = {
  type: string;
  name: "name" | "color";
  label: string;
  placeholder: string;
};

const AddCategoryForm: React.FC<Props> = props => {
  const { defaultValues = initialValues, onSubmit } = props;
  const {
    control,
    handleSubmit,
    setValue,
    errors,
    register,
    trigger,
    watch,
    formState,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const watchedColor = watch("color");
  const { isSubmitting } = formState;
  const classes = useStyles({
    color: isEmpty(watchedColor)
      ? null
      : find(colors, ({ id }) => id === watchedColor)?.hex,
  });

  useEffect(() => {
    register({ name: "color" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderField = ({ type, name, label, placeholder }: Field) => {
    const error = !isEmpty(errors[name]);
    const helperText = error ? errors?.[name]?.message : null;
    const options = colors;

    if (type === "select") {
      return (
        <div className={classes.categoryColorField}>
          <FormControl
            fullWidth
            variant="outlined"
            error={error}
            disabled={isSubmitting}
            margin="normal"
          >
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <Select
              native
              label={label}
              name={name}
              defaultValue={defaultValues[name]}
              placeholder={placeholder}
              onChange={e => {
                setValue(name, e.target?.value as string);
                trigger(name);
              }}
              inputProps={{ name, id: name }}
            >
              <option aria-label="None" value="" />
              {map(options, option => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>
            {error && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
          <div className={classes.categoryColor} />
        </div>
      );
    }

    return (
      <Controller
        control={control}
        as={TextField}
        name={name}
        type={type}
        label={label}
        placeholder={placeholder}
        fullWidth
        margin="normal"
        disabled={isSubmitting}
        helperText={helperText}
        error={error}
      />
    );
  };

  return (
    <form
      id="add_category_form"
      className={classes.root}
      onSubmit={handleSubmit(onSubmit)}
    >
      {map(fields, (field, id) => (
        <Fragment key={id}>{renderField(field as Field)}</Fragment>
      ))}
    </form>
  );
};

export default AddCategoryForm;