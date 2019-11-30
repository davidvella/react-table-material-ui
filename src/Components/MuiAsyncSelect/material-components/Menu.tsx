
import React from "react";
import { Paper } from "@material-ui/core";
import { MenuProps } from "react-select";

export function Menu(props: MenuProps<any>) {
    return (
      <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
        {props.children}
      </Paper>
    );
  }