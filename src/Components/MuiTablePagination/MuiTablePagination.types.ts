export interface MuiTablePaginationProps {
  /**
   * Whether the Previous Button has been disabled.
   */
  canPreviousPage: boolean;
  /**
   * Whether the Next Button has been disabled.
   */
  canNextPage: boolean;
  /**
   * Called on click. When passed, the component will render as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   */
  onClickNext: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * Called on click. When passed, the component will render as an `a`
   * tag by default instead of a `div`.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   */
  onClickPrevious: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /**
   * The number of rows per page.
   */
  rowsPerPage: number;
  /**
   * Customizes the options of the rows per page select field. If less than two options are available, no select field will be displayed.
   */
  rowsPerPageOptions?: Array<number>;
  /**
   * 	Customize the rows per page label. Invoked with a { from, to, count, page } object.
   */
  labelRowsPerPage?: React.ReactNode;
  /**
   * Callback fired when the number of rows per page is changed.

      Signature:
      function(event: object) => void
      event: The event source of the callback.
   */
  onChangeRowsPerPage?:(
    event: React.ChangeEvent<{ name?: string; value: unknown }>,
    child: React.ReactNode,
  ) => void;
}
