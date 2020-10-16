import React from "react";
import { Container, Paper, useMediaQuery, Theme } from "@material-ui/core";
import clsx from "clsx";

import { useStyles } from "./style";

interface Props {
  image: {
    src: string;
    alt: string;
  };
  form: React.ReactNode;
}

const AuthLayout: React.FC<Props> = ({ image, form }) => {
  const classes = useStyles();
  const isMdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));

  const imageContainer = (
    <div
      className={clsx({
        [classes.imageContainerSmall]: !isMdUp,
        [classes.imageContainer]: isMdUp,
      })}
    >
      <img src={image.src} alt={image.alt} />
    </div>
  );

  return (
    <Container className={classes.root}>
      {!isMdUp && imageContainer}
      <Container className={classes.content} maxWidth="lg" disableGutters>
        <Paper className={classes.paper}>
          {isMdUp && imageContainer}
          <div className={classes.formContainer}>
            <div className={classes.form}>{form}</div>
          </div>
        </Paper>
      </Container>
    </Container>
  );
};

export default AuthLayout;
