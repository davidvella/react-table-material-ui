import React, { FC } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
  useTable,
  useSortBy,
  UseSortByColumnProps,
  TableInstance,
  UseFiltersColumnProps,
  ColumnInstance,
  UseResizeColumnsHeaderProps,
  usePagination
} from 'react-table'
import { makeStyles, createStyles, Theme, TableSortLabel, withStyles, Paper } from '@material-ui/core';
import { MuiTableProps } from './MuiTable.types'
import { MuiTablePagination } from '../MuiTablePagination/MuiTablePagination';

/**
 * TypeScript Interface needed to compile.
 */
interface TableColumn<D extends object = {}>
  extends ColumnInstance<D>,
  UseSortByColumnProps<D>,
  UseResizeColumnsHeaderProps<D>,
  UseFiltersColumnProps<D> { }

/**
 * 
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
      overflow: 'auto',
    },
  }),
);

/**
 * ALternate Row Colours for usability.
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
export const MuiTable: FC<MuiTableProps> = (props) => {
  // Load values from props.
  const {
    columns, 
    data, 
    initialPageSize, 
    rowsPerPageOptions,
    serverSide = false,
    pageCount,
    serverSideFetchData,
    serverSideSort
  } = props;

  // Use the state and functions returned from useTable to build your UI
  const {
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
    state: { pageSize, pageIndex, sortBy},
  } = useTable<object>(
    {
      columns,
      data,
      initialState: { pageSize: initialPageSize, pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: serverSide, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: pageCount,
      manualSorting: serverSide,// Tell the useSortBy
      // hook that we'll sort our own data 
      // This means we'll also have to provide our own
      // pageCount.
    },
    useSortBy,
    usePagination
  ) as TableInstance<object>;
  const classes = useStyles();

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
      if(serverSideSort){
        global.console.log("Calling Sort Data");
        serverSideSort(sortBy)
      }
  }, [serverSideSort,sortBy])

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    if(serverSideFetchData){
      global.console.log("Calling Fetch Data");
      serverSideFetchData( pageIndex, pageSize)
    }
  }, [serverSideFetchData, pageIndex, pageSize])

  // Render the UI for your table
  return (
    <Paper>
      <div className={classes.tableWrapper}>
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
                        hidden={!column.canSort}
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
              (row, i) => {
                prepareRow(row);
                return (
                  <StyledTableRow {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <TableCell {...cell.getCellProps()} tabIndex={0}>
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