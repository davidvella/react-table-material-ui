import { FC, useContext } from "react";
import React from "react";
import { Grid } from "@material-ui/core";
import { MuiAsyncSelect } from "../MuiAsyncSelect/MuiAsyncSelect";
import { MuiTableContext } from "./MuiTableProvider";

export const MuiTableFilterList: FC<any> = (props) => {

  // Map Context to columns
  const {state: {
    columns,
    filterValues
  }, dispatch} = useContext(MuiTableContext);

  return (

    <Grid container spacing={4}>
      {columns.filter(col => !col.disableFilters).map((column, columnIndex) => {
        const isLastRecord = columns.length - 1 === columnIndex;
        const isOddLength = columns.length % 2 !== 0;
        const isOnlyInRow = isLastRecord && isOddLength;
        return (
          <Grid item xs={isOnlyInRow ? 12 : 6} key={columnIndex}>
            <MuiAsyncSelect
              name={column.id}
              isMulti={column.isMulti}
              cacheOptions
              value={filterValues.getValue(column.id)}
              defaultOptions
              onChange={(value)=> dispatch({type:"setFilter", columnId:column.id, filter:value}) }
              loadOptions={column.loadOptions}
            />
          </Grid>
        );
      })}
    </Grid>

  )
}