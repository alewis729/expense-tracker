import React from "react";
import { useMutation } from "@apollo/client";
import { REGISTER, AUTH_GOOGLE } from "@expense-tracker/graphql";
import { useGoogleLogin, GoogleLoginResponse } from "react-google-login";
import { useSnackbar } from "notistack";
import { Box, Typography } from "@material-ui/core";

import { isLoggedInVar } from "@/lib/graphql/cache";
import { withoutAuth } from "@/hocs";
import { AuthLayout } from "@/layouts";
import { SignupForm, Link, GoogleAuthButton } from "@/components";

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
  const [googleAuth, { loading: loadingGoogle }] = useMutation(AUTH_GOOGLE, {
    onCompleted: ({ authGoogle }) => {
      localStorage.setItem("token", authGoogle.token);
      localStorage.setItem("userId", authGoogle.me.id);
      isLoggedInVar(true);
    },
    onError: error => enqueueSnackbar(error.message, { variant: "error" }),
  });
  const { signIn: googleSignIn } = useGoogleLogin({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    onSuccess: ({ accessToken }: GoogleLoginResponse) => {
      googleAuth({ variables: { googleAuthInput: { accessToken } } });
    },
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
            <Box mb={2}>
              <GoogleAuthButton
                onClick={googleSignIn}
                pending={loadingGoogle}
              />
            </Box>
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
