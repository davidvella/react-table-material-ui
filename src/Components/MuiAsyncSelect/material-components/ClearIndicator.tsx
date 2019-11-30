import {  SvgIcon } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { IndicatorProps } from "react-select";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
    root: {
      'display': 'flex',
      'padding': theme.spacing(1),
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
    <div aria-hidden {...innerProps} className={clsx(classes.root, { [classes.rootFocused]: isFocused })}>
      <SvgIcon fontSize="small">
        <path
          // eslint-disable-next-line max-len
          d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
        />
      </SvgIcon>
    </div>
    );
}