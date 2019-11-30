import { SingleValueProps } from "react-select";
import React from "react";
import { Typography } from "@material-ui/core";

export function SingleValue(props: SingleValueProps<any>) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}