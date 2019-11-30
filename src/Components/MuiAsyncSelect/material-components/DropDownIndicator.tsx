import { IndicatorProps } from "react-select";
import { SvgIcon } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React from "react";
import clsx from "clsx";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        'display': 'flex',
        'padding': theme.spacing(0.75),
        'cursor': 'pointer',
        'color': theme.palette.grey[400],
        'transition': 'color 0.2s',
        '&:hover': {
            color: theme.palette.grey[700]
        }
    },
    rootFocused: {
        color: theme.palette.grey[700]
    }
}));

export function ClearIndicator(props: IndicatorProps<any>) {
    const classes = useStyles();
    const {
        innerProps,
        isFocused
    } = props;

    return (
        <div aria-hidden className={clsx(classes.root, { [classes.rootFocused]: isFocused })}>
            <SvgIcon>
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </SvgIcon>
        </div>
    );
}