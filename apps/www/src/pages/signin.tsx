import React from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "@expense-tracker/graphql";
import { useSnackbar } from "notistack";
import { Box, Typography } from "@material-ui/core";

import { isLoggedInVar } from "@/lib/graphql/cache";
import { withoutAuth } from "@/hocs";
import { AuthLayout } from "@/layouts";
import { SigninForm, Link } from "@/components";

interface loginInput {
  email: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: ({ login }) => {
      localStorage.setItem("token", login.token);
      localStorage.setItem("userId", login.me.id);
      isLoggedInVar(true);
    },
    onError: error => enqueueSnackbar(error.message, { variant: "error" }),
  });

  const handleSubmit = ({ email, password }: loginInput) =>
    login({
      variables: {
        loginUserInput: {
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
          <SigninForm pending={loading} onSubmit={handleSubmit} />
          <Box mt={2}>
            <Typography variant="body2">
              Don't have an account? <Link href="/signup">Sign up</Link>
            </Typography>
          </Box>
        </>
      }
    />
  );
};

export default withoutAuth(SignupPage);
