import React, { Fragment, useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty, map } from "lodash";
import {
  Select,
  MenuItem,
  TextField,
  FormHelperText,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { DateTimePicker } from "@material-ui/pickers";

import { useStyles } from "./style";
import { schema, fields, initialValues } from "./formData";

export interface AddExpenseFields {
  name: string;
  description: string | null;
  date: Date | null;
  categoryId: string;
  amount: number;
}

interface Props {
  defaultValues?: AddExpenseFields | null;
  categories: { id: string; name: string }[];
  onSubmit: (data: AddExpenseFields) => void;
}

type Field = {
  type: string;
  name: "name" | "description" | "amount" | "categoryId";
  label: string;
  placeholder: string;
};

const ExpenseForm: React.FC<Props> = ({
  defaultValues = null,
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
    defaultValues: defaultValues ?? initialValues,
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = formState;
  const classes = useStyles();
  const [date, setDate] = useState<Date | null>(
    defaultValues?.date ?? new Date()
  );

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
            label={label}
            name={name}
            defaultValue={defaultValues?.[name]}
            placeholder={placeholder}
            onChange={e => {
              setValue(name, e.target?.value as string);
              trigger(name);
            }}
            inputProps={{ name, id: name }}
          >
            {map(options, option => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
          {error && <FormHelperText>{helperText}</FormHelperText>}
        </FormControl>
      );
    } else if (type === "date") {
      return (
        <FormControl
          fullWidth
          error={error}
          disabled={isSubmitting}
          margin="normal"
        >
          <DateTimePicker
            name={name}
            variant="inline"
            ampm={false}
            format="MMM dd yyyy, @HH:mm"
            inputVariant="outlined"
            label={label}
            value={date}
            onChange={setDate}
          />
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
      onSubmit={handleSubmit(data => onSubmit({ ...data, date }))}
    >
      {map(fields, (field, id) => (
        <Fragment key={id}>{renderField(field as Field)}</Fragment>
      ))}
    </form>
  );
};

export default ExpenseForm;
