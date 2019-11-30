import { Typography } from "@material-ui/core";
import React from "react";
import { NoticeProps } from "react-select/src/components/Menu";

export function NoOptionsMessage(props: NoticeProps<any>) {
    return (
      <Typography
        color="textSecondary"
        className={props.selectProps.classes.noOptionsMessage}
        {...props.innerProps}
      >
        {props.children}
      </Typography>
    );
  }
  