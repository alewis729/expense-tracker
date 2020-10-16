import React from "react";
import { Box, Typography, Link } from "@material-ui/core";

import { withoutAuth } from "@/hocs";
import { AuthLayout } from "@/layouts";
import { SigninForm } from "@/components";

const SignupPage: React.FC = () => {
  return (
    <AuthLayout
      image={{ src: "/static/jar-coins.jpg", alt: "Expense tracker coins" }}
      form={
        <>
          <SigninForm onSubmit={data => console.log(data)} />
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
