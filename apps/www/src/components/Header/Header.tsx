import React from "react";
import { Toolbar, IconButton, Typography, Link } from "@material-ui/core";
import { MenuOpenRounded as IconMenu } from "@material-ui/icons";

import { useStyles } from "./style";

interface Props {
  onOpenNavigation: () => void;
  onSignout: () => void;
}

const Header: React.FC<Props> = ({ onOpenNavigation, onSignout }) => {
  const classes = useStyles();

  return (
    <Toolbar disableGutters>
      <div className={classes.menuIcon}>
        <IconButton color="primary" onClick={onOpenNavigation}>
          <IconMenu />
        </IconButton>
      </div>
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
