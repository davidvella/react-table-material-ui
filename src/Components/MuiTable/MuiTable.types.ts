import { Column } from "react-table";

export interface MuiTableProps {
  /**
   * 
   */
  columns: Column<any>[];
  /**
   * 
   */
  data: any[];
  /**
   * 
   */
  initialPageSize: number;
}
