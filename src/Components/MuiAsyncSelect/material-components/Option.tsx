import React from "react";
import { MenuItem } from "@material-ui/core";
import { OptionProps } from "react-select/src/components/Option";

export function Option(props: OptionProps<any>) {
    return (
      <MenuItem
        ref={props.innerRef}
        selected={props.isFocused}
        component="div"
        style={{
          fontWeight: props.isSelected ? 500 : 400,
        }}
        {...props.innerProps}
      >
        {props.children}
      </MenuItem>
    );
  }