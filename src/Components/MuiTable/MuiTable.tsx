import { FC } from "react";
import { MuiTableProps } from "./MuiTable.types";
import React from "react";
import { MuiTableProvider } from "./MuiTableProvider";
import { MuiTableContent } from "./MuiTableContent";

/**
 * 
 * @param param0 
 */
export const MuiTable: FC<MuiTableProps> = (props) => {
// Load values from props.
  const {
    columns,
    data,
    // Default is 30
    initialPageSize = 30,
    rowsPerPageOptions,
    serverSide = false,
    pageCount,
    onColumnSortChange,
    onChangeRowsPerPage,
    onChangePage,
    onFilterChange,
    onRowsSelect,
    isRowSelectable = true
  } = props;

  return (
    <MuiTableProvider columns={columns}>
        <MuiTableContent
            columns={columns}
            data={data}
            initialPageSize={initialPageSize}
            rowsPerPageOptions={rowsPerPageOptions}
            serverSide={serverSide}
            pageCount={pageCount}
            onColumnSortChange={onColumnSortChange}
            onChangeRowsPerPage={onChangeRowsPerPage}
            onChangePage={onChangePage}
            onFilterChange={onFilterChange}
            onRowsSelect={onRowsSelect}
            isRowSelectable={isRowSelectable}
        >
        </MuiTableContent>
    </MuiTableProvider>
  )
}