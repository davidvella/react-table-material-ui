import { ChipProps, Chip, DeprecatedChipProps } from "@rmwc/chip";
import React, { FC, HTMLProps } from "react";
import { makeStyles, emphasize } from "@material-ui/core";
import clsx from "clsx";
import '@material/chips/dist/mdc.chips.css';

const useStyles = makeStyles((theme: any) => {
    const backgroundColor = theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700];

    return {
        root: {
            backgroundColor: backgroundColor,
            opacity: .93,
            '&:hover, &:focus': {
                backgroundColor: emphasize(backgroundColor, 0.08),
            },
            '&:active': {
                boxShadow: theme.shadows[1],
            },
            '&$disabled': {
                opacity: 0.5,
                pointerEvents: 'none',
            },
        },
        /* Pseudo-class applied to the root element if `disabled={true}`. */
        disabled: {},

    }
});

export interface MuiChipProps extends Omit<HTMLProps<Chip>,"label"> , ChipProps , DeprecatedChipProps {
    /**
     * If true, the chip should be displayed in a disabled state.
     */
    disabled?: boolean;
}

/**
 * Chips allow users to enter information, make selections, filter content, or trigger actions.
 * This is an extension 
 */
export const MuiChip: FC<MuiChipProps> = (props) => {

    const {
        disabled = false,
        ...rest
    } = props;

    const classes = useStyles({});
    return (
        <Chip {...rest} className={clsx(classes.root, { [classes.disabled]: disabled })} aria-disabled={disabled ? true : undefined}/>
    )
}