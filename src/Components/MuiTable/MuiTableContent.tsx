import React, { FC, useContext, useEffect } from 'react';
import {
  useTable,
  useSortBy,
  UseSortByColumnProps,
  TableInstance,
  UseFiltersColumnProps,
  ColumnInstance,
  usePagination,
  useRowSelect,
  Column,
  CellProps
} from 'react-table'
import {
  makeStyles,
  createStyles,
  Theme,
  TableSortLabel,
  withStyles,
  Paper,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Grid
} from '@material-ui/core';
import { MuiTableProps } from './MuiTable.types'
import { MuiTablePagination } from '../MuiTablePagination/MuiTablePagination';
import { MuiTableToolbarActions } from './MuiTableToolbarActions';
import { MuiTableContext } from './MuiTableProvider';
import { SELECT_COL_ID } from './constants'

/**
 * TypeScript Interface needed to compile.
 */
interface TableColumn<D extends object = {}>
  extends ColumnInstance<D>,
  UseSortByColumnProps<D>,
  UseFiltersColumnProps<D> { }

/**
 * Styles for the Table
 */
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    tableWrapper: {
      overflow: 'auto'
    },
    selectedRow: {
      // Set with background color with 40% opacity
      background: `${theme.palette.primary.main}66 !important`
    }
  }),
);

/**
 * Alternate Row Colours for usability.
 */
const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-child(odd)': {
        backgroundColor: theme.palette.background.default
      }
    }
  }),
)(TableRow);

/**
 * 
 * @param param0 
 */
export const MuiTableContent: FC<MuiTableProps> = (props) => {
  // Load values from props.
  const {
    columns: columnsDef,
    data,
    resetPageIndexOnSort = false,
    // Default is 30
    initialPageSize,
    rowsPerPageOptions,
    serverSide,
    pageCount,
    onColumnSortChange,
    onChangeRowsPerPage,
    onChangePage,
    onFilterChange,
    onRowsSelect,
    isRowSelectable = true
  } = props;

  // Add the selection row to the table.
  const columns = React.useMemo(
    () => columnSelectionDecorator(columnsDef, isRowSelectable),
    [columnsDef, isRowSelectable],
  );

  // Map Context to filterValues
  const { state: {
    filterValues
  } } = useContext(MuiTableContext);

  // Use the state and functions returned from useTable to build your UI
  const {
    flatColumns,
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page.
    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    gotoPage,
    state: { pageSize, pageIndex, sortBy },
  } = useTable<object>(
    {
      columns,
      data,
      initialState: { pageSize: initialPageSize }, // Pass our hoisted table state
      manualPagination: serverSide, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: pageCount,
      manualSortBy: serverSide,// Tell the useSortBy
      // hook that we'll sort our own data 
      // This means we'll also have to provide our own
      // pageCount.
    },
    useSortBy,
    usePagination,
    useRowSelect
  ) as TableInstance<object>;
  const classes = useStyles();

  // Listen for changes in column state and use the state to fetch new data
  useEffect(() => {
    if (onColumnSortChange) {
      onColumnSortChange(sortBy)
      if (resetPageIndexOnSort) {
        gotoPage(0);
      }
    }
  }, [onColumnSortChange, sortBy, gotoPage, resetPageIndexOnSort])

  // Listen for changes in pagination and use the state to fetch our new data
  useEffect(() => {
    if (onChangePage) {
      onChangePage(pageIndex)
    }
  }, [onChangePage, pageIndex])

  // Listen for changes in filterValues and use the state to fetch our new data
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filterValues)
    }
  }, [onFilterChange, filterValues])

  // Listen for changes in pageSize and use the state to fetch our new data
  useEffect(() => {
    if (onChangeRowsPerPage) {
      onChangeRowsPerPage(pageSize)
    }
  }, [onChangeRowsPerPage, pageSize])

  // Listen for changes in row selection and send data back to the user.
  useEffect(() => {
    if (onRowsSelect) {
      onRowsSelect(selectedFlatRows);
    }
  }, [onRowsSelect, selectedFlatRows])

  // Render the UI for your table
  return (
    <Paper>
      <div className={classes.tableWrapper}>
        <Toolbar>
          <Grid container>
            <MuiTableToolbarActions columns={flatColumns} />
          </Grid>
        </Toolbar>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(c => {
                  const column = (c as unknown) as TableColumn<object>
                  return (
                    <TableCell {...column.getHeaderProps()}>
                      <TableSortLabel
                        active={column.isSorted}
                        direction={column.isSortedDesc ? "desc" : "asc"}
                        hideSortIcon={column.disableSortBy}
                        {...column.getSortByToggleProps()}
                      >
                        {column.render('Header')}
                        {column.isSorted ? (
                          <span className={classes.visuallyHidden}>
                            {column.isSortedDesc ? 'sorted descending' : 'sorted ascending'}
                          </span>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map(
              (row) => {
                prepareRow(row);
                return (
                  <StyledTableRow {...row.getRowProps()} className={row.isSelected ? classes.selectedRow : ''} hover={true}>
                    {row.cells.map(cell => {
                      return (
                        <TableCell {...cell.getCellProps()}>
                            {cell.render('Cell')}
                        </TableCell>
                      )
                    })}
                  </StyledTableRow>
                )
              }
            )}
          </TableBody>
        </Table>
      </div>
      <MuiTablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        canNextPage={canNextPage}
        canPreviousPage={canPreviousPage}
        onClickNext={() => nextPage()}
        onClickPrevious={() => previousPage()}
        rowsPerPage={pageSize}
        onChangeRowsPerPage={e => {
          setPageSize(Number(e.target.value))
        }}
      />
    </Paper>
  )
}

/**
 * Adds the selection row if selected
 * @param columns 
 * @param isRowSelectable 
 */
const columnSelectionDecorator = (columns: Column<object>[], isRowSelectable: boolean) => {
  if (isRowSelectable) {
    columns.unshift(selectionColumn);
  }
  return columns;
}

// Let's make a column for selection
const selectionColumn: Column<object> =
{
  id: SELECT_COL_ID,
  // The header can use the table's getToggleAllRowsSelectedProps method
  // to render a checkbox
  Header: ({ getToggleAllRowsSelectedProps, isAllRowsSelected }: CellProps<any>) => (<div>
    <Checkbox {...getToggleAllRowsSelectedProps()} indeterminate={isAllRowsSelected} color="primary" />
  </div>),
  // The cell can use the individual row's getToggleRowSelectedProps method
  // to the render a checkbox
  Cell: ({ row }: CellProps<any>) => (
    <div>
      <Checkbox {...row.getToggleRowSelectedProps()} color="primary" />
    </div>
  ),
  disableSortBy: true,
  disableFilters: true,
  loadOptions: () => { }
}