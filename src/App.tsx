import React from 'react';
import makeData from './makeData';
import { CellProps, SortingRule } from 'react-table';
import { MuiTable } from './Components/MuiTable/MuiTable';
import { CssBaseline } from '@material-ui/core';

const serverData = makeData(1000);

const App: React.FC = () => {
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

  // We'll start our table without any data
  const [data, setData] = React.useState([])
  //const [loading, setLoading] = React.useState(false)
  const [pageCount, setPageCount] = React.useState(0)
  const fetchIdRef = React.useRef(0);
  const sortIdRef = React.useRef(0);

  // This will get called when the table needs new data
  // You could fetch your data from literally anywhere,
  // even a server. But for this example, we'll just fake it.
  const fetchData = React.useCallback((pageIndex: number, pageSize: number) => {
    // Give this fetch an ID
    const fetchID = ++fetchIdRef.current

    // Set the loading state
    //setLoading(true)

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (fetchID === fetchIdRef.current) {
        const startRow = pageSize * pageIndex
        const endRow = startRow + pageSize;
        setData(serverData.slice(startRow, endRow))

        // Your server could send back total page count.
        // For now we'll just fake it, too
        setPageCount(Math.ceil(serverData.length / pageSize))

        //setLoading(false)
      }
    }, 1000)
  }, [])

  
  // This will get called when the user click sort
  // You could fetch your data from literally anywhere,
  // even a server. But for this example, we'll just fake it.
  const sortData = React.useCallback((sortRules: Array<SortingRule<any>>) => {
    // Give this fetch an ID
    const sortID = ++sortIdRef.current

    // Set the loading state
    //setLoading(true)

    // We'll even set a delay to simulate a server here
    setTimeout(() => {
      // Only update the data if this is the latest fetch
      if (sortID === sortIdRef.current) {
        global.console.log(sortRules);

        // Sort Logic goes here
        //setLoading(false)
      }
    }, 1000)
  }, [])

  return (
    <div>
      <CssBaseline />
      <MuiTable columns={columns}
        data={data}
        initialPageSize={50}
        serverSideFetchData={fetchData}
        pageCount={pageCount}
        serverSide={true} 
        serverSideSort={sortData}/>
    </div>
  );
}

export default App;