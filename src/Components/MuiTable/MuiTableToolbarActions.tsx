import React, { FC, Fragment, useState } from "react";
import { Tooltip, IconButton, Box } from "@material-ui/core";
import FilterListIcon from '@material-ui/icons/FilterList';
import { MuiTableFilterPopover } from "./MuiTableFilterPopover";
import { MuiTableFilterToolbar } from "./MuiTableFilterToolbar";
import { IMuiTableToolbarActionProps } from "./MuiTableToolbarActions.types";
import { MuiTableViewColPopover } from "./MuiTableViewColPopover";
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import {
    makeStyles,
    createStyles,
    Theme,
} from '@material-ui/core';

/**
 * Styles for the Table
 */
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%'
        },
        lastItem: {
            marginLeft: 'auto'
        }
    })
);

/**
 * The toolbar which sits on top of the table.
 * @param param0 
 */
export const MuiTableToolbarActions: FC<IMuiTableToolbarActionProps> = (props) => {
    const { columns } = props;
    const [anchorEl, updateAnchorEl] = useState<null | EventTarget & HTMLButtonElement | Element>(null);
    const [anchorElColumns, updateAnchorElColumns] = useState<null | EventTarget & HTMLButtonElement | Element>(null);
    const classes = useStyles({});

    return (
        <Fragment>
            <Box display="flex" flexDirection="row" className={classes.root}>
                {columns.some(column => column.disableFilters !== true) && (
                    <Box p={1} flexGrow={1} display="flex" flexDirection="row">
                        <Box >
                            <Tooltip title={"Filters"}>
                                <IconButton
                                    aria-label={"Filters"}
                                    onClick={(event: any) => updateAnchorEl(event.currentTarget)}
                                >
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip>
                        </Box>
                        <Box >
                            <MuiTableFilterToolbar />
                        </Box>
                    </Box>)}
                <Box p={1} className={classes.lastItem}>
                    <Tooltip title={"View Columns"} disableFocusListener>
                        <IconButton
                            data-testid={"View Columns-iconButton"}
                            aria-label={"View Columns"}
                            onClick={(event: any) => updateAnchorElColumns(event.currentTarget)}
                        >
                            <ViewColumnIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <MuiTableFilterPopover
                updateAnchorEl={updateAnchorEl}
                anchorEl={anchorEl}
            />
            <MuiTableViewColPopover anchorEl={anchorElColumns} updateAnchorEl={updateAnchorElColumns} columns={columns} />
        </Fragment>
    );
}