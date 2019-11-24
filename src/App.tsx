import React from 'react';
import makeData from './makeData';
import { CellProps } from 'react-table';
import { MuiTable } from './Components/MuiTable/MuiTable';
import { CssBaseline } from '@material-ui/core';

const App: React.FC = () => {
  const data = React.useMemo(() => makeData(400), [])

  const columns: any = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName'
      },
      {
        Header: 'Age',
        accessor: 'age',
        Cell: ({ cell: { value } }: CellProps<object>) => <div>{value}</div>
      },
      {
        Header: 'Visits',
        accessor: 'visits',
        Cell: ({ cell: { value } }: CellProps<object>) => <div>{value}</div>
      },
      {
        Header: 'Status',
        accessor: 'status'
      },
      {
        Header: 'Profile Progress',
        Cell: ({ row: { original } }: CellProps<any>) => {
          return (<span>
            {original.progress}
          </span>)
        }
      },
    ],
    []
  )

  return (
    <div>
      <CssBaseline />
      <MuiTable columns={columns} data={data} initialPageSize={50} />
    </div>
  );
}

export default App;
