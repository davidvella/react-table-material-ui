import { Column } from "react-table";
import { OptionTypeBase, ValueType } from "react-select";
import { ReactNode } from "react";

export interface IMuiTableProviderProps {
  /**
   * Columns used to describe table. Must be either an array of objects describing a column
   */
  columns: Column<any>[];
  /**
   * 
   */
  children: ReactNode
}

export interface IMuiTableContext {
  /**
   * A dictionary containing all the selected options for each column
   */
  filterValues: Map<string, ValueType<OptionTypeBase> | null>;
  /**
   * Columns used to describe table. Must be either an array of objects describing a column
   */
  columns: Column<any>[];
}

export type MuiTableAction =
 | { type: 'resetFilter' }
 | { type: 'setFilter', columnId: string, filter: ValueType<OptionTypeBase>}