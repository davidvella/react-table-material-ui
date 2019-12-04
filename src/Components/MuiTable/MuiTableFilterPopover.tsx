import React, { FC } from "react";
import { Popover } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { MuiTableFilterPopoverProps } from "./MuiTableFilterPopover.types";
import clsx from "clsx";
import { MuiTableFilterList } from "./MuiTableFilterList";

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
        },
    }),
);


/**
 * 
 * @param param0 
 */
export const MuiTableFilterPopover: FC<MuiTableFilterPopoverProps> = (props) => {
    const classes = useStyles();
    return (
        <Popover
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
            <div className={clsx(classes.root)}>
                <MuiTableFilterList></MuiTableFilterList>
            </div>
        </Popover>
    );
}