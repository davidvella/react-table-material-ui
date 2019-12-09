export interface MuiTableFilterPopoverProps {
  /**
   * This is the DOM element, or a function that returns the DOM element, that may be used to set the position of the popover.
   */
  anchorEl?: null | Element | ((element: Element) => Element);
  /**
   * Callback function to set the anchor el.
   */
  updateAnchorEl?: (anchorEl: null | Element) => void;
}
