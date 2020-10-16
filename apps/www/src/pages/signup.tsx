import React from "react";
import { Box, Typography, Link } from "@material-ui/core";

import { withoutAuth } from "@/hocs";
import { AuthLayout } from "@/layouts";
import { SignupForm } from "@/components";

const SignupPage: React.FC = () => {
  return (
    <AuthLayout
      image={{ src: "/static/jar-coins.jpg", alt: "Expense tracker coins" }}
      form={
        <>
          <SignupForm onSubmit={data => console.log(data)} />
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
