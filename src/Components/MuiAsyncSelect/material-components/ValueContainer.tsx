import { ValueContainerProps } from "react-select";
import React from "react";

export function ValueContainer(props: ValueContainerProps<any>) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}