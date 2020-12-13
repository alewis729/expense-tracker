import React from "react";
import { Toolbar, Typography, Link } from "@material-ui/core";

import { useStyles } from "./style";

interface Props {
  onSignout: () => void;
}

const Header: React.FC<Props> = ({ onSignout }) => {
  const classes = useStyles();

  return (
    <Toolbar disableGutters>
      <div className={classes.logoContainer}>
        <Typography variant="h5" component="h2" className={classes.typography}>
          Expense Tracker
        </Typography>
      </div>
      <Link onClick={onSignout}>Sign out</Link>
    </Toolbar>
  );
};

export default Header;
