
import React from "react";
import { Paper } from "@material-ui/core";
import { MenuProps } from "react-select";
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: theme.shape.borderRadius,
    position: 'absolute',
    zIndex: 2,
    marginTop: theme.spacing(0.5),
    left: 0,
    right: 0
  }
}));

export function Menu(props: MenuProps<any>) {
  const classes = useStyles();
  const {
    innerProps,
    children,
  } = props

  return (
    <Paper square className={classes.root} {...innerProps}>
      {children}
    </Paper>
  );
}