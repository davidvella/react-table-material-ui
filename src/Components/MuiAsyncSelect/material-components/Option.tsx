import React from "react";
import { MenuItem } from "@material-ui/core";
import { OptionProps } from "react-select/src/components/Option";

export function Option(props: OptionProps<any>) {
  const {
    isDisabled,
    innerRef,
    isFocused,
    isSelected,
    innerProps,
    children
  } = props;

  return (
    <MenuItem
      disabled={isDisabled}
      ref={innerRef}
      selected={isFocused}
      component="div"
      style={{
        fontWeight: isSelected ? 500 : 400,
      }}
      {...innerProps}
    >
      {children}
    </MenuItem>
  );
}