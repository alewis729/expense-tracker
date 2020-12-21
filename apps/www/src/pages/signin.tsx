import React from "react";
import { useMutation } from "@apollo/client";
import { LOGIN, AUTH_GOOGLE } from "@expense-tracker/graphql";
import { useGoogleLogin, GoogleLoginResponse } from "react-google-login";
import { useSnackbar } from "notistack";
import { Box, Typography } from "@material-ui/core";

import { isLoggedInVar } from "@/lib/graphql/cache";
import { withoutAuth } from "@/hocs";
import { AuthLayout } from "@/layouts";
import { SigninForm, Link, GoogleAuthButton } from "@/components";

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
            <Box mb={2}>
              <GoogleAuthButton
                onClick={googleSignIn}
                pending={loadingGoogle}
              />
            </Box>
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
