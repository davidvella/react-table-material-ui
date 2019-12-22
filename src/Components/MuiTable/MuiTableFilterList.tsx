import { FC, useContext, HTMLAttributes } from "react";
import React from "react";
import { Grid } from "@material-ui/core";
import { MuiAsyncSelect } from "../MuiAsyncSelect/MuiAsyncSelect";
import { MuiTableContext } from "./MuiTableProvider";

/**
 * Render all filters based on context columns
 * @param props 
 */
export const MuiTableFilterList: FC<HTMLAttributes<HTMLDivElement>> = () => {

  // Map Context to columns
  const {state: {
    columns,
    filterValues
  }, dispatch} = useContext(MuiTableContext);

  return (
    // Return a grid of all the filter
    <Grid container spacing={4}>
      {columns.filter(col => !col.disableFilters).map((column, columnIndex) => {
        const isLastRecord = columns.length - 1 === columnIndex;
        const isOddLength = columns.length % 2 !== 0;
        const isOnlyInRow = isLastRecord && isOddLength;
        if(column.loadOptions){
          return (
            // If there is an odd number of rows use a different xs.
            <Grid item xs={isOnlyInRow ? 12 : 6} key={columnIndex}>
  
              <MuiAsyncSelect
                name={column.filterLabel}
                isMulti={column.isMulti}
                cacheOptions
                value={filterValues.get(column.id)}
                defaultOptions
                onChange={(value)=> dispatch({type:"setFilter", columnId:column.id, filter:value}) }
                loadOptions={column.loadOptions}
              />
            </Grid>
          );
        }
        return(null);
      })}
    </Grid>

  )
}