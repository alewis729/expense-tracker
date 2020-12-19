import React from "react";
import Chip, { ChipProps } from "@material-ui/core/Chip";

import { useStyles } from "./style";

interface Props extends Omit<ChipProps, "color"> {
  color?: string | null;
}

const CategoryChip: React.FC<Props> = ({ color, ...props }) => {
  const classes = useStyles({ color });

  return <Chip className={classes.root} size="small" {...props} />;
};

export default CategoryChip;
