import React from "react";
import { Container, Toolbar, AppBar, LinearProgress } from "@material-ui/core";

import { useStyles } from "./style";

interface Props {
  header: React.ReactNode;
  loading?: boolean;
}

const Default: React.FC<Props> = ({ header, loading, children }) => {
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
        <div className={classes.children}>{children}</div>
      </Container>
    </Container>
  );
};

export default Default;
