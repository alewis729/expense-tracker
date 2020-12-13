import React from "react";
import { Toolbar, Typography } from "@material-ui/core";

import { useStyles } from "./style";
import { Link } from "@/components";

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
      <Link component="button" onClick={onSignout}>
        Sign out
      </Link>
    </Toolbar>
  );
};

export default Header;
