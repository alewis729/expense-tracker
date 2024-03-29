import React from "react";
import { Typography } from "@material-ui/core";

interface Props {
  message?: string;
}

const ErrorMessage: React.FC<Props> = ({
  message = "Something went wrong... Try refreshing the page.",
}) => <Typography data-testid="error-message">{message}</Typography>;

export default ErrorMessage;
