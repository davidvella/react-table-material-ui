import { PlaceholderProps, OptionTypeBase } from "react-select";
import React from "react";
import { Typography } from "@material-ui/core";

export function Placeholder(props: MuiPlaceholderProps) {
    const { selectProps, innerProps = {}, children } = props;
    return (
        <Typography color="textSecondary" className={selectProps.classes.placeholder} {...innerProps}>
            {children}
        </Typography>
    );
}

type MuiPlaceholderProps = Omit<PlaceholderProps<OptionTypeBase>, 'innerProps'> &
    Partial<Pick<PlaceholderProps<OptionTypeBase>, 'innerProps'>>;