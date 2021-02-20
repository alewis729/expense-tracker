import React from "react";
import { Container, Toolbar, AppBar, LinearProgress } from "@material-ui/core";
import clsx from "clsx";

import { useStyles } from "./style";

interface Props {
  header: React.ReactNode;
  loading?: boolean;
  hideWhileLoading?: boolean;
}

const Default: React.FC<Props> = ({
  header,
  loading,
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
      <Container className={classes.main} component="main" maxWidth="lg">
        <div
          className={clsx(classes.children, {
            ["hide"]: hideWhileLoading && loading,
          })}
        >
          {children}
        </div>
      </Container>
    </Container>
  );
};

export default Default;
