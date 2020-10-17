import React from "react";
import { Box } from "@material-ui/core";
import { BoxProps } from "@material-ui/core/Box";

const Center: React.FC<BoxProps> = ({ children, ...props }) => (
  <Box
    position="relative"
    display="flex"
    alignItems="center"
    justifyContent="center"
    {...props}
  >
    {children}
  </Box>
);

export default Center;
