import React from "react";
import { Toolbar, Box } from "@material-ui/core";

import { Link } from "@/components";

interface Props {
  onSignout: () => void;
}

const Header: React.FC<Props> = ({ onSignout }) => (
  <Toolbar disableGutters>
    <Box flexGrow={1}></Box>
    <Link component="button" onClick={onSignout}>
      Sign out
    </Link>
  </Toolbar>
);

export default Header;
