import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { AUTH_GOOGLE } from "@expense-tracker/graphql";
import { useGoogleLogin, GoogleLoginResponse } from "react-google-login";
import { useSnackbar } from "notistack";
import { isEmpty } from "lodash";

import { isLoggedInVar } from "@/lib/graphql/cache";
import { GoogleAuthButton as Button } from "@/components";

const GoogleAuthButton: React.FC = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [disabled, setDisabled] = useState(false);
  const [googleAuth, { loading: loadingGoogle }] = useMutation(AUTH_GOOGLE, {
    onCompleted: ({ authGoogle }) => {
      localStorage.setItem("token", authGoogle.token);
      localStorage.setItem("userId", authGoogle.me.id);
      isLoggedInVar(true);
    },
    onError: error => enqueueSnackbar(error.message, { variant: "error" }),
  });
  const { signIn } = useGoogleLogin({
    clientId: process.env.GOOGLE_CLIENT_ID ?? "",
    onSuccess: ({ accessToken }: GoogleLoginResponse) => {
      googleAuth({
        variables: { googleAuthInput: { accessToken } },
      });
    },
    onFailure: ({ details }) => {
      let errorMessage = "Google Authentication is not possible.";
      setDisabled(true);

      if (!isEmpty(details)) {
        errorMessage += ` ${details}`;
      }

      enqueueSnackbar(errorMessage, {
        variant: "error",
        autoHideDuration: 5000,
      });
    },
  });

  return (
    <Button onClick={signIn} disabled={disabled} pending={loadingGoogle} />
  );
};

export default GoogleAuthButton;
