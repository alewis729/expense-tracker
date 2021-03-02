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

type MenuItems = {
  route: string;
  label: string;
  icon: JSX.Element;
}[];

interface Props {
  open: boolean;
  items?: MenuItems;
  onNavigate: (value: string) => void;
  onClose: () => void;
}

const Navigation: React.FC<Props> = ({ open, items, onNavigate, onClose }) => {
  const classes = useStyles();
  const theme = useTheme();

  const defaultItems = items ?? [
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
        {defaultItems.map(({ route, label, icon }) => (
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
