import React, { FC, Fragment, useState } from "react";
import { Grid, Tooltip, IconButton } from "@material-ui/core";
import FilterListIcon from '@material-ui/icons/FilterList';
import { MuiTableFilterPopover } from "./MuiTableFilterPopover";

/**
 * 
 * @param param0 
 */
export const MuiTableToolbarActions: FC<any> = () => {
    const [anchorEl, updateAnchorEl] = useState<null | EventTarget & HTMLButtonElement| Element>(null);

    return (
        <Grid item>
            <Fragment>
                <Tooltip title={"Filters"}>
                    <IconButton
                        aria-label={"Filters"}
                        onClick={event => updateAnchorEl(event.currentTarget)}
                    >
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>

                <MuiTableFilterPopover
                    updateAnchorEl={updateAnchorEl}
                    anchorEl={anchorEl}
                />
            </Fragment>
        </Grid>
    );
}