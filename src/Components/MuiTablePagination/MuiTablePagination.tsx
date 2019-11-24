import { FC } from "react";
import { MuiTablePaginationProps } from "./MuiTablePagination.types";
import { makeStyles, createStyles } from "@material-ui/styles";
import { Theme, Toolbar, useTheme, IconButton, Typography, Select, InputBase, MenuItem } from "@material-ui/core";
import React from "react";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        /* Styles applied to the root element. */
        root: {
            display: 'flex',
            position: 'relative',
            alignItems: 'center',
            // Increase the specificity to override TableCell.
            '&:last-child': {
                padding: 0,
            },
        },
        /* Styles applied to the Toolbar component. */
        toolbar: {
            minHeight: 52,
            paddingRight: 2,
        },
        /* Styles applied to the spacer element. */
        spacer: {
            flex: '1 1 100%',
        },
        /* Styles applied to the caption Typography components if `variant="caption"`. */
        caption: {
            flexShrink: 0,
        },
        /* Styles applied to the Select component root element. */
        selectRoot: {
            // `.selectRoot` should be merged with `.input` in v5.
            marginRight: 32,
            marginLeft: 8,
        },
        /* Styles applied to the Select component `select` class. */
        select: {
            paddingLeft: 8,
            paddingRight: 24,
            textAlign: 'right',
            textAlignLast: 'right', // Align <select> on Chrome.
        },
        /* Styles applied to the Select component `icon` class. */
        selectIcon: {
            top: 1,
        },
        /* Styles applied to the `InputBase` component. */
        input: {
            color: 'inherit',
            fontSize: 'inherit',
            flexShrink: 0,
        },
        /* Styles applied to the MenuItem component. */
        menuItem: {},
        /* Styles applied to the internal `TablePaginationActions` component. */
        actions: {
            flexShrink: 0,
            marginLeft: 20,
        }
    }),
);

/**
 * Default Page Sizes
 */
const defaultRowsPerPageOptions = [10, 25, 50];

/**
 * 
 * @param props 
 */
export const MuiTablePagination: FC<MuiTablePaginationProps> = (props) => {
    // Load Style and theme with hooks
    const classes = useStyles();
    const theme = useTheme();
    // Load values from props.
    const {
        labelRowsPerPage = 'Rows per page:',
        rowsPerPage,
        rowsPerPageOptions = defaultRowsPerPageOptions,
        onChangeRowsPerPage,
      } = props;

    return (
        <Toolbar className={clsx(classes.root, classes.toolbar)}>
            <div className={classes.spacer} />
            {rowsPerPageOptions.length > 1 && (
                <Typography color="inherit" variant="body2" className={classes.caption}>
                    {labelRowsPerPage}
                </Typography>
            )}
            {rowsPerPageOptions.length > 1 && (
                <Select
                    classes={{
                        select: classes.select,
                        icon: classes.selectIcon,
                    }}
                    input={<InputBase className={clsx(classes.input, classes.selectRoot)} />}
                    value={rowsPerPage}
                    onChange={onChangeRowsPerPage}
                >
                    {rowsPerPageOptions.map(rowsPerPageOption => (
                        <MenuItem
                            className={classes.menuItem}
                            key={rowsPerPageOption}
                            value={rowsPerPageOption}
                        >
                            {rowsPerPageOption}
                        </MenuItem>
                    ))}
                </Select>
            )}
            <div className={classes.actions}>
                <IconButton
                    onClick={props.onClickPrevious}
                    disabled={!props.canPreviousPage}
                    aria-label="previous page">
                    {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                </IconButton>
                <IconButton
                    onClick={props.onClickNext}
                    disabled={!props.canNextPage}
                    aria-label="next page"
                >
                    {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </IconButton>
            </div>
        </Toolbar>
    );
}