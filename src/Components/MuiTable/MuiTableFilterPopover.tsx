import React, { FC, useContext } from "react";
import { Popover, Typography, Button } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { MuiTableFilterPopoverProps } from "./MuiTableFilterPopover.types";
import { MuiTableFilterList } from "./MuiTableFilterList";
import { MuiTableContext } from "./MuiTableProvider";

/**
 * Styles for the Table
 */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
            margin: '0px 16px 0px 16px',
            padding: '24px 24px 36px 24px',
            fontFamily: 'Roboto',
        },
        paper: {
            overflowX: "unset!important" as any,
            overflowY: "unset!important" as any,
            maxWidth: 600
        },
        header: {
            flex: '0 0 auto',
            marginBottom: '16px',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
        },
        title: {
            display: 'inline-block',
            color: theme.palette.text.primary,
            fontSize: '14px',
            fontWeight: 500,
        },
        noMargin: {
            marginLeft: '0px',
        },
        reset: {
            alignSelf: 'left',
        },
        resetLink: {
            marginLeft: '16px',
            fontSize: '12px',
            cursor: 'pointer',
        },
        filtersSelected: {
            alignSelf: 'right',
        },
        checked: {},
        gridListTile: {
            marginTop: '16px',
        },
    }),
);

/**
 * A Popover used to display filter values content on top of the table. 
 * @param param0 
 */
export const MuiTableFilterPopover: FC<MuiTableFilterPopoverProps> = (props) => {
    // Map Context to columns
    const { dispatch } = useContext(MuiTableContext);
    const classes = useStyles();
    return (
        <Popover
            classes={{ paper: classes.paper }}
            open={Boolean(props.anchorEl)}
            anchorEl={props.anchorEl}
            elevation={2}
            onClose={() => {
                if (props.updateAnchorEl) {
                    props.updateAnchorEl(null);
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
            <div className={classes.root}>
                <div className={classes.header}>
                    <div className={classes.reset}>
                        <Typography
                            variant="body2"
                            className={classes.title}>
                            FILTERS
                        </Typography>
                        <Button
                            color="primary"
                            className={classes.resetLink}
                            tabIndex={0}
                            aria-label={"RESET"}
                            data-testid={'filterReset-button'}
                            onClick={() => dispatch({ type: "resetFilter" })}>
                            RESET
                        </Button>
                    </div>
                    <div className={classes.filtersSelected} />
                </div>
                <MuiTableFilterList className={classes.root} />
            </div>

        </Popover>
    );
}