import React from "react";
import { isEmpty } from "lodash";
import { Box, Paper, Typography } from "@material-ui/core";
import { BoxProps } from "@material-ui/core/Box";

import { useStyles } from "./style";

interface Props extends BoxProps {
  title: string;
  actionsNode?: React.ReactNode;
}

const PageHeader: React.FC<Props> = ({ title, actionsNode, ...props }) => {
  const classes = useStyles();

  return (
    <Box mb={3} {...props}>
      <Paper className={classes.paper}>
        <Typography variant="h5">{title}</Typography>
        {!isEmpty(actionsNode) && (
          <div className={classes.actions}>{actionsNode}</div>
        )}
      </Paper>
    </Box>
  );
};

export default PageHeader;
