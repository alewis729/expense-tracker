import React from "react";
import { Box, Paper, Typography } from "@material-ui/core";
import { BoxProps } from "@material-ui/core/Box";

import { useStyles } from "./style";

interface Props extends BoxProps {
  title: string;
  searchInput?: React.ReactNode;
  actionButtons?: React.ReactNode;
}

const PageHeader: React.FC<Props> = ({
  title,
  searchInput,
  actionButtons,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Box mb={3} {...props}>
      <Paper className={classes.paper}>
        <Typography variant="h5">{title}</Typography>
        <div className={classes.search}>{searchInput && searchInput}</div>
        <div className={classes.actions}>{actionButtons && actionButtons}</div>
      </Paper>
    </Box>
  );
};

export default PageHeader;
