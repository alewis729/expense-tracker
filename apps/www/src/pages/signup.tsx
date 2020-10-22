import React from "react";
import { useMutation } from "@apollo/client";
import { REGISTER } from "@expense-tracker/graphql";
import { useSnackbar } from "notistack";
import { Box, Typography } from "@material-ui/core";

import { isLoggedInVar } from "@/lib/graphql/cache";
import { withoutAuth } from "@/hocs";
import { AuthLayout } from "@/layouts";
import { SignupForm, Link } from "@/components";

interface AddUserInput {
  name: string;
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [register, { loading }] = useMutation(REGISTER, {
    onCompleted: ({ register }) => {
      localStorage.setItem("token", register.token);
      localStorage.setItem("userId", register.me.id);
      enqueueSnackbar("Registered.", {
        variant: "success",
        autoHideDuration: 1500,
      });
      setTimeout(() => isLoggedInVar(true), 750);
    },
    onError: error => enqueueSnackbar(error.message, { variant: "error" }),
  });

  const handleSubmit = ({ name, email, password }: AddUserInput) =>
    register({
      variables: {
        addUserInput: {
          name,
          email,
          password,
        },
      },
    });

  return (
    <AuthLayout
      image={{ src: "/static/jar-coins.jpg", alt: "Expense tracker coins" }}
      form={
        <>
          <SignupForm pending={loading} onSubmit={handleSubmit} />
          <Box mt={2}>
            <Typography variant="body2">
              Already a member? <Link href="/signin">Sign in</Link>
            </Typography>
          </Box>
        </>
      }
    />
  );
};

export default withoutAuth(SignupPage);
