import { ColumnInstance } from "react-table";

export interface IMuiTableViewColProps {
    /**
     * Columns used to describe table. Must be an array of objects describing a column
     */
    columns: ColumnInstance<object>[];
    /**
     * This is the DOM element, or a function that returns the DOM element, that may be used to set the position of the popover.
     */
    anchorEl?: null | Element | ((element: Element) => Element);
    /**
     * Callback function to set the anchor el.
     */
    updateAnchorEl?: (anchorEl: null | Element) => void;
}