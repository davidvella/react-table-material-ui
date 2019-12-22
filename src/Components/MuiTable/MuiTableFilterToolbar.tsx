import { FC, useContext, HTMLAttributes, useMemo } from "react";
import React from "react";
import { Theme, createStyles, Chip } from "@material-ui/core";
import { MuiTableContext } from "./MuiTableProvider";
import makeStyles from "@material-ui/styles/makeStyles";
import { uniqueId } from "lodash";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'left',
            flexWrap: 'wrap',
            margin: '0px 16px 0px 16px',
        },
        chip: {
            margin: '8px 8px 0px 0px',
        },
    }),
);


/**
 * Render all filters based on context columns
 * @param props 
 */
export const MuiTableFilterToolbar: FC<HTMLAttributes<HTMLDivElement>> = () => {

    // styles
    const classes = useStyles();

    // Map Context to columns
    const { state: {
        filterValues
    } } = useContext(MuiTableContext);

    // Get values of all filter columns.
    const flatFilterValues = useMemo(() => Array.from(filterValues.values()), [filterValues])

    const filterChipSingleValue = (index: number, item: any) => {
        return (
            <Chip
                label={item.label}
                key={uniqueId(`${index}`)}
                className={classes.chip}
            />
        );
    };

    return (
        <div className={classes.root}>
            {flatFilterValues.map((item: any, index: number) => {
                if (item != null) {
                    if (Array.isArray(item)) {
                        return item.map((filterItem, filterItemIndex) =>
                            filterChipSingleValue(filterItemIndex, filterItem)
                        )
                    } else {
                        return filterChipSingleValue(index, item);
                    }
                }
                else {
                    return (null);
                }

            })}
        </div>
    )
}