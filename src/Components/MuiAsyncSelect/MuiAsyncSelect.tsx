import { FC, CSSProperties } from "react";
import React from "react";
import Async from 'react-select/async';
import { createStyles, emphasize, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { IMuiAsyncSelectProps } from "./MuiAsyncSelect.types";

// Prebuilt Material Components
import { Control } from "./material-components/Control";
import { Menu } from "./material-components/Menu";
import { Option } from "./material-components/Option";
import { MultiValue } from "./material-components/MultiValue";
import { NoOptionsMessage } from "./material-components/NoOptionsMessage";
import { Placeholder } from "./material-components/Placeholder";
import { SingleValue } from "./material-components/SingleValue";
import { ValueContainer } from "./material-components/ValueContainer"
import { LoadingIndicator } from "./material-components/LoadingIndicator"
import { ClearIndicator } from "./material-components/ClearIndicator"


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            height: 250,
            minWidth: 290,
        },
        input: {
            display: 'flex',
            padding: 0,
            height: 'auto',
        },
        valueContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            flex: 1,
            alignItems: 'center',
            overflow: 'hidden',
        },
        rootFocused: {
            color: theme.palette.grey[700]
        },
        chip: {
            margin: theme.spacing(0.5, 0.25),
        },
        chipFocused: {
            backgroundColor: emphasize(
                theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
                0.08,
            ),
        },
        noOptionsMessage: {
            padding: theme.spacing(1, 2),
        },
        singleValue: {
            fontSize: 16,
        },
        placeholder: {
            position: 'absolute',
            left: 2,
            bottom: 6,
            fontSize: 16,
        },
        paper: {
            position: 'absolute',
            zIndex: 1,
            marginTop: theme.spacing(1),
            left: 0,
            right: 0,
        },
        divider: {
            height: theme.spacing(2),
        },
    }),
);

/**
 * 
 * @param props 
 */
export const MuiAsyncSelect: FC<IMuiAsyncSelectProps> = (props) => {
    const {components, ...otherProps} = props;

    const classes = useStyles();
    const theme = useTheme();
    const selectStyles = {
        input: (base: CSSProperties) => ({
            ...base,
            color: theme.palette.text.primary,
            '& input': {
                font: 'inherit',
            },
        }),
    };

    return (
        <Async
            classes={classes}
            styles={selectStyles}
            components={{
                Control,
                ClearIndicator,
                LoadingIndicator,
                Menu,
                MultiValue,
                Option,
                NoOptionsMessage,
                Placeholder,
                SingleValue,
                ValueContainer,
                ...components
            }}
            {...otherProps}
        />
    )
}