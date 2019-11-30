import { LoadingIconProps } from "react-select/src/components/indicators";
import React from "react";
import { CircularProgress } from "@material-ui/core";

export function LoadingIndicator(props: LoadingIconProps<any>) {
    return (
        <CircularProgress {...props}/>
    );
}