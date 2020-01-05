import React, { FC } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import { IMuiTableViewColProps } from './MuiTableViewCol.types';
import {
    makeStyles,
    createStyles,
    Theme,
    Popover,
    FormControlLabel
} from '@material-ui/core';
import { SELECT_COL_ID } from './constants'

/**
 * Styles for the Table
 */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: '16px 24px 16px 24px',
            fontFamily: 'Roboto',
        },
        title: {
            marginLeft: '-7px',
            fontSize: '14px',
            color: theme.palette.text.secondary,
            textAlign: 'left',
            fontWeight: 500,
        },
        formGroup: {
            marginTop: '8px',
        },
        formControl: {},
        checkbox: {
            padding: '0px',
            width: '32px',
            height: '32px',
        },
        checkboxRoot: {
            '&$checked': {
                color: theme.palette.primary.main,
            },
        },
        checked: {},
        label: {
            fontSize: '15px',
            marginLeft: '8px',
            color: theme.palette.text.primary,
        },
        filterPaper: {
            maxWidth: '50%',
        },
    })
);


/**
 * A Popover used to display columns. 
 * @param param0 
 */
export const MuiTableViewColPopover: FC<IMuiTableViewColProps> = (props) => {
    const { columns, anchorEl, updateAnchorEl } = props;
    const classes = useStyles({});

    return (
        <Popover
            classes={{ paper: classes.filterPaper }}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            elevation={2}
            onClose={() => {
                if (updateAnchorEl) {
                    updateAnchorEl(null);
                }
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <FormControl component={'fieldset'} className={classes.root} aria-label={"Show Columns"}>
                <Typography variant="caption" className={classes.title}>
                    Show Columns
                </Typography>
                <FormGroup className={classes.formGroup}>
                    {columns.map((column, index) => {
                        return (
                            column.id !== SELECT_COL_ID &&
                            (<FormControlLabel
                                key={index}
                                classes={{
                                    root: classes.formControl,
                                    label: classes.label,
                                }}
                                control={
                                    <Checkbox
                                        className={classes.checkbox}
                                        classes={{
                                            root: classes.checkboxRoot,
                                            checked: classes.checked,
                                        }}
                                        {...column.getToggleHiddenProps()}
                                    />
                                }
                                label={column.Header}
                            />)
                        );
                    })}
                </FormGroup>
            </FormControl>
        </Popover>


    );
}
