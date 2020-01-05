import { ColumnInstance } from "react-table";
import { HTMLAttributes } from "react";

export interface IMuiTableToolbarActionProps extends HTMLAttributes<HTMLDivElement> {
    /**
     * Columns used to describe table. Must be an array of objects describing a column
     */
    columns: ColumnInstance<object>[];
}