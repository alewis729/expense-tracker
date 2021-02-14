import React from "react";
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import {
  HomeRounded as IconHome,
  CategoryRounded as IconCategories,
  IndeterminateCheckBoxRounded as IconExpenses,
  AddBoxRounded as IconIncome,
} from "@material-ui/icons";

import { useStyles } from "./style";

interface Props {
  open: boolean;
  onNavigate: (value: string) => void;
  onClose: () => void;
}

const Navigation: React.FC<Props> = ({ open, onNavigate, onClose }) => {
  const classes = useStyles();
  const theme = useTheme();

  const items = [
    { route: "/", label: "Home", icon: <IconHome /> },
    { route: "/categories", label: "Categories", icon: <IconCategories /> },
    { route: "/expenses", label: "Expenses", icon: <IconExpenses /> },
    { route: "/income", label: "Income", icon: <IconIncome /> },
  ];

  return (
    <Drawer
      open={open}
      anchor="left"
      onClose={onClose}
      style={{ zIndex: theme.zIndex.appBar - 1 }} // inline for specificity
    >
      <Toolbar />
      <List className={classes.list}>
        {items.map(({ label, route, icon }) => (
          <ListItem
            button
            id={route.replace("/", "")}
            key={route}
            className={classes.item}
            onClick={() => onNavigate(route)}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Navigation;
