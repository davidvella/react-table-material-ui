import React, { FC, Fragment, useState } from "react";
import { Tooltip, IconButton, Box } from "@material-ui/core";
import FilterListIcon from '@material-ui/icons/FilterList';
import { MuiTableFilterPopover } from "./MuiTableFilterPopover";
import { MuiTableFilterToolbar } from "./MuiTableFilterToolbar";

/**
 * The toolbar which sits on top of the table.
 * @param param0 
 */
export const MuiTableToolbarActions: FC<any> = () => {
    const [anchorEl, updateAnchorEl] = useState<null | EventTarget & HTMLButtonElement | Element>(null);

    return (
        <Fragment>
            <Box display="flex" flexDirection="row">
                <Box>
                    <Tooltip title={"Filters"}>
                        <IconButton
                            aria-label={"Filters"}
                            onClick={(event: any) => updateAnchorEl(event.currentTarget)}
                        >
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                </Box>
                <Box>
                    <MuiTableFilterToolbar />
                </Box>
            </Box>
            <MuiTableFilterPopover
                updateAnchorEl={updateAnchorEl}
                anchorEl={anchorEl}
            />
        </Fragment>
    );
}