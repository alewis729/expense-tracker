import React, { Fragment, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty, map } from "lodash";
import {
  Select,
  TextField,
  FormHelperText,
  InputLabel,
  FormControl,
} from "@material-ui/core";

import { useStyles } from "./style";
import { schema, fields, initialValues } from "./formData";

interface AddExpenseFields {
  name: string;
  description: string | null;
  categoryId: string;
  amount: number;
}

interface Props {
  defaultValues?: AddExpenseFields;
  categories: { id: string; name: string }[];
  onSubmit: (data: AddExpenseFields) => void;
}

type Field = {
  type: string;
  name: "name" | "description" | "amount" | "categoryId";
  label: string;
  placeholder: string;
};

const AddExpenseForm: React.FC<Props> = ({
  defaultValues = initialValues,
  categories = [],
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    setValue,
    errors,
    trigger,
    formState,
    register,
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = formState;
  const classes = useStyles();

  useEffect(() => {
    register({ name: "categoryId" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderField = ({ type, name, label, placeholder }: Field) => {
    const error = !isEmpty(errors[name]);
    const helperText = error ? errors?.[name]?.message : null;
    const options = categories;

    if (type === "select") {
      return (
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
      id="add_expense_form"
      className={classes.root}
      onSubmit={handleSubmit(onSubmit)}
    >
      {map(fields, (field, id) => (
        <Fragment key={id}>{renderField(field as Field)}</Fragment>
      ))}
    </form>
  );
};

export default AddExpenseForm;