import { Column } from "react-table";

export interface MuiTableProps {
  /**
   * Columns used to describe table. Must be either an array of objects describing a column
   */
  columns: Column<any>[];
  /**
   * Data used to describe table. Must be either an array containing objects of key/value pairs with values that are strings or numbers, or arrays of strings or numbers (Ex: data: [{"Name": "Joe", "Job Title": "Plumber", "Age": 30}, {"Name": "Jane", "Job Title": "Electrician", "Age": 45}] or data: [["Joe", "Plumber", 30], ["Jane", "Electrician", 45]])
   */
  data: any[];
  /**
   * Number of rows allowed per page
   */
  initialPageSize: number;
  /**
   * Customizes the options of the rows per page select field. If less than two options are available, no select field will be displayed.
   */
  rowsPerPageOptions?: Array<number>;

}
