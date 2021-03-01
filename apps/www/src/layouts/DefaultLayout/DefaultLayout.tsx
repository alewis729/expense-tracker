import React from "react";
import { isNil } from "lodash";
import { Container, Toolbar, AppBar, LinearProgress } from "@material-ui/core";
import clsx from "clsx";

import { useStyles } from "./style";

interface Props {
  header: React.ReactNode;
  loading?: boolean;
  errorNode?: React.ReactNode | null;
  hideWhileLoading?: boolean;
}

const Default: React.FC<Props> = ({
  header,
  loading,
  errorNode,
  hideWhileLoading = false,
  children,
}) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <div>
        <Toolbar />
        <AppBar className={classes.appBar} position="fixed" color="inherit">
          <Container maxWidth="xl">
            <>{header}</>
          </Container>
          {loading && <LinearProgress />}
        </AppBar>
      </div>
      <Container className={classes.main} component="main" maxWidth="xl">
        <div
          className={clsx(classes.children, {
            ["hide"]: hideWhileLoading && loading,
          })}
        >
          {isNil(errorNode) ? children : errorNode}
        </div>
      </Container>
    </Container>
  );
};

export default Default;
