import React, { FC } from "react";
import { ChipSet } from "@rmwc/chip";
import { MuiChip } from "../MuiChip/MuiChip";
import { isEqual } from "lodash";

export interface MuiFilterChoice { value: any, label: any, disabled?: boolean }

export interface MuiChipSelectProps {
    /**
     * An array of selected option objects. Each object should contain a value and label property
     */
    value: Array<MuiFilterChoice>;
    /**
     * An array of option objects. Each object should contain a value and label property
     */
    options: Array<MuiFilterChoice>;
    /**
     * The function that will be called with the new value(s) when the select is updated. 
     * This function will be passed a single value eg. onChange(newValue) when using single mode, 
     * or an array of values, with the newly added value as 
     * the second parameter eg. onChange([...values], newValue) when using multi mode
     */
    onChange: (
        newValue: any
    ) => void;
    /**
     * When true, multi-select mode is used
     */
    multi?: boolean;
}

/**
 * Chips allow users to enter information, make selections, filter content, or trigger actions.
 * This is an extension 
 */
export const MuiChipSelect: FC<MuiChipSelectProps> = (props) => {

    const {
        onChange,
        options,
        value,
        multi
    } = props;

    // Refs
    const onChangeRef = React.useRef(onChange)

    // We need to memoize these default values to keep things
    // from rendereing without cause
    const defaultMultiValue = React.useMemo(() => [], [])

    let myValue = value;

    // Multi should always at least have an empty array as the value
    if (multi && typeof value === 'undefined') {
        myValue = defaultMultiValue
    }

    // Build your select component
    return (
        <ChipSet filter >
            {options.map((option,index) => {
                const selected = myValue.some(item => isEqual(item,option))
                return (<MuiChip checkmark selected={selected} key={`Mui-Chip-Select-${index}`} label={option.label} disabled={option.disabled} onClick={() => {
                    if(selected){
                        onChangeRef.current(myValue.filter(item => !isEqual(item,option)))
                    }
                    else{
                        if(multi){
                            onChangeRef.current(myValue.concat(option))
                        }
                        else{
                            onChangeRef.current([option])
                        }
                    }
                }}/>)
            })}
        </ChipSet>
    )
}