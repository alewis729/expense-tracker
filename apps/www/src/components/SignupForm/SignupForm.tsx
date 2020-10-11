import React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { isEmpty, map } from "lodash";
import { TextField } from "@material-ui/core";

import { useStyles } from "./style";
import { schema, fields } from "./formData";
import { Button, PasswordField } from "@/components";

interface Props {
  onSubmit: (data: { name: string; email: string; password: string }) => void;
}

const SignupForm: React.FC<Props> = ({ onSubmit }) => {
  const classes = useStyles();
  const { control, handleSubmit, errors, formState } = useForm({
    resolver: yupResolver(schema),
  });
  const { isSubmitting } = formState;

  return (
    <form
      className={classes.root}
      onSubmit={handleSubmit(({ name, email, password }) =>
        onSubmit({ name, email, password })
      )}
    >
      {map(fields, ({ type, name, label, placeholder, autocomplete }) => (
        <Controller
          key={name}
          control={control}
          defaultValue=""
          as={type === "password" ? <PasswordField /> : <TextField />}
          name={name}
          type={type}
          margin="normal"
          label={label}
          placeholder={placeholder}
          fullWidth
          autoComplete={autocomplete}
          disabled={isSubmitting}
          helperText={errors[name] && errors[name].message}
          error={!isEmpty(errors[name])}
        />
      ))}
      <Button
        className={classes.submit}
        disabled={isSubmitting}
        type="submit"
        fullWidth
      >
        Sign up
      </Button>
    </form>
  );
};

export default SignupForm;
