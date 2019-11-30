import { MultiValueProps } from "react-select";
import React from "react";
import { Chip } from "@material-ui/core";
import CancelIcon from '@material-ui/icons/Cancel';
import clsx from "clsx";

export function MultiValue(props: MultiValueProps<any>) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={clsx(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}
